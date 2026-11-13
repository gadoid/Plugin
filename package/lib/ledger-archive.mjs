/**
 * 台账热窗与归档：热窗只留最近 N 天（并受行数上限约束）的行，
 * 其余按月写入 ledger-archive/<YYYY-MM>.json；看板只读热窗 + 所选月份分片，
 * 不回读 Excel，也不把全量行常驻内存。
 */
import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { archiveDirectory, archiveIndexPath, readArchiveIndex, writeArchiveIndex } from './ledger-archive-index.mjs'
import { ledgerPath, readLedger, readLedgerConfig, removeLedgerRows } from './ledger-store.mjs'
import { ledgerRows, projectTicketRow } from './ledger-source.mjs'

export const ARCHIVE_VERSION = 1
export const ARCHIVE_DAYS = 30
export const ARCHIVE_MAX_HOT_ROWS = 2000
export const BOARD_DEFAULT_LIMIT = 100
export const BOARD_MAX_LIMIT = 500

const DAY = 24 * 60 * 60 * 1000
const MAX_SHARD_BYTES = 128 * 1024 * 1024
const MONTH = /^\d{4}-\d{2}$/

const bound = (value, min, max, fallback) => {
  const number = Number(value)
  return Number.isInteger(number) ? Math.min(max, Math.max(min, number)) : fallback
}

