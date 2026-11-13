/**
 * 台账权威数据：ledger.json（已识别值 + 人工复核值，单写者、rev 乐观并发）、
 * ledger-config.json（列与识别字段）、review.json（追加式审计）。
 * 归档目录的 saved-index 仍负责「有哪些票」，本模块只负责票上的列数据。
 */
import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { DICTIONARY_VERSION, normalizeCustomField, validateDictionary } from './order/host.bundle.mjs'
import { countLedgerLocal, readLedgerLocal } from './ledger-local.mjs'
import { readLedgerView, saveLedgerView } from './ledger-view-state.mjs'

export const LEDGER_VERSION = 1
export const LEDGER_CONFIG_VERSION = 1
export const REVIEW_VERSION = 1
export const MAX_CHANGES = 500
export const MAX_LEDGER_BYTES = 20 * 1024 * 1024
export const MAX_REVIEW_BYTES = 10 * 1024 * 1024
export const MAX_CONFIG_BYTES = 1024 * 1024
export const MAX_AUDIT_EVENTS = 2000

const VALUE_MAX = 2000
const ID_MAX = 256
const KEY_MAX = 64

export const META_COLUMNS = Object.freeze([
  { key: 'ticket', label: '票 ID', width: 170, source: 'meta' },
  { key: 'directory', label: '归档目录', width: 380, source: 'meta' },
  { key: 'group', label: '来源群', width: 150, source: 'meta' },
  { key: 'day', label: '归档日期', width: 110, source: 'meta' },
  { key: 'savedAt', label: '入账时间', width: 150, source: 'meta' },
  { key: 'fileCount', label: '文件数', width: 90, source: 'meta' },
  { key: 'completeness', label: '完整度', width: 90, source: 'meta' },
  { key: 'status', label: '核对状态', width: 100, source: 'meta' },
])
const META_KEYS = new Set(META_COLUMNS.map(column => column.key))
const META_BY_KEY = new Map(META_COLUMNS.map(column => [column.key, column]))
/** 票身份与核对状态在前，归档元信息（目录/群/日期/时间/文件数）排在业务字段之后。 */
export const LEAD_META_KEYS = Object.freeze(['ticket', 'completeness', 'status'])
export const TAIL_META_KEYS = Object.freeze(['directory', 'group', 'day', 'savedAt', 'fileCount'])
/** 新台账默认不导出文档整理信息；导出对话框里可逐列勾选。 */
export const DEFAULT_EXPORT_EXCLUDED = Object.freeze(['ticket', ...TAIL_META_KEYS])
const READONLY_META = new Set(['ticket', 'directory', 'savedAt', 'fileCount', 'completeness', 'status'])
export const READONLY_COLUMN_KEYS = Object.freeze([...READONLY_META])

const fail = (code, message) => Object.assign(new Error(message || code), { code })
const conflict = rev => Object.assign(fail('ledger-conflict', '台账已被其他窗口修改'), { currentRev: rev })
const nowMs = value => Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) : Date.now()

export const ledgerConfigPath = stateDirectory => path.join(stateDirectory, 'ledger-config.json')
export const ledgerPath = stateDirectory => path.join(stateDirectory, 'ledger.json')
export const reviewPath = stateDirectory => path.join(stateDirectory, 'review.json')

function readJson(file, maxBytes, fallback) {
  try {
    const raw = fs.readFileSync(file, 'utf8')
    if (raw.length > maxBytes) return fallback
    const value = JSON.parse(raw)
    return value && typeof value === 'object' && !Array.isArray(value) ? value : fallback
  } catch {
    return fallback
  }
}

function writeAtomic(file, payload) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const temporary = `${file}.${randomUUID()}.tmp`
  try {
    fs.writeFileSync(temporary, JSON.stringify(payload), { mode: 0o600 })
    fs.renameSync(temporary, file)
  } finally {
    try { fs.unlinkSync(temporary) } catch {}
  }
}

function cleanValue(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value.length <= VALUE_MAX ? value : null
  if (value == null) return ''
  return null
}

function cleanName(value, max, fallback = '') {
  const name = typeof value === 'string' ? value.trim() : ''
  return (name || fallback).slice(0, max)
}

