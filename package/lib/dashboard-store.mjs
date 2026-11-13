/**
 * 看板图表的持久化：台账字段只读，看板只保存「用户怎么画」。
 * 每张图 = 一个 widget 定义（类型/维度/拆分/指标/取数范围），存 ledger-dashboards.json，
 * 与 ledger.json 分开写，删改看板不影响台账数据。
 */
import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

export const DASHBOARD_VERSION = 1
export const DASHBOARD_MAX_WIDGETS = 60
export const DASHBOARD_MAX_PINNED = 24
export const DASHBOARD_MAX_BYTES = 512 * 1024
export const DASHBOARD_TYPES = Object.freeze(['bar', 'hbar', 'line', 'area', 'pie', 'donut', 'table', 'stat'])
export const DASHBOARD_METRICS = Object.freeze(['count', 'sum', 'avg'])
export const DASHBOARD_MONTH_OPTIONS = Object.freeze([0, 3, 6, 12, 24])
export const DASHBOARD_SERIES_LIMIT = 6
export const DASHBOARD_DEFAULT_COLUMNS = Object.freeze(['ticket', 'group', 'day', 'status'])

const ID = /^[A-Za-z0-9_-]{1,64}$/

export const dashboardPath = stateDirectory => path.join(stateDirectory, 'ledger-dashboards.json')

const fail = (code, message) => Object.assign(new Error(message || code), { code })
const nowMs = value => Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) : Date.now()
const cleanText = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '')
const cleanInt = (value, min, max, fallback) => {
  const number = Number(value)
  return Number.isInteger(number) ? Math.min(max, Math.max(min, number)) : fallback
}
const isObject = value => value && typeof value === 'object' && !Array.isArray(value)

function cleanColumns(input) {
  if (!Array.isArray(input)) return []
  return [...new Set(input.filter(key => typeof key === 'string' && ID.test(key)).slice(0, 40))]
}

/** 只做类型层面的归一化；字段是否存在由 query 模块按当前台账字段校验。 */
export function shapeWidget(input = {}) {
  const type = DASHBOARD_TYPES.includes(input.type) ? input.type : 'bar'
  const metric = DASHBOARD_METRICS.includes(input.metric) ? input.metric : 'count'
  const dimension = cleanText(input.dimension, 64)
  const split = type === 'table' || type === 'pie' || type === 'donut' || type === 'stat'
  const id = typeof input.id === 'string' && ID.test(input.id) ? input.id : `w_${randomUUID().slice(0, 8)}`
  return {
    id,
    title: cleanText(input.title, 40),
    type,
    dimension,
    series: split ? '' : cleanText(input.series, 64),
    metric,
    valueField: metric === 'count' ? '' : cleanText(input.valueField, 64),
    top: cleanInt(input.top, 3, 20, 8),
    order: input.order === 'label' ? 'label' : 'value',
    layout: input.layout === 'stacked' ? 'stacked' : 'grouped',
    months: cleanInt(input.months, 0, 24, dimension === 'month' ? 12 : 0),
    columns: cleanColumns(input.columns),
    limit: cleanInt(input.limit, 1, 500, 50),
    span: Number(input.span) === 2 ? 2 : 1,
    pinned: input.pinned !== false,
    createdAt: nowMs(input.createdAt),
    updatedAt: nowMs(input.updatedAt),
  }
}

/** 首次打开看板时的三张默认图；用户保存后以文件里的定义为准。 */
export function defaultWidgets(now = Date.now()) {
  const created = nowMs(now)
  return [
    { id: 'w_trend', title: '月度入账趋势', type: 'bar', dimension: 'month', metric: 'count', months: 12, span: 2, pinned: true },
    { id: 'w_status', title: '核对状态', type: 'donut', dimension: 'status', metric: 'count', span: 1, pinned: true },
    { id: 'w_group', title: '来源群票数', type: 'hbar', dimension: 'group', metric: 'count', top: 8, span: 1, pinned: true },
  ].map(widget => shapeWidget({ ...widget, createdAt: created, updatedAt: created }))
}

function readRaw(stateDirectory) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) return null
  try {
    const raw = fs.readFileSync(dashboardPath(stateDirectory), 'utf8')
    if (raw.length > DASHBOARD_MAX_BYTES) return null
    const value = JSON.parse(raw)
    return isObject(value) ? value : null
  } catch {
    return null
  }
}