export const monthOf = (ms) => {
  const date = new Date(Number(ms) || Date.now())
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export const archiveShardPath = (stateDirectory, month) => path.join(archiveDirectory(stateDirectory), `${month}.json`)

function readShard(stateDirectory, month) {
  if (!MONTH.test(month)) return { version: ARCHIVE_VERSION, month, updatedAt: 0, rows: {} }
  let raw
  try {
    const bytes = fs.readFileSync(archiveShardPath(stateDirectory, month), 'utf8')
    if (bytes.length > MAX_SHARD_BYTES) return { version: ARCHIVE_VERSION, month, updatedAt: 0, rows: {} }
    raw = JSON.parse(bytes)
  } catch {
    return { version: ARCHIVE_VERSION, month, updatedAt: 0, rows: {} }
  }
  const rows = {}
  for (const [id, row] of Object.entries(raw?.rows && typeof raw.rows === 'object' ? raw.rows : {})) {
    if (!id || !row || typeof row !== 'object') continue
    rows[id] = {
      id,
      directory: typeof row.directory === 'string' ? row.directory : '',
      group: typeof row.group === 'string' ? row.group : '',
      day: typeof row.day === 'string' ? row.day : '',
      savedAt: Number(row.savedAt) || 0,
      fileCount: Number(row.fileCount) || 0,
      values: row.values && typeof row.values === 'object' ? row.values : {},
      review: row.review && typeof row.review === 'object' ? row.review : {},
      status: typeof row.status === 'string' ? row.status : '',
      updatedAt: Number(row.updatedAt) || 0,
    }
  }
  return { version: ARCHIVE_VERSION, month, updatedAt: Number(raw?.updatedAt) || 0, rows }
}

function writeShard(stateDirectory, shard) {
  const file = archiveShardPath(stateDirectory, shard.month)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const temporary = `${file}.${randomUUID()}.tmp`
  try {
    fs.writeFileSync(temporary, JSON.stringify(shard), { mode: 0o600 })
    fs.renameSync(temporary, file)
  } finally {
    try { fs.unlinkSync(temporary) } catch {}
  }
}

/**
 * 归档：票龄超过 days，或热窗行数超过 maxHotRows 时，把最旧的行移入月分片。
 * 先写分片与索引，再从热窗删行；任一步失败时热窗保持原样，重跑幂等。
 */
export function archiveLedger(stateDirectory, { now = Date.now(), days = ARCHIVE_DAYS, maxHotRows = ARCHIVE_MAX_HOT_ROWS } = {}) {
  const config = readLedgerConfig(stateDirectory)
  if (!config) return { archived: 0, months: [], rev: readLedger(stateDirectory).rev, archivedTotal: 0 }
  const ledger = readLedger(stateDirectory)
  const tickets = new Map(ledgerRows(stateDirectory).map(ticket => [ticket.id, ticket]))
  const candidates = []
  for (const [id, row] of Object.entries(ledger.rows)) {
    const ticket = tickets.get(id) || { id, directory: row.directory, group: '', day: '', savedAt: row.updatedAt || 0, fileCount: 0 }
    const at = Number(ticket.savedAt) || Number(row.updatedAt) || 0
    if (!at) continue
    candidates.push({ id, row, ticket, at })
  }
  const cutoff = now - Math.max(1, Number(days) || ARCHIVE_DAYS) * DAY
  const selected = new Set(candidates.filter(item => item.at < cutoff).map(item => item.id))
  const hotRows = Math.max(1, Number(maxHotRows) || ARCHIVE_MAX_HOT_ROWS)
  const remaining = candidates.filter(item => !selected.has(item.id)).sort((left, right) => left.at - right.at)
  if (remaining.length > hotRows) {
    for (const item of remaining.slice(0, remaining.length - hotRows)) selected.add(item.id)
  }
  if (!selected.size) return { archived: 0, months: [], rev: ledger.rev, archivedTotal: Object.keys(readArchiveIndex(stateDirectory).ids).length }

  const byMonth = new Map()
  for (const item of candidates) {
    if (!selected.has(item.id)) continue
    const month = monthOf(item.at)
    if (!byMonth.has(month)) byMonth.set(month, [])
    byMonth.get(month).push(item)
  }

  const index = readArchiveIndex(stateDirectory)
  for (const [month, items] of byMonth) {
    const shard = readShard(stateDirectory, month)
    for (const item of items) {
      shard.rows[item.id] = {
        id: item.id,
        directory: item.ticket.directory || item.row.directory || '',
        group: item.ticket.group || '',
        day: item.ticket.day || '',
        savedAt: item.ticket.savedAt || item.row.updatedAt || 0,
        fileCount: item.ticket.fileCount || 0,
        values: item.row.values || {},
        review: item.row.review || {},
        status: item.row.status || '',
        updatedAt: item.row.updatedAt || 0,
      }
      index.ids[item.id] = month
    }
    shard.updatedAt = now
    writeShard(stateDirectory, shard)
    index.months[month] = Object.keys(shard.rows).length
  }
  index.updatedAt = now
  index.archivedAt = now
  writeArchiveIndex(stateDirectory, index)

  const { rev } = removeLedgerRows(stateDirectory, [...selected], { now, detail: { months: [...byMonth.keys()] } })
  return { archived: selected.size, months: [...byMonth.keys()], rev, archivedTotal: Object.keys(index.ids).length }
}

/**
 * 看板查询：所选月份 = 归档分片 + 未归档热窗行（同票以热窗为准），
 * 按配置投影后分页返回；汇总在当前月全部行上计算。
 */
export function readBoard(stateDirectory, { month, offset, limit, now = Date.now() } = {}) {
  const size = bound(limit, 1, BOARD_MAX_LIMIT, BOARD_DEFAULT_LIMIT)
  const config = readLedgerConfig(stateDirectory)
  if (!config) {
    return { configured: false, revision: '', months: [], columns: [], rows: [], total: 0, offset: 0, limit: size, summary: { status: {}, archived: 0 }, archivedTotal: 0 }
  }
  const ledger = readLedger(stateDirectory)
  const index = readArchiveIndex(stateDirectory)
  const tickets = new Map(ledgerRows(stateDirectory).map(ticket => [ticket.id, ticket]))
  const hot = []
  const monthSet = new Set(Object.keys(index.months))
  const hotCount = new Map()
  for (const [id, row] of Object.entries(ledger.rows)) {
    const ticket = tickets.get(id) || { id, directory: row.directory, group: '', day: '', savedAt: row.updatedAt || 0, fileCount: 0 }
    const at = Number(ticket.savedAt) || Number(row.updatedAt) || 0
    const monthKey = monthOf(at || now)
    hot.push({ id, ticket, row, month: monthKey })
    monthSet.add(monthKey)
    if (!index.ids[id]) hotCount.set(monthKey, (hotCount.get(monthKey) || 0) + 1)
  }
  const months = [...monthSet].sort().reverse()
  const selected = typeof month === 'string' && monthSet.has(month) ? month : months[0] || monthOf(now)

  const entries = new Map()
  if (index.months[selected] !== undefined) {
    const shard = readShard(stateDirectory, selected)
    for (const row of Object.values(shard.rows)) {
      entries.set(row.id, {
        archived: true,
        ticket: { id: row.id, directory: row.directory, group: row.group, day: row.day, savedAt: row.savedAt, fileCount: row.fileCount },
        row,
      })
    }
  }
  for (const item of hot) {
    if (item.month !== selected) continue
    entries.set(item.id, { archived: false, ticket: item.ticket, row: item.row })
  }

  const ordered = [...entries.values()].sort((left, right) =>
    (Number(right.ticket.savedAt) || 0) - (Number(left.ticket.savedAt) || 0) || String(left.ticket.id).localeCompare(String(right.ticket.id)))
  const projected = ordered.map(entry => {
    const result = projectTicketRow(config, entry.ticket, entry.row)
    if (entry.archived) result.archived = true
    return result
  })
  const statusIndex = config.columns.findIndex(column => column.key === 'status')
  const summary = { status: {}, archived: 0 }
  for (const row of projected) {
    const status = String(row.values[statusIndex] ?? '')
    summary.status[status] = (summary.status[status] || 0) + 1
    if (row.archived) summary.archived += 1
  }
  const start = bound(offset, 0, Math.max(0, projected.length), 0)
  const monthList = months.map(key => ({
    month: key,
    count: (index.months[key] || 0) + (hotCount.get(key) || 0),
    archived: index.months[key] !== undefined,
  }))
  return {
    configured: true,
    revision: `${ledger.rev}:${index.updatedAt}:${index.archivedAt}:${Object.keys(index.ids).length}:${selected}`,
    month: selected,
    months: monthList,
    total: projected.length,
    offset: start,
    limit: size,
    columns: config.columns,
    rows: projected.slice(start, start + size),
    summary,
    archivedTotal: Object.keys(index.ids).length,
    archivedAt: index.archivedAt,
  }
}

/** 归档分片 + 热窗 + 保存索引的合并集合（同票热窗优先），供导出与统计一次性读取。 */
export function collectLedgerEntries(stateDirectory) {
  const ledger = readLedger(stateDirectory)
  const index = readArchiveIndex(stateDirectory)
  const tickets = new Map(ledgerRows(stateDirectory).map(ticket => [ticket.id, ticket]))
  const entries = new Map()
  for (const month of Object.keys(index.months)) {
    for (const row of Object.values(readShard(stateDirectory, month).rows)) {
      entries.set(row.id, {
        archived: true,
        ticket: { id: row.id, directory: row.directory, group: row.group, day: row.day, savedAt: row.savedAt, fileCount: row.fileCount },
        row,
      })
    }
  }
  for (const [id, row] of Object.entries(ledger.rows)) {
    const ticket = tickets.get(id) || { id, directory: row.directory, group: '', day: '', savedAt: row.updatedAt || 0, fileCount: 0 }
    entries.set(id, { archived: false, ticket, row })
  }
  // 尚未识别的归档票也要计入台账（与台账页同口径）；归档分片里的票只在分片读取。
  for (const ticket of tickets.values()) {
    if (entries.has(ticket.id) || index.ids[ticket.id]) continue
    entries.set(ticket.id, { archived: false, ticket, row: undefined })
  }
  return { ledger, index, entries: [...entries.values()] }
}

const bySavedAt = (left, right) =>
  (Number(right.ticket.savedAt) || 0) - (Number(left.ticket.savedAt) || 0) || String(left.ticket.id).localeCompare(String(right.ticket.id))

/** 导出用全量视图：归档分片 + 热窗（同票以热窗为准），只用于一次性导出。 */
export function readAllRows(stateDirectory) {
  const config = readLedgerConfig(stateDirectory)
  if (!config) return { configured: false, columns: [], rows: [] }
  const { entries } = collectLedgerEntries(stateDirectory)
  return {
    configured: true,
    columns: config.columns,
    rows: entries.sort(bySavedAt).map(entry => projectTicketRow(config, entry.ticket, entry.row)),
  }
}

const statOf = (file) => {
  try {
    const stat = fs.statSync(file)
    return `${Math.trunc(stat.mtimeMs)}:${stat.size}`
  } catch {
    return '0:0'
  }
}

/** 看板轮询用的轻量版本号：只 stat 两个文件，不解析 ledger.json 与索引。 */
export function readBoardState(stateDirectory) {
  return {
    revision: `${statOf(ledgerPath(stateDirectory))}:${statOf(archiveIndexPath(stateDirectory))}`,
  }
}
