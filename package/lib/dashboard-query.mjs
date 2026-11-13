/**
 * 看板取数：字段来自台账配置，图由客户端用 TanStack Charts/Table 渲染。
 * Host 只做聚合与投影，返回标签、系列、表格行；不返回全量台账行。
 * 范围按票的入账月份（savedAt）划分，全部范围包含热窗与所有归档分片。
 */
import { readLedgerConfig } from './ledger-store.mjs'
import { collectLedgerEntries, monthOf } from './ledger-archive.mjs'
import { projectTicketRow } from './ledger-source.mjs'
import {
  DASHBOARD_MAX_PINNED, DASHBOARD_MAX_WIDGETS, DASHBOARD_METRICS, DASHBOARD_MONTH_OPTIONS, DASHBOARD_SERIES_LIMIT,
  DASHBOARD_TYPES, readDashboardStore, shapeWidget, upsertDashboardWidget,
} from './dashboard-store.mjs'

export const DASHBOARD_MAX_TOP = 20
export const DASHBOARD_UNASSIGNED = '未填写'
export const DASHBOARD_OTHER = '其他'

const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/
const fail = (code, message) => Object.assign(new Error(message || code), { code })
const round2 = value => Math.round(value * 100) / 100

export function buildDashboardCatalog(config) {
  const fields = [{ key: 'month', label: '入账月份', dataType: 'date', source: 'derived', numeric: false, series: false }]
  for (const column of config.columns) {
    if (column.key === 'ticket') continue
    const definition = config.fields.find(field => field.key === column.key)
    const dataType = column.key === 'status' ? 'enum'
      : column.key === 'completeness' || column.key === 'fileCount' ? 'number'
        : column.key === 'savedAt' || column.key === 'day' ? 'date'
          : definition?.data_type || 'text'
    const numeric = dataType === 'number'
    fields.push({
      key: column.key,
      label: column.label,
      dataType,
      source: column.source || 'field',
      numeric,
      series: !numeric,
    })
  }
  return {
    fields,
    tableColumns: config.columns.map(column => ({ key: column.key, label: column.label })),
    metrics: DASHBOARD_METRICS,
    types: DASHBOARD_TYPES,
    maxWidgets: DASHBOARD_MAX_WIDGETS,
    maxPinned: DASHBOARD_MAX_PINNED,
    seriesLimit: DASHBOARD_SERIES_LIMIT,
    monthOptions: DASHBOARD_MONTH_OPTIONS,
    maxTop: DASHBOARD_MAX_TOP,
  }
}

function emptyCatalog() {
  return {
    fields: [], tableColumns: [], metrics: DASHBOARD_METRICS, types: DASHBOARD_TYPES,
    maxWidgets: DASHBOARD_MAX_WIDGETS, maxPinned: DASHBOARD_MAX_PINNED, seriesLimit: DASHBOARD_SERIES_LIMIT,
    monthOptions: DASHBOARD_MONTH_OPTIONS, maxTop: DASHBOARD_MAX_TOP,
  }
}

const fieldOf = (catalog, key) => catalog.fields.find(field => field.key === key)
const isSeriesField = (catalog, key) => Boolean(fieldOf(catalog, key)?.series)
const isNumericField = (catalog, key) => Boolean(fieldOf(catalog, key)?.numeric)

/** 保存前校验：字段必须仍存在于当前台账，求和/平均必须落在数字字段上。 */
export function validateWidget(widget, catalog) {
  if (!DASHBOARD_TYPES.includes(widget.type)) throw fail('dashboard-widget-invalid', '不支持的图表类型')
  if (widget.type === 'stat' || widget.type === 'table') {
    if (widget.metric !== 'count' && !isNumericField(catalog, widget.valueField)) {
      throw fail('dashboard-widget-invalid', '求和/平均需要选择一个数字字段')
    }
    return
  }
  if (!fieldOf(catalog, widget.dimension)) throw fail('dashboard-widget-invalid', '请选择分组字段')
  if (widget.series) {
    if (!fieldOf(catalog, widget.series)) throw fail('dashboard-widget-invalid', '拆分字段已不在台账中')
    if (!isSeriesField(catalog, widget.series)) throw fail('dashboard-widget-invalid', '数字字段不能用于拆分')
    if (widget.series === widget.dimension) throw fail('dashboard-widget-invalid', '拆分字段不能与分组字段相同')
  }
  if (widget.metric !== 'count' && !isNumericField(catalog, widget.valueField)) {
    throw fail('dashboard-widget-invalid', '求和/平均需要选择一个数字字段')
  }
}

