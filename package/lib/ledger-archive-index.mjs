/**
 * 归档索引：票 ID → 月份分片。热窗过滤与看板月份列表只读这份索引，
 * 不扫分片；分片本身只存行数据。
 */
import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

export const ARCHIVE_INDEX_VERSION = 1
export const ARCHIVE_DIR_NAME = 'ledger-archive'
export const MAX_ARCHIVE_INDEX_BYTES = 64 * 1024 * 1024

const MONTH = /^\d{4}-\d{2}$/

export const archiveIndexPath = stateDirectory => path.join(stateDirectory, 'ledger-archive.json')
export const archiveDirectory = stateDirectory => path.join(stateDirectory, ARCHIVE_DIR_NAME)

export function emptyArchiveIndex() {
  return { version: ARCHIVE_INDEX_VERSION, updatedAt: 0, archivedAt: 0, months: {}, ids: {} }
}

export function readArchiveIndex(stateDirectory) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) return emptyArchiveIndex()
  let raw
  try {
    const bytes = fs.readFileSync(archiveIndexPath(stateDirectory), 'utf8')
    if (bytes.length > MAX_ARCHIVE_INDEX_BYTES) return emptyArchiveIndex()
    raw = JSON.parse(bytes)
  } catch {
    return emptyArchiveIndex()
  }
  if (!raw || raw.version !== ARCHIVE_INDEX_VERSION || !raw.ids || typeof raw.ids !== 'object') return emptyArchiveIndex()
  const ids = {}
  for (const [id, month] of Object.entries(raw.ids)) {
    if (typeof id === 'string' && id && typeof month === 'string' && MONTH.test(month)) ids[id] = month
  }
  const months = {}
  for (const [month, count] of Object.entries(raw.months && typeof raw.months === 'object' ? raw.months : {})) {
    if (MONTH.test(month) && Number.isInteger(count) && count >= 0) months[month] = count
  }
  return {
    version: ARCHIVE_INDEX_VERSION,
    updatedAt: Number(raw.updatedAt) > 0 ? Number(raw.updatedAt) : 0,
    archivedAt: Number(raw.archivedAt) > 0 ? Number(raw.archivedAt) : 0,
    months,
    ids,
  }
}

export function writeArchiveIndex(stateDirectory, index) {
  const file = archiveIndexPath(stateDirectory)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const temporary = `${file}.${randomUUID()}.tmp`
  try {
    fs.writeFileSync(temporary, JSON.stringify(index), { mode: 0o600 })
    fs.renameSync(temporary, file)
  } finally {
    try { fs.unlinkSync(temporary) } catch {}
  }
}