/* ======================== 配置 ======================== */

function sanitizeField(def) {
  if (!def || typeof def !== 'object') return null
  const key = typeof def.key === 'string' ? def.key : ''
  const name = typeof def.name === 'string' ? def.name.trim() : ''
  if (!key || !name) return null
  return {
    key,
    name,
    source: def.source === 'custom' ? 'custom' : 'builtin',
    builtin: def.source !== 'custom',
    prompt_section: Number.isInteger(def.prompt_section) ? def.prompt_section : null,
    data_type: ['text', 'number', 'date', 'enum'].includes(def.data_type) ? def.data_type : 'text',
    normalizer: cleanName(def.normalizer, 32, 'trim'),
    shape: typeof def.shape === 'string' ? def.shape : null,
    doc_types: Array.isArray(def.doc_types) ? def.doc_types.filter(v => typeof v === 'string').slice(0, 20) : [],
    required: typeof def.required === 'boolean' ? def.required : true,
    nullable: typeof def.nullable === 'boolean' ? def.nullable : def.required === false,
    description: cleanName(def.description, 200),
    options: Array.isArray(def.options) ? def.options.map(v => cleanName(v, 30)).filter(Boolean).slice(0, 30) : [],
    examples: Array.isArray(def.examples) ? def.examples.map(v => cleanName(v, 80)).filter(Boolean).slice(0, 3) : [],
  }
}

/** 客户端新建台账时只传名称/类型/选项，key 与归一化由字典模块统一生成。 */
function normalizeFields(fields) {
  const existing = fields
    .filter(field => field && typeof field === 'object' && field.source !== 'custom' && typeof field.key === 'string' && typeof field.name === 'string')
    .map(field => ({ key: field.key, name: field.name }))
  return fields.map(field => {
    if (!field || typeof field !== 'object' || field.source !== 'custom') return field
    const normalized = normalizeCustomField(field, existing)
    existing.push(normalized)
    return normalized
  })
}

function sanitizeColumns(input, fieldKeys) {
  if (!Array.isArray(input) || !input.length || input.length > 80) return null
  const columns = []
  const seen = new Set()
  for (const item of input) {
    if (!item || typeof item !== 'object') return null
    const key = typeof item.key === 'string' ? item.key : ''
    if (!key || key.length > KEY_MAX || seen.has(key)) return null
    const source = META_KEYS.has(key) ? 'meta' : 'field'
    if (source === 'field' && !fieldKeys.has(key)) return null
    const width = Number(item.width)
    seen.add(key)
    columns.push({
      key,
      label: cleanName(item.label, 40, source === 'meta' ? META_COLUMNS.find(c => c.key === key).label : key),
      width: Number.isInteger(width) ? Math.min(800, Math.max(40, width)) : 140,
      source,
      frozen: key === 'ticket' || item.frozen === true,
    })
  }
  if (columns[0]?.key !== 'ticket') return null
  return columns
}

function sanitizeExportExcluded(input, columnKeys) {
  if (!Array.isArray(input)) return null
  return [...new Set(input.filter(key => typeof key === 'string' && columnKeys.has(key)))].slice(0, 80)
}