/** 文件缺失时返回默认图表但不落盘：只有用户保存/删除才会产生 ledger-dashboards.json。 */
export function readDashboardStore(stateDirectory, { now = Date.now() } = {}) {
  const raw = readRaw(stateDirectory)
  if (!raw || raw.version !== DASHBOARD_VERSION || !Array.isArray(raw.widgets)) {
    return { version: DASHBOARD_VERSION, updatedAt: 0, widgets: defaultWidgets(now), seeded: true }
  }
  const widgets = raw.widgets
    .filter(isObject)
    .slice(0, DASHBOARD_MAX_WIDGETS)
    .map(widget => shapeWidget(widget))
  return { version: DASHBOARD_VERSION, updatedAt: Number(raw.updatedAt) || 0, widgets, seeded: false }
}

function writeStore(stateDirectory, store) {
  const file = dashboardPath(stateDirectory)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const temporary = `${file}.${randomUUID()}.tmp`
  const payload = { version: DASHBOARD_VERSION, updatedAt: store.updatedAt, widgets: store.widgets }
  try {
    fs.writeFileSync(temporary, JSON.stringify(payload), { mode: 0o600 })
    fs.renameSync(temporary, file)
  } finally {
    try { fs.unlinkSync(temporary) } catch {}
  }
}

export function upsertDashboardWidget(stateDirectory, { id, widget, now = Date.now() } = {}) {
  const store = readDashboardStore(stateDirectory, { now })
  const input = isObject(widget) ? widget : {}
  const index = store.widgets.findIndex(item => item.id === (id || input.id))
  const shaped = shapeWidget({
    ...input,
    id: id || input.id,
    pinned: input.pinned ?? (index >= 0 ? store.widgets[index].pinned : false),
  })
  const at = nowMs(now)
  if (shaped.pinned) assertPinnedRoom(store.widgets, index)
  const next = { ...shaped, createdAt: index >= 0 ? Number(store.widgets[index].createdAt) || at : at, updatedAt: at }
  if (index >= 0) store.widgets[index] = next
  else {
    if (store.widgets.length >= DASHBOARD_MAX_WIDGETS) throw fail('dashboard-limit', `图库最多保存 ${DASHBOARD_MAX_WIDGETS} 张图`)
    store.widgets.push(next)
  }
  store.updatedAt = at
  writeStore(stateDirectory, store)
  return { widget: next, widgets: store.widgets, updatedAt: at }
}

function assertPinnedRoom(widgets, ignoreIndex) {
  const pinned = widgets.filter((widget, index) => widget.pinned && index !== ignoreIndex).length
  if (pinned >= DASHBOARD_MAX_PINNED) throw fail('dashboard-pinned-limit', `看板最多展示 ${DASHBOARD_MAX_PINNED} 张图`)
}

/** 展示/隐藏只改一个标志，不动图表定义与更新时间；看板取数只算展示中的图。 */
export function setDashboardWidgetPinned(stateDirectory, id, { pinned, now = Date.now() } = {}) {
  const store = readDashboardStore(stateDirectory, { now })
  const index = store.widgets.findIndex(widget => widget.id === id)
  if (index < 0) throw fail('dashboard-widget-missing', '这张图已经不存在')
  const next = pinned !== false
  if (store.widgets[index].pinned === next) return { widget: store.widgets[index], widgets: store.widgets, updatedAt: store.updatedAt }
  if (next) assertPinnedRoom(store.widgets, index)
  const at = nowMs(now)
  store.widgets[index] = { ...store.widgets[index], pinned: next }
  store.updatedAt = at
  writeStore(stateDirectory, store)
  return { widget: store.widgets[index], widgets: store.widgets, updatedAt: at }
}

export function deleteDashboardWidget(stateDirectory, id, { now = Date.now() } = {}) {
  const store = readDashboardStore(stateDirectory, { now })
  const widgets = store.widgets.filter(widget => widget.id !== id)
  if (widgets.length === store.widgets.length) throw fail('dashboard-widget-missing', '这张图已经不存在')
  const at = nowMs(now)
  store.widgets = widgets
  store.updatedAt = at
  writeStore(stateDirectory, store)
  return { widgets, updatedAt: at }
}

/** 轮询版本号：只 stat 看板文件，不解析内容。 */
export function dashboardState(stateDirectory) {
  try {
    const stat = fs.statSync(dashboardPath(stateDirectory))
    return `${Math.trunc(stat.mtimeMs)}:${stat.size}`
  } catch {
    return '0:0'
  }
}
