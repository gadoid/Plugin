/**
 * 台账页的数据投影：一票 = 一个归档目录，行来自保存索引。
 *
 * 识别完成后台账应以 ledger.json 为权威；在识别接入之前，这里只按
 * saved-index.json 现算「已归档票」的行，不写任何状态，避免出现第二个写点。
 */
import fs from 'node:fs'
import path from 'node:path'
import { countLedgerLocal } from './ledger-local.mjs'
import { countLedgerReview, READONLY_COLUMN_KEYS, readLedger, readLedgerConfig } from './ledger-store.mjs'
import { readArchiveIndex } from './ledger-archive-index.mjs'

export const LEDGER_COLUMNS = [
  { key: 'ticket', label: '票 ID', width: 170 },
  { key: 'directory', label: '归档目录', width: 380 },
  { key: 'group', label: '来源群', width: 150 },
  { key: 'day', label: '归档日期', width: 110 },
  { key: 'savedAt', label: '入账时间', width: 150 },
  { key: 'fileCount', label: '文件数', width: 90 },
]

export const LEDGER_DEFAULT_LIMIT = 1000
export const LEDGER_MAX_LIMIT = 5000

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

const stamp = (ms) => {
  const value = Number(ms)
  if (!Number.isFinite(value) || value <= 0) return ''
  const date = new Date(value)
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const bound = (value, min, max, fallback) => {
  const number = Number(value)
  return Number.isInteger(number) ? Math.min(max, Math.max(min, number)) : fallback
}

export function ledgerRows(stateDirectory) {
  const index = readJson(path.join(stateDirectory, 'saved-index.json'))
  const settings = readJson(path.join(stateDirectory, 'settings.json'))
  const groupNames = new Map(
    (Array.isArray(settings?.groups) ? settings.groups : []).map((group) => [String(group?.id ?? ''), String(group?.name || group?.folderName || group?.id || '')]),
  )
  const directories = new Map()
  for (const entry of Object.values(index?.entries || {})) {
    if (typeof entry?.path !== 'string') continue
    const directory = path.dirname(entry.path)
    const key = process.platform === 'win32' ? directory.toLowerCase() : directory
    const row = directories.get(key) || {
      directory,
      groupId: String(entry.groupId || ''),
      day: String(entry.day || ''),
      savedAt: 0,
      fileCount: 0,
    }
    row.fileCount += 1
    row.savedAt = Math.max(row.savedAt, Number(entry.savedAt) || 0)
    directories.set(key, row)
  }
  return [...directories.values()]
    .sort((left, right) => right.savedAt - left.savedAt || left.directory.localeCompare(right.directory))
    .map((row) => ({
      id: path.basename(row.directory),
      directory: row.directory,
      group: groupNames.get(row.groupId) || row.groupId,
      day: row.day,
      savedAt: row.savedAt,
      fileCount: row.fileCount,
    }))
}

export function ledgerState({ stateDirectory, offset, limit, local } = {}) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) throw Object.assign(new Error('ledger: missing state directory'), { code: 'ledger-unavailable' })
  const config = readLedgerConfig(stateDirectory)
  if (!config) return legacyState({ stateDirectory, offset, limit, local })
  return configuredState({ stateDirectory, offset, limit, local, config })
}

function legacyState({ stateDirectory, offset, limit, local }) {
  const tickets = ledgerRows(stateDirectory)
  const start = bound(offset, 0, Math.max(0, tickets.length), 0)
  const size = bound(limit, 1, LEDGER_MAX_LIMIT, LEDGER_DEFAULT_LIMIT)
  const overrides = local?.cells || {}
  return {
    revision: `${tickets.length}:${tickets[0]?.savedAt || 0}`,
    total: tickets.length,
    offset: start,
    limit: size,
    columns: LEDGER_COLUMNS,
    localCount: countLedgerLocal(local),
    configured: false,
    rows: tickets.slice(start, start + size).map((ticket) => {
      const values = [ticket.id, ticket.directory, ticket.group, ticket.day, stamp(ticket.savedAt), ticket.fileCount]
      const override = overrides[ticket.id]
      if (!override) return { id: ticket.id, values }
      const marks = {}
      LEDGER_COLUMNS.forEach((column, index) => {
        if (column.key === 'ticket' || !Object.prototype.hasOwnProperty.call(override, column.key)) return
        values[index] = override[column.key]
        marks[column.key] = true
      })
      return Object.keys(marks).length ? { id: ticket.id, values, local: marks } : { id: ticket.id, values }
    }),
  }
}

function metaValue(ticket, key) {
  if (key === 'ticket') return ticket.id
  if (key === 'directory') return ticket.directory
  if (key === 'group') return ticket.group
  if (key === 'day') return ticket.day
  if (key === 'savedAt') return stamp(ticket.savedAt)
  if (key === 'fileCount') return ticket.fileCount
  return ''
}