export function createLedgerConfig({ name, fields, columns, exportExcluded, now = Date.now(), fieldsUpdatedAt } = {}) {
  if (!Array.isArray(fields) || !fields.length) throw fail('ledger-config-invalid', '至少选择一个识别字段')
  const cleanFields = normalizeFields(fields).map(sanitizeField).filter(Boolean)
  if (cleanFields.length !== fields.length) throw fail('ledger-config-invalid', '字段定义不完整')
  const errors = validateDictionary({ version: DICTIONARY_VERSION, fields: cleanFields })
  if (errors.length) throw fail('ledger-config-invalid', errors.join('；'))
  const fieldKeys = new Set(cleanFields.map(field => field.key))
  const generated = [
    ...LEAD_META_KEYS.map(key => ({ ...META_BY_KEY.get(key) })),
    ...cleanFields.map(field => ({ key: field.key, label: field.name, width: 140, source: 'field', frozen: false })),
    ...TAIL_META_KEYS.map(key => ({ ...META_BY_KEY.get(key) })),
  ]
  const cleanColumns = sanitizeColumns(columns && columns.length ? columns : generated, fieldKeys)
  if (!cleanColumns) throw fail('ledger-config-invalid', '列配置不合法（票 ID 必须是第一列，且只能引用已选字段）')
  const columnKeys = new Set(cleanColumns.map(column => column.key))
  const keptExport = sanitizeExportExcluded(exportExcluded, columnKeys)
  return {
    version: LEDGER_CONFIG_VERSION,
    name: cleanName(name, 60, '台账'),
    grain: 'ticket',
    createdAt: nowMs(now),
    updatedAt: nowMs(now),
    fieldsUpdatedAt: nowMs(fieldsUpdatedAt || now),
    columns: cleanColumns,
    exportExcluded: keptExport ?? DEFAULT_EXPORT_EXCLUDED.filter(key => columnKeys.has(key)),
    fields: cleanFields,
  }
}

export function readLedgerConfig(stateDirectory) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) return null
  const raw = readJson(ledgerConfigPath(stateDirectory), MAX_CONFIG_BYTES, null)
  if (!raw || raw.version !== LEDGER_CONFIG_VERSION || !Array.isArray(raw.fields) || !raw.fields.length) return null
  try {
    const config = createLedgerConfig({ name: raw.name, fields: raw.fields, columns: raw.columns, exportExcluded: raw.exportExcluded, now: raw.createdAt })
    config.updatedAt = Number(raw.updatedAt) > 0 ? Number(raw.updatedAt) : config.createdAt
    config.fieldsUpdatedAt = Number(raw.fieldsUpdatedAt) > 0 ? Number(raw.fieldsUpdatedAt) : config.createdAt
    return config
  } catch {
    return null
  }
}

export function writeLedgerConfig(stateDirectory, input, { now = Date.now() } = {}) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) throw fail('ledger-config-invalid', '缺少状态目录')
  const current = readLedgerConfig(stateDirectory)
  const config = createLedgerConfig({
    name: input?.name,
    fields: input?.fields,
    columns: input?.columns,
    exportExcluded: input?.exportExcluded ?? current?.exportExcluded,
    now: current ? current.createdAt : now,
  })
  const changed = !current || JSON.stringify(current.fields) !== JSON.stringify(config.fields)
  config.updatedAt = nowMs(now)
  config.fieldsUpdatedAt = changed ? config.updatedAt : current.fieldsUpdatedAt
  writeAtomic(ledgerConfigPath(stateDirectory), config)
  return config
}

/** 记下导出时勾掉的列；至少保留一列，避免出现空表。 */
export function setLedgerExportExcluded(stateDirectory, excluded, { now = Date.now() } = {}) {
  const config = readLedgerConfig(stateDirectory)
  if (!config) throw fail('ledger-unconfigured', '尚未创建台账')
  const columnKeys = new Set(config.columns.map(column => column.key))
  const clean = sanitizeExportExcluded(excluded, columnKeys)
  if (!clean) throw fail('ledger-invalid', '导出列设置不合法')
  if (!config.columns.some(column => !clean.includes(column.key))) throw fail('ledger-export-empty', '至少保留一列导出')
  writeAtomic(ledgerConfigPath(stateDirectory), { ...config, exportExcluded: clean, updatedAt: nowMs(now) })
  return clean
}

const LEGACY_LEAD = Object.freeze(['ticket', 'directory', 'group', 'day', 'savedAt', 'fileCount', 'completeness', 'status'])

/**
 * 一次性还原：上一版曾把旧台账的列顺序改写为「票 ID/完整度/核对状态 + 字段 + 归档信息」。
 * 只命中没有 exportExcluded 的旧配置；新版写出的配置都带 exportExcluded，不会再被还原。
 */