function metricLabel(widget, catalog) {
  if (widget.metric === 'count') return '票数'
  const label = fieldOf(catalog, widget.valueField)?.label || widget.valueField
  return `${label}${widget.metric === 'avg' ? '平均' : '合计'}`
}

export function defaultWidgetTitle(widget, catalog) {
  if (widget.type === 'table') return '台账明细'
  if (widget.type === 'stat') return metricLabel(widget, catalog)
  const dimension = fieldOf(catalog, widget.dimension)?.label || ''
  const metric = metricLabel(widget, catalog)
  return dimension ? `${dimension} · ${metric}` : metric
}

const labelOf = value => {
  const text = value == null ? '' : String(value).trim()
  return text || DASHBOARD_UNASSIGNED
}

function numericOf(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  const text = String(value ?? '').replace(/[,，\s%]/g, '')
  if (!text) return null
  const number = Number(text)
  return Number.isFinite(number) ? number : null
}

function monthWindow(lastMonth, size) {
  const [year, month] = lastMonth.split('-').map(Number)
  const months = []
  for (let offset = size - 1; offset >= 0; offset -= 1) {
    const date = new Date(year, month - 1 - offset, 1, 12)
    months.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`)
  }
  return months
}

function metricTotal(entries, widget, indexByKey) {
  if (widget.metric === 'count') return entries.length
  let sum = 0
  let count = 0
  for (const entry of entries) {
    const value = numericOf(entry.values[indexByKey.get(widget.valueField)])
    if (value == null) continue
    sum += value
    count += 1
  }
  return widget.metric === 'avg' ? (count ? round2(sum / count) : 0) : round2(sum)
}

function metricCell(entry, widget, indexByKey) {
  if (widget.metric === 'count') return { sum: 1, count: 1 }
  const value = numericOf(entry.values[indexByKey.get(widget.valueField)])
  return value == null ? null : { sum: value, count: 1 }
}

function cellValue(cell, metric) {
  if (!cell) return 0
  if (metric === 'count') return cell.count
  if (metric === 'avg') return cell.count ? round2(cell.sum / cell.count) : 0
  return round2(cell.sum)
}

function addCell(map, key, value) {
  const cell = map.get(key) || { sum: 0, count: 0 }
  cell.sum += value.sum
  cell.count += value.count
  map.set(key, cell)
}

const cellKey = (label, series) => `${label}\u0000${series}`

function sortByMonth(labels) {
  return labels.sort((left, right) => left.localeCompare(right))
}

/** 分类图：把预算好的 (标签, 系列) 单元裁到 topN，溢出的合并到「其他」。 */
function aggregateChart(widget, scoped, context) {
  const { catalog, indexByKey, scope, now } = context
  const seriesField = widget.series && widget.type !== 'pie' && widget.type !== 'donut' ? widget.series : ''
  const cells = new Map()
  const labelTotals = new Map()
  const seriesTotals = new Map()
  for (const entry of scoped) {
    const rawLabel = widget.dimension === 'month' ? entry.month : entry.values[indexByKey.get(widget.dimension)]
    const label = labelOf(rawLabel)
    const rawSeries = seriesField ? entry.values[indexByKey.get(seriesField)] : ''
    const series = seriesField ? labelOf(rawSeries) : ''
    const metric = metricCell(entry, widget, indexByKey)
    if (!metric) continue
    addCell(cells, cellKey(label, series), metric)
    addCell(labelTotals, label, metric)
    addCell(seriesTotals, series, metric)
  }

  let labels = [...labelTotals.keys()]
  const labelValue = label => cellValue(labelTotals.get(label), widget.metric)
  if (widget.dimension === 'month') {
    const withWindow = widget.type !== 'pie' && widget.type !== 'donut'
    if (withWindow && scope === 'all' && widget.months > 0 && labels.length) {
      const windowed = new Set(monthWindow(sortByMonth([...labels]).at(-1), widget.months))
      labels = labels.filter(label => windowed.has(label))
      for (const label of windowed) if (!labels.includes(label)) labels.push(label)
    }
    labels = sortByMonth(labels)
  } else if (labels.length > widget.top) {
    const ranked = [...labels].sort((left, right) => labelValue(right) - labelValue(left) || left.localeCompare(right))
    const kept = new Set(ranked.slice(0, widget.top))
    const rest = ranked.slice(widget.top)
    for (const label of rest) {
      if (label === DASHBOARD_OTHER) continue
      for (const [key, value] of cells) {
        if (!key.startsWith(`${label}\u0000`)) continue
        const series = key.slice(label.length + 1)
        addCell(cells, cellKey(DASHBOARD_OTHER, series), value)
        addCell(labelTotals, DASHBOARD_OTHER, value)
        cells.delete(key)
      }
      labelTotals.delete(label)
    }
    labels = [...kept, DASHBOARD_OTHER].filter(label => labelTotals.has(label) || label === DASHBOARD_OTHER)
  }
  if (widget.type === 'line' || widget.type === 'area' || (!widget.dimension.startsWith('month') && widget.order === 'label')) {
    labels.sort((left, right) => left === DASHBOARD_OTHER ? 1 : right === DASHBOARD_OTHER ? -1 : left.localeCompare(right))
  } else if (widget.type !== 'line' && widget.type !== 'area') {
    labels = labels.sort((left, right) => left === DASHBOARD_OTHER ? 1 : right === DASHBOARD_OTHER ? -1 : labelValue(right) - labelValue(left) || left.localeCompare(right))
    if (widget.dimension === 'month') labels = sortByMonth(labels)
  }

  let seriesLabels = seriesField
    ? [...seriesTotals.keys()].sort((left, right) => cellValue(seriesTotals.get(right), widget.metric) - cellValue(seriesTotals.get(left), widget.metric) || left.localeCompare(right))
    : []
  if (seriesLabels.length > DASHBOARD_SERIES_LIMIT) {
    const seriesValue = series => cellValue(seriesTotals.get(series), widget.metric)
    const ranked = [...seriesLabels].sort((left, right) => seriesValue(right) - seriesValue(left))
    const kept = new Set(ranked.slice(0, DASHBOARD_SERIES_LIMIT))
    for (const series of ranked.slice(DASHBOARD_SERIES_LIMIT)) {
      if (series === DASHBOARD_OTHER) continue
      for (const label of labels) {
        const source = cells.get(cellKey(label, series))
        if (!source) continue
        addCell(cells, cellKey(label, DASHBOARD_OTHER), source)
        cells.delete(cellKey(label, series))
      }
    }
    seriesLabels = [...kept, DASHBOARD_OTHER]
  }

  const dense = widget.type === 'line' || widget.type === 'area'
  const points = []
  for (const label of labels) {
    const seriesValues = seriesLabels.length ? seriesLabels : ['']
    for (const series of seriesValues) {
      const cell = cells.get(cellKey(label, series))
      if (!cell && !dense) continue
      points.push({ label, series, value: cellValue(cell, widget.metric) })
    }
  }
  const total = metricTotal(scoped, widget, indexByKey)
  return {
    kind: 'chart',
    type: widget.type,
    dimension: { key: widget.dimension, label: fieldOf(catalog, widget.dimension)?.label || '' },
    series: seriesField ? { key: seriesField, label: fieldOf(catalog, seriesField)?.label || '' } : null,
    metric: widget.metric,
    valueField: widget.valueField,
    labels,
    seriesLabels,
    points,
    total,
    unit: widget.metric === 'avg' && widget.valueField === 'completeness' ? '%' : '',
    empty: !points.length,
  }
}

function aggregateTable(widget, scoped, context) {
  const { catalog, indexByKey } = context
  const available = new Map(catalog.tableColumns.map(column => [column.key, column.label]))
  let columns = widget.columns.filter(key => available.has(key)).map(key => ({ key, label: available.get(key) }))
  if (!columns.length) columns = catalog.tableColumns.slice(0, 4)
  const rows = scoped.slice(0, widget.limit).map(entry => columns.map(column => entry.values[indexByKey.get(column.key)] ?? ''))
  return {
    kind: 'table',
    columns,
    rows,
    total: scoped.length,
    limit: widget.limit,
    truncated: scoped.length > rows.length,
  }
}

function aggregateStat(widget, scoped, context) {
  const { catalog, indexByKey } = context
  return {
    kind: 'stat',
    value: metricTotal(scoped, widget, indexByKey),
    metric: widget.metric,
    valueField: widget.valueField,
    valueLabel: widget.metric === 'count' ? '票数' : fieldOf(catalog, widget.valueField)?.label || '',
    unit: widget.metric === 'avg' && widget.valueField === 'completeness' ? '%' : '',
    total: scoped.length,
  }
}

function runWidget(widget, scoped, context) {
  if (widget.type === 'table') return aggregateTable(widget, scoped, context)
  if (widget.type === 'stat') return aggregateStat(widget, scoped, context)
  return aggregateChart(widget, scoped, context)
}

function safeRun(widget, scoped, context) {
  try {
    validateWidget(widget, context.catalog)
    return { result: runWidget(widget, scoped, context) }
  } catch (error) {
    return { error: error.message || '图表配置无效' }
  }
}

function loadScope(stateDirectory, requested, now) {
  const config = readLedgerConfig(stateDirectory)
  if (!config) {
    return {
      configured: false, config: null, catalog: emptyCatalog(), store: null,
      ledger: null, index: null, entries: [], months: [], scope: 'all', scoped: [], indexByKey: new Map(),
    }
  }
  const catalog = buildDashboardCatalog(config)
  const store = readDashboardStore(stateDirectory, { now })
  const { ledger, index, entries: raw } = collectLedgerEntries(stateDirectory)
  const indexByKey = new Map(config.columns.map((column, position) => [column.key, position]))
  const monthTotals = new Map()
  const entries = raw.map(entry => {
    const at = Number(entry.ticket.savedAt) || Number(entry.row.updatedAt) || 0
    const month = monthOf(at || now)
    monthTotals.set(month, (monthTotals.get(month) || 0) + 1)
    return { at, month, values: projectTicketRow(config, entry.ticket, entry.row).values }
  }).sort((left, right) => right.at - left.at)
  const months = [...monthTotals.entries()]
    .map(([month, count]) => ({ month, count, archived: index.months[month] !== undefined }))
    .sort((left, right) => right.month.localeCompare(left.month))
  const scope = typeof requested === 'string' && MONTH.test(requested) && monthTotals.has(requested) ? requested : 'all'
  const scoped = scope === 'all' ? entries : entries.filter(entry => entry.month === scope)
  return { configured: true, config, catalog, store, ledger, index, entries, months, scope, scoped, indexByKey }
}

const displayWidget = (widget, catalog) => ({
  ...widget,
  title: widget.title || defaultWidgetTitle(widget, catalog),
})

function revisionOf(state) {
  if (!state.configured) return ''
  const ids = Object.keys(state.index?.ids || {}).length
  return [
    state.ledger?.rev || '', state.index?.updatedAt || 0, state.index?.archivedAt || 0,
    ids, state.entries.length, state.store?.updatedAt || 0, state.scope,
  ].join(':')
}

export function readDashboard(stateDirectory, { scope, now = Date.now() } = {}) {
  const state = loadScope(stateDirectory, scope, now)
  if (!state.configured) {
    return {
      configured: false, name: '', scope: 'all', months: [], total: 0, archivedTotal: 0,
      catalog: emptyCatalog(), widgets: [], library: [], pinnedCount: 0, revision: '',
    }
  }
  const context = { catalog: state.catalog, indexByKey: state.indexByKey, scope: state.scope, now }
  const library = state.store.widgets.map(widget => displayWidget(widget, state.catalog))
  const widgets = state.store.widgets
    .filter(widget => widget.pinned)
    .map(widget => {
      const shown = displayWidget(widget, state.catalog)
      const { result, error } = safeRun(shown, state.scoped, context)
      return error ? { widget: shown, result: { kind: 'error', message: error } } : { widget: shown, result }
    })
  return {
    configured: true,
    name: state.config.name,
    scope: state.scope,
    months: state.months,
    total: state.scoped.length,
    archivedTotal: Object.keys(state.index.ids).length,
    catalog: state.catalog,
    widgets,
    library,
    pinnedCount: widgets.length,
    revision: revisionOf(state),
  }
}

/** 设计器预览：按草稿算一张图，不写文件。 */
export function previewDashboardWidget(stateDirectory, { widget, scope, now = Date.now() } = {}) {
  const state = loadScope(stateDirectory, scope, now)
  if (!state.configured) return { configured: false, widget: null, result: { kind: 'error', message: '还没有台账' } }
  const context = { catalog: state.catalog, indexByKey: state.indexByKey, scope: state.scope, now }
  const shaped = displayWidget(shapeWidget(widget), state.catalog)
  const { result, error } = safeRun(shaped, state.scoped, context)
  return {
    configured: true,
    scope: state.scope,
    widget: shaped,
    result: error ? { kind: 'error', message: error } : result,
  }
}

export function saveDashboardWidget(stateDirectory, { id, widget, now = Date.now() } = {}) {
  const config = readLedgerConfig(stateDirectory)
  if (!config) throw fail('ledger-unconfigured', '还没有台账')
  const catalog = buildDashboardCatalog(config)
  const raw = { ...(widget || {}), id: id || widget?.id }
  const existing = readDashboardStore(stateDirectory, { now }).widgets.find(item => item.id === raw.id)
  const shaped = shapeWidget({ ...raw, pinned: raw.pinned ?? existing?.pinned ?? false })
  shaped.title = shaped.title || defaultWidgetTitle(shaped, catalog)
  validateWidget(shaped, catalog)
  return upsertDashboardWidget(stateDirectory, { widget: shaped, now })
}