/** 完整度按必填字段的显示值覆盖计算；核对状态只看必填字段是否都有人工复核值。 */
function rowSummary(config, row) {
  const stored = row?.values || {}
  const review = row?.review || {}
  const valueOf = key => Object.prototype.hasOwnProperty.call(review, key) ? review[key].value : stored[key]?.value
  const required = config.fields.filter(field => field.required)
  const filled = required.filter(field => String(valueOf(field.key) ?? '').trim()).length
  const reviewed = required.filter(field => Object.prototype.hasOwnProperty.call(review, field.key) && String(valueOf(field.key) ?? '').trim()).length
  const anyValue = config.fields.some(field => String(valueOf(field.key) ?? '').trim())
  const stale = Number(config.fieldsUpdatedAt) > 0 && Number(row?.updatedAt) > 0 && Number(row.updatedAt) < Number(config.fieldsUpdatedAt)
  const newer = {}
  for (const [key, cell] of Object.entries(review)) {
    if (cell?.newer !== undefined) newer[key] = true
  }
  return {
    completeness: required.length ? Math.round((filled / required.length) * 100) : 100,
    status: !anyValue ? '未识别' : stale ? '待重识别' : required.length > 0 && reviewed === required.length ? '已核对' : '待核对',
    newer,
  }
}

/** 一票一行的显示投影；热窗与归档分片共用，保证两处口径一致。 */
export function projectTicketRow(config, ticket, row, overrides) {
  const review = row?.review || {}
  const stored = row?.values || {}
  const summary = rowSummary(config, row)
  const values = config.columns.map((column) => {
    if (column.key === 'ticket') return ticket.id
    if (column.key === 'completeness' || column.key === 'status') return summary[column.key]
    if (Object.prototype.hasOwnProperty.call(review, column.key)) return review[column.key].value
    if (column.source === 'meta') return metaValue(ticket, column.key)
    return Object.prototype.hasOwnProperty.call(stored, column.key) ? stored[column.key].value : ''
  })
  const marks = {}
  const newer = {}
  const override = overrides?.[ticket.id]
  config.columns.forEach((column, index) => {
    if (column.key === 'ticket') return
    if (Object.prototype.hasOwnProperty.call(review, column.key) && !READONLY_COLUMN_KEYS.includes(column.key)) marks[column.key] = true
    if (summary.newer[column.key]) newer[column.key] = true
    if (override && Object.prototype.hasOwnProperty.call(override, column.key)
      && !READONLY_COLUMN_KEYS.includes(column.key) && !Object.prototype.hasOwnProperty.call(review, column.key)) {
      values[index] = override[column.key]
      marks[column.key] = true
    }
  })
  const result = { id: ticket.id, values }
  if (Object.keys(marks).length) result.local = marks
  if (Object.keys(newer).length) result.newer = newer
  return result
}

function configuredState({ stateDirectory, offset, limit, local, config }) {
  const ledger = readLedger(stateDirectory)
  const index = readArchiveIndex(stateDirectory)
  const archivedIds = index.ids
  const tickets = ledgerRows(stateDirectory).filter(ticket => !archivedIds[ticket.id] || ledger.rows[ticket.id])
  const known = new Set(tickets.map(ticket => ticket.id))
  for (const [id, row] of Object.entries(ledger.rows)) {
    if (known.has(id)) continue
    tickets.push({ id, directory: row.directory, group: '', day: '', savedAt: row.updatedAt || 0, fileCount: 0 })
  }
  tickets.sort((left, right) => right.savedAt - left.savedAt || left.id.localeCompare(right.id))
  const start = bound(offset, 0, Math.max(0, tickets.length), 0)
  const size = bound(limit, 1, LEDGER_MAX_LIMIT, LEDGER_DEFAULT_LIMIT)
  const overrides = local?.cells || {}
  const columnIndex = new Map()
  config.columns.forEach((column, index) => { if (column.key !== 'ticket') columnIndex.set(column.key, index) })
  const rows = tickets.slice(start, start + size).map(ticket => projectTicketRow(config, ticket, ledger.rows[ticket.id], overrides))
  let newerCount = 0
  for (const row of Object.values(ledger.rows)) {
    for (const [key, cell] of Object.entries(row.review || {})) {
      if (columnIndex.has(key) && cell?.newer !== undefined) newerCount += 1
    }
  }
  const archivedTotal = Object.keys(archivedIds).length
  return {
    revision: `${ledger.rev}:${tickets.length}:${tickets[0]?.savedAt || 0}:${archivedTotal}:${index.archivedAt}`,
    total: tickets.length,
    offset: start,
    limit: size,
    columns: config.columns,
    localCount: countLedgerReview(ledger) + countLedgerLocal(local),
    newerCount,
    configured: true,
    name: config.name,
    exportExcluded: config.exportExcluded,
    rev: ledger.rev,
    fieldCount: config.fields.length,
    archivedTotal,
    archivedAt: index.archivedAt,
    rows,
  }
}