export function restoreLegacyLayout(stateDirectory) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) return false
  let raw
  try { raw = JSON.parse(fs.readFileSync(ledgerConfigPath(stateDirectory), 'utf8')) } catch { return false }
  if (!raw || raw.exportExcluded !== undefined) return false
  const config = readLedgerConfig(stateDirectory)
  if (!config) return false
  const fieldKeys = config.fields.map(field => field.key)
  const current = config.columns.map(column => column.key)
  const migrated = current.length === fieldKeys.length + LEAD_META_KEYS.length + TAIL_META_KEYS.length
    && current[0] === 'ticket' && current[1] === 'completeness' && current[2] === 'status'
    && fieldKeys.every((key, index) => current[3 + index] === key)
    && TAIL_META_KEYS.every((key, index) => current[LEAD_META_KEYS.length + fieldKeys.length + index] === key)
  if (!migrated) return false
  const byKey = new Map(config.columns.map(column => [column.key, column]))
  const legacyKeys = [...LEGACY_LEAD, ...fieldKeys]
  const columns = legacyKeys.map(key => byKey.get(key)).filter(Boolean)
  if (columns.length !== legacyKeys.length) return false
  writeAtomic(ledgerConfigPath(stateDirectory), {
    ...config,
    columns,
    updatedAt: Date.now(),
    exportExcluded: DEFAULT_EXPORT_EXCLUDED.filter(key => byKey.has(key)),
  })
  remapViewColumns(stateDirectory, current, legacyKeys)
  return true
}

function remapViewColumns(stateDirectory, oldKeys, newKeys) {
  const view = readLedgerView(stateDirectory)
  const sheet = view?.snapshot?.sheets?.ledger
  if (!sheet) return
  if (sheet.columnData && typeof sheet.columnData === 'object') {
    const remapped = {}
    for (const [key, value] of Object.entries(sheet.columnData)) {
      if (!/^\d+$/.test(key)) { remapped[key] = value; continue }
      const oldKey = oldKeys[Number(key)]
      const index = oldKey ? newKeys.indexOf(oldKey) : -1
      if (index >= 0) remapped[String(index)] = value
    }
    sheet.columnData = remapped
  }
  sheet.freeze = { ...(sheet.freeze && typeof sheet.freeze === 'object' ? sheet.freeze : {}), xSplit: 0 }
  if (view.active) {
    const oldKey = oldKeys[view.active.column]
    const index = oldKey ? newKeys.indexOf(oldKey) : -1
    if (index >= 0) view.active.column = index
  }
  try { saveLedgerView(stateDirectory, view) } catch {}
}

/* ======================== ledger.json ======================== */

export function emptyLedger() {
  return { version: LEDGER_VERSION, rev: 0, updatedAt: 0, rows: {} }
}

function sanitizeStoredValue(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const clean = cleanValue(value.value)
  if (clean === null) return null
  return {
    value: clean,
    run_id: cleanName(value.run_id, ID_MAX),
    confidence: Number.isFinite(Number(value.confidence)) ? Number(value.confidence) : null,
    source_file: cleanName(value.source_file, 260),
    status: cleanName(value.status, 40),
    at: Number(value.at) > 0 ? Number(value.at) : 0,
  }
}

function sanitizeReviewValue(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const clean = cleanValue(value.value)
  if (clean === null) return null
  const review = {
    value: clean,
    edited_at: Number(value.edited_at) > 0 ? Number(value.edited_at) : 0,
    source: ['manual', 'migration'].includes(value.source) ? value.source : 'manual',
    base_rev: Number.isInteger(value.base_rev) ? value.base_rev : null,
  }
  const newer = value.newer === undefined ? null : cleanValue(value.newer)
  if (newer !== null && String(newer) !== String(clean)) {
    review.newer = newer
    review.newer_at = Number(value.newer_at) > 0 ? Number(value.newer_at) : 0
    review.newer_run_id = cleanName(value.newer_run_id, ID_MAX)
  }
  return review
}

