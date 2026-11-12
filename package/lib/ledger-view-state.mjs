/**
 * 台账视图状态：只存视图（列宽、行高、冻结、筛选、活动格），行数据始终来自 Host 投影。
 *
 * 客户端提交的是 Univer workbook 快照去掉 cellData 的部分，并与最新行数据在客户端合并，
 * 所以这里不存任何票数据，避免出现第二个数据来源。
 */
import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

const FILE = 'ledger-view.json'
const MAX_BYTES = 1024 * 1024
const MAX_ROW_INDEX = 20000
const MAX_COLUMN_INDEX = 64

const clampIndex = (value, max) => {
  const number = Number(value)
  return Number.isInteger(number) && number >= 0 && number <= max ? number : null
}

const invalid = () => Object.assign(new Error('ledger-view: invalid state'), { code: 'ledger-view-invalid' })

export function readLedgerView(stateDirectory) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) return null
  let raw
  try { raw = fs.readFileSync(path.join(stateDirectory, FILE), 'utf8') } catch { return null }
  if (raw.length > MAX_BYTES) return null
  try { return sanitize(JSON.parse(raw)) } catch { return null }
}

export function saveLedgerView(stateDirectory, view) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) throw invalid()
  const clean = sanitize(view)
  if (!clean) throw invalid()
  clean.savedAt = Date.now()
  fs.mkdirSync(stateDirectory, { recursive: true })
  const file = path.join(stateDirectory, FILE)
  const temporary = `${file}.${randomUUID()}.tmp`
  try {
    fs.writeFileSync(temporary, JSON.stringify(clean), { mode: 0o600 })
    fs.renameSync(temporary, file)
  } finally {
    try { fs.unlinkSync(temporary) } catch {}
  }
  return { savedAt: clean.savedAt }
}

export function sanitizeLedgerView(view) {
  return sanitize(view)
}

function sanitize(view) {
  if (!view || typeof view !== 'object' || Array.isArray(view) || view.version !== 1) return null
  const source = view.snapshot
  const sheet = source?.sheets?.ledger
  if (!sheet || typeof sheet !== 'object' || Array.isArray(sheet)) return null
  const kept = { ...sheet }
  delete kept.cellData
  delete kept.rowCount
  delete kept.columnCount
  const active = view.active
  const clean = {
    version: 1,
    savedAt: Number(view.savedAt) > 0 ? Number(view.savedAt) : 0,
    active: active && clampIndex(active.row, MAX_ROW_INDEX) != null && clampIndex(active.column, MAX_COLUMN_INDEX) != null
      ? { row: clampIndex(active.row, MAX_ROW_INDEX), column: clampIndex(active.column, MAX_COLUMN_INDEX) }
      : null,
    snapshot: {
      sheets: { ledger: kept },
      ...(source?.resources != null && typeof source.resources === 'object' ? { resources: source.resources } : {}),
    },
  }
  const serialized = JSON.stringify(clean)
  if (serialized.length > MAX_BYTES) throw invalid()
  return JSON.parse(serialized)
}