function sanitizeRow(raw, id) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const values = {}
  for (const [key, value] of Object.entries(raw.values || {})) {
    if (!key || key.length > KEY_MAX) continue
    const clean = sanitizeStoredValue(value)
    if (clean) values[key] = clean
  }
  const review = {}
  for (const [key, value] of Object.entries(raw.review || {})) {
    if (!key || key.length > KEY_MAX) continue
    const clean = sanitizeReviewValue(value)
    if (clean) review[key] = clean
  }
  const row = {
    id,
    directory: cleanName(raw.directory, 1000),
    values,
    review,
    status: typeof raw.status === 'string' ? raw.status.slice(0, 40) : '',
    updatedAt: Number(raw.updatedAt) > 0 ? Number(raw.updatedAt) : 0,
  }
  // 缺省与「显式未确认」必须可区分：老行没有字段，沿用旧口径推导；新写入的行一律落 0 或时间戳。
  if (Object.prototype.hasOwnProperty.call(raw, 'confirmedAt')) row.confirmedAt = Number(raw.confirmedAt) > 0 ? Number(raw.confirmedAt) : 0
  return row
}

export function readLedger(stateDirectory) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) return emptyLedger()
  const raw = readJson(ledgerPath(stateDirectory), MAX_LEDGER_BYTES, null)
  if (!raw || raw.version !== LEDGER_VERSION || !raw.rows || typeof raw.rows !== 'object') return emptyLedger()
  const rows = {}
  for (const [id, row] of Object.entries(raw.rows)) {
    if (!id || id.length > ID_MAX) continue
    const clean = sanitizeRow(row, id)
    if (clean) rows[id] = clean
  }
  return {
    version: LEDGER_VERSION,
    rev: Number.isInteger(raw.rev) && raw.rev >= 0 ? raw.rev : 0,
    updatedAt: Number(raw.updatedAt) > 0 ? Number(raw.updatedAt) : 0,
    rows,
  }
}

function writeLedger(stateDirectory, ledger) {
  writeAtomic(ledgerPath(stateDirectory), ledger)
}

export function ticketIdOf(directory) {
  const value = typeof directory === 'string' ? directory : ''
  return value ? path.basename(value.replace(/[\\/]+$/, '')) : ''
}

export function countLedgerReview(ledger) {
  return Object.values(ledger?.rows || {}).reduce((sum, row) => sum + Object.keys(row.review || {}).length, 0)
}

/* ======================== review.json 审计 ======================== */

function readAudit(stateDirectory) {
  const raw = readJson(reviewPath(stateDirectory), MAX_REVIEW_BYTES, null)
  if (!raw || raw.version !== REVIEW_VERSION || !Array.isArray(raw.events)) {
    return { version: REVIEW_VERSION, events: [] }
  }
  return { version: REVIEW_VERSION, events: raw.events.slice(-MAX_AUDIT_EVENTS) }
}

function appendAudit(stateDirectory, events) {
  if (!events.length) return
  const audit = readAudit(stateDirectory)
  audit.events = [...audit.events, ...events].slice(-MAX_AUDIT_EVENTS)
  writeAtomic(reviewPath(stateDirectory), audit)
}

export function readReviewAudit(stateDirectory) {
  return readAudit(stateDirectory)
}

/* ======================== 写入口 ======================== */

/**
 * 识别结果入库：只更新识别值，人工复核值（review）永不覆盖。
 * 空值不擦除旧值，避免一次失败/漏识别清空台账。
 * 重复入库同一份结果不升 rev、不追加审计，供中断后补写使用。
 */
export function upsertLedgerFromExtraction(stateDirectory, extraction, { now = Date.now() } = {}) {
  const config = readLedgerConfig(stateDirectory)
  if (!config) throw fail('ledger-unconfigured', '尚未创建台账')
  if (!extraction || !Array.isArray(extraction.groups)) throw fail('ledger-invalid', '缺少识别结果')
  const fieldKeys = new Set(config.fields.map(field => field.key))
  const ledger = readLedger(stateDirectory)
  const rows = {}
  for (const [id, row] of Object.entries(ledger.rows)) rows[id] = { ...row, values: { ...row.values }, review: { ...row.review } }
  const runId = cleanName(extraction.runId, ID_MAX)
  let cells = 0
  let touched = 0
  for (const group of extraction.groups) {
    const directory = cleanName(group.directory || extraction.directory, 1000)
    const id = ticketIdOf(directory) || cleanName(group.label, ID_MAX)
    if (!id) continue
    const existing = rows[id]
    const row = existing || { id, directory, values: {}, review: {}, status: '', updatedAt: 0 }
    let changed = !existing
    // 只有识别值真的变了才撤销确认；同一结果补写（run_id 变化但值相同）不该打断已核对。
    let reopened = false
    if (directory && row.directory !== directory) {
      row.directory = directory
      changed = true
    }
    for (const value of group.values || []) {
      if (!fieldKeys.has(value.key)) continue
      const clean = cleanValue(value.value)
      if (clean === null || String(clean).trim() === '') continue
      const reviewed = row.review[value.key]
      if (reviewed) {
        if (String(reviewed.value) === String(clean)) {
          if (reviewed.newer !== undefined) {
            const { newer, newer_at, newer_run_id, ...rest } = reviewed
            row.review[value.key] = rest
            changed = true
          }
        } else if (String(reviewed.newer ?? '') !== String(clean) || reviewed.newer_run_id !== runId) {
          row.review[value.key] = {
            ...reviewed,
            newer: clean,
            newer_at: nowMs(now),
            newer_run_id: runId,
          }
          reopened = true
          changed = true
        }
      }
      const previous = row.values[value.key]
      if (!previous || String(previous.value) !== String(clean) || previous.run_id !== runId) {
        if (previous && String(previous.value) !== String(clean)) reopened = true
        row.values[value.key] = {
          value: clean,
          run_id: runId,
          confidence: Number.isFinite(Number(value.confidence)) ? Number(value.confidence) : null,
          source_file: cleanName(value.source_file, 260),
          status: cleanName(value.status, 40),
          at: nowMs(now),
        }
        cells += 1
        changed = true
      }
    }
    if (reopened && Number(row.confirmedAt) > 0) {
      row.confirmedAt = 0
      changed = true
    }
    const status = Object.keys(row.review).length ? 'edited' : 'recognized'
    if (row.status !== status) {
      row.status = status
      changed = true
    }
    if (changed) {
      row.updatedAt = nowMs(now)
      rows[id] = row
      touched += 1
    }
  }
  if (!touched) return { rev: ledger.rev, rows: Object.keys(rows).length, cells: 0, changed: false }
  const next = { version: LEDGER_VERSION, rev: ledger.rev + 1, updatedAt: nowMs(now), rows }
  writeLedger(stateDirectory, next)
  appendAudit(stateDirectory, [{
    version: REVIEW_VERSION, at: nowMs(now), rev: next.rev, action: 'recognize',
    run_id: runId, cells,
  }])
  return { rev: next.rev, rows: Object.keys(rows).length, cells, changed: true }
}

/** 人工复核写入：baseRev 不匹配时返回 confilct，由客户端刷新后重试。 */
export function saveLedgerReview(stateDirectory, { baseRev, changes, now = Date.now() } = {}) {
  const config = readLedgerConfig(stateDirectory)
  if (!config) throw fail('ledger-unconfigured', '尚未创建台账')
  const ledger = readLedger(stateDirectory)
  if (baseRev !== undefined && baseRev !== null && Number(baseRev) !== ledger.rev) throw conflict(ledger.rev)
  if (!Array.isArray(changes) || !changes.length || changes.length > MAX_CHANGES) {
    throw fail('ledger-invalid', '复核变更不合法')
  }
  const fieldKeys = new Set(config.fields.map(field => field.key))
  const rows = {}
  for (const [id, row] of Object.entries(ledger.rows)) rows[id] = { ...row, values: { ...row.values }, review: { ...row.review } }
  const events = []
  for (const change of changes) {
    const id = typeof change?.id === 'string' ? change.id.trim() : ''
    const key = typeof change?.key === 'string' ? change.key : ''
    if (!id || id.length > ID_MAX || !key || key.length > KEY_MAX) throw fail('ledger-invalid', '复核变更不合法')
    if (READONLY_META.has(key)) throw fail('ledger-column-readonly', '身份列只读')
    if (!META_KEYS.has(key) && !fieldKeys.has(key)) throw fail('ledger-invalid', '未知字段')
    const value = cleanValue(change.value)
    if (value === null) throw fail('ledger-invalid', '复核值不合法')
    const row = rows[id] || { id, directory: '', values: {}, review: {}, status: '', updatedAt: 0 }
    const before = row.review[key] ? row.review[key].value : (row.values[key]?.value ?? '')
    row.review[key] = { value, edited_at: nowMs(now), source: 'manual', base_rev: ledger.rev }
    row.status = 'edited'
    // 改了任何一个字段都要重新确认，哪怕必填字段恰好都被复核过。
    row.confirmedAt = 0
    row.updatedAt = nowMs(now)
    rows[id] = row
    events.push({
      version: REVIEW_VERSION, at: nowMs(now), rev: ledger.rev + 1, action: 'edit',
      ticket: id, key, from: before, to: value,
    })
  }
  const next = { version: LEDGER_VERSION, rev: ledger.rev + 1, updatedAt: nowMs(now), rows }
  writeLedger(stateDirectory, next)
  appendAudit(stateDirectory, events)
  return { rev: next.rev, savedAt: nowMs(now), count: events.length }
}

/**
 * 显式核对确认：把票从「待核对」推到「已核对」。
 * 只认人工动作，不靠「必填字段恰好都有复核值」推断；确认后任何改值、撤销、识别出新值都会失效。
 */
export function commitLedgerReview(stateDirectory, { baseRev, ids, now = Date.now() } = {}) {
  const config = readLedgerConfig(stateDirectory)
  if (!config) throw fail('ledger-unconfigured', '尚未创建台账')
  const ledger = readLedger(stateDirectory)
  if (baseRev !== undefined && baseRev !== null && Number(baseRev) !== ledger.rev) throw conflict(ledger.rev)
  if (!Array.isArray(ids) || !ids.length || ids.length > MAX_CHANGES) throw fail('ledger-invalid', '核对目标不合法')
  const rows = {}
  for (const [id, row] of Object.entries(ledger.rows)) rows[id] = { ...row, values: { ...row.values }, review: { ...row.review } }
  const events = []
  const confirmedAt = nowMs(now)
  for (const rawId of ids) {
    const id = typeof rawId === 'string' ? rawId.trim() : ''
    if (!id || id.length > ID_MAX) throw fail('ledger-invalid', '核对目标不合法')
    const row = rows[id]
    if (!row) throw fail('ledger-invalid', '该票尚未识别，无法核对')
    if (Object.values(row.review || {}).some(cell => cell?.newer !== undefined)) {
      throw fail('ledger-review-pending', '仍有新识别结果待处理')
    }
    if (Number(row.confirmedAt) > 0) continue
    row.confirmedAt = confirmedAt
    row.updatedAt = confirmedAt
    rows[id] = row
    events.push({ version: REVIEW_VERSION, at: confirmedAt, rev: ledger.rev + 1, action: 'confirm', ticket: id })
  }
  if (!events.length) return { rev: ledger.rev, confirmedAt: 0, count: 0 }
  const next = { version: LEDGER_VERSION, rev: ledger.rev + 1, updatedAt: confirmedAt, rows }
  writeLedger(stateDirectory, next)
  appendAudit(stateDirectory, events)
  return { rev: next.rev, confirmedAt, count: events.length }
}

/** 撤销复核值；不传 keys 时撤销该票全部字段，不传 id 时撤销整张台账。 */
export function resetLedgerReview(stateDirectory, { baseRev, id, keys, now = Date.now() } = {}) {
  const ledger = readLedger(stateDirectory)
  if (baseRev !== undefined && baseRev !== null && Number(baseRev) !== ledger.rev) throw conflict(ledger.rev)
  const targetKeys = Array.isArray(keys) ? new Set(keys.filter(key => typeof key === 'string')) : null
  const rows = {}
  let removed = 0
  for (const [rowId, row] of Object.entries(ledger.rows)) {
    if (id && rowId !== id) { rows[rowId] = row; continue }
    const review = { ...row.review }
    let touched = false
    for (const key of Object.keys(review)) {
      if (targetKeys && !targetKeys.has(key)) continue
      delete review[key]
      removed += 1
      touched = true
    }
    rows[rowId] = touched
      ? { ...row, review, status: Object.keys(review).length ? 'edited' : (Object.keys(row.values).length ? 'recognized' : ''), confirmedAt: 0 }
      : row
  }
  if (!removed) return { rev: ledger.rev, count: 0 }
  const next = { version: LEDGER_VERSION, rev: ledger.rev + 1, updatedAt: nowMs(now), rows }
  writeLedger(stateDirectory, next)
  appendAudit(stateDirectory, [{
    version: REVIEW_VERSION, at: nowMs(now), rev: next.rev, action: 'reset',
    ticket: id || null, keys: targetKeys ? [...targetKeys] : null, count: removed,
  }])
  return { rev: next.rev, count: removed }
}

/**
 * 归档后把行移出热窗：只删行、不碰配置；分片写成功后再调用，失败时热窗保持原样。
 */
export function removeLedgerRows(stateDirectory, ids, { now = Date.now(), detail = null } = {}) {
  const ledger = readLedger(stateDirectory)
  const rows = { ...ledger.rows }
  let removed = 0
  for (const id of Array.isArray(ids) ? ids : []) {
    if (!rows[id]) continue
    delete rows[id]
    removed += 1
  }
  if (!removed) return { rev: ledger.rev, removed: 0 }
  const next = { version: LEDGER_VERSION, rev: ledger.rev + 1, updatedAt: nowMs(now), rows }
  writeLedger(stateDirectory, next)
  appendAudit(stateDirectory, [{
    version: REVIEW_VERSION, at: nowMs(now), rev: next.rev, action: 'archive', count: removed,
    ...(detail && typeof detail === 'object' ? { detail } : {}),
  }])
  return { rev: next.rev, removed }
}

/**
 * 老版本地覆盖层 → review 迁移：只迁一次，原文件改名备份。
 * 票 ID 列是投影身份，不迁；其余单元格转为人工复核值。
 */
export function migrateLedgerLocal(stateDirectory, { now = Date.now() } = {}) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) throw fail('ledger-invalid', '缺少状态目录')
  const sourcePath = path.join(stateDirectory, 'ledger-local.json')
  if (!fs.existsSync(sourcePath)) return { migrated: 0, rev: readLedger(stateDirectory).rev, backupPath: null }
  const local = readLedgerLocal(stateDirectory)
  const ledger = readLedger(stateDirectory)
  const rows = {}
  for (const [id, row] of Object.entries(ledger.rows)) rows[id] = { ...row, values: { ...row.values }, review: { ...row.review } }
  let migrated = 0
  for (const [id, cells] of Object.entries(local.cells || {})) {
    const row = rows[id] || { id, directory: '', values: {}, review: {}, status: '', updatedAt: 0 }
    for (const [key, value] of Object.entries(cells)) {
      if (key === 'ticket') continue
      const clean = cleanValue(value)
      if (clean === null) continue
      row.review[key] = { value: clean, edited_at: local.savedAt || nowMs(now), source: 'migration', base_rev: null }
      migrated += 1
    }
    row.status = Object.keys(row.review).length ? 'edited' : (Object.keys(row.values).length ? 'recognized' : '')
    row.updatedAt = nowMs(now)
    rows[id] = row
  }
  let backupPath = null
  const stamp = new Date(nowMs(now)).toISOString().replace(/[:.]/g, '-')
  backupPath = path.join(stateDirectory, `ledger-local.migrated-${stamp}.json`)
  try { fs.renameSync(sourcePath, backupPath) } catch {
    try { fs.copyFileSync(sourcePath, backupPath); fs.unlinkSync(sourcePath) } catch { backupPath = null }
  }
  if (migrated) {
    const next = { version: LEDGER_VERSION, rev: ledger.rev + 1, updatedAt: nowMs(now), rows }
    writeLedger(stateDirectory, next)
    appendAudit(stateDirectory, [{
      version: REVIEW_VERSION, at: nowMs(now), rev: next.rev, action: 'migrate-local',
      cells: migrated, backup: backupPath,
    }])
    return { migrated, rev: next.rev, backupPath }
  }
  return { migrated: 0, rev: ledger.rev, backupPath }
}

export { countLedgerLocal }
