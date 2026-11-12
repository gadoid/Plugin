/**
 * 页2 本地写：归档目录投影之上的一层覆盖值，键 =（票 ID，列 key）。
 *
 * 只落在 stateDirectory，不写归档目录、不改 saved-index；投影行暂时消失时
 * 覆盖值仍保留，目录回来后再自动生效。
 */
import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

const FILE = 'ledger-local.json'
const MAX_BYTES = 2 * 1024 * 1024
const MAX_ID = 256
const MAX_KEY = 64
const MAX_VALUE = 2000
const MAX_CELLS = 50000

const invalid = () => Object.assign(new Error('ledger-local: invalid cells'), { code: 'ledger-local-invalid' })

const empty = () => ({ version: 1, savedAt: 0, cells: {} })

function normalizeValue(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value.length <= MAX_VALUE ? value : null
  return value == null ? '' : null
}

function sanitize(file) {
  if (!file || typeof file !== 'object' || Array.isArray(file) || file.version !== 1) return null
  const source = file.cells
  if (!source || typeof source !== 'object' || Array.isArray(source)) return null
  const cells = {}
  let count = 0
  for (const [id, row] of Object.entries(source)) {
    if (!id || id.length > MAX_ID || !row || typeof row !== 'object' || Array.isArray(row)) continue
    const clean = {}
    for (const [key, value] of Object.entries(row)) {
      if (!key || key.length > MAX_KEY) continue
      const normalized = normalizeValue(value)
      if (normalized === null) continue
      clean[key] = normalized
      count += 1
      if (count > MAX_CELLS) return null
    }
    if (Object.keys(clean).length) cells[id] = clean
  }
  return { version: 1, savedAt: Number(file.savedAt) > 0 ? Number(file.savedAt) : 0, cells }
}

export function countLedgerLocal(local) {
  return Object.values(local?.cells || {}).reduce((sum, row) => sum + Object.keys(row || {}).length, 0)
}

export function readLedgerLocal(stateDirectory) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) return empty()
  let raw
  try { raw = fs.readFileSync(path.join(stateDirectory, FILE), 'utf8') } catch { return empty() }
  if (raw.length > MAX_BYTES) return empty()
  try { return sanitize(JSON.parse(raw)) || empty() } catch { return empty() }
}

export function saveLedgerLocal(stateDirectory, changes) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) throw invalid()
  if (!Array.isArray(changes) || changes.length > MAX_CELLS) throw invalid()
  const cells = { ...readLedgerLocal(stateDirectory).cells }
  for (const change of changes) {
    const id = typeof change?.id === 'string' ? change.id.trim() : ''
    const key = typeof change?.key === 'string' ? change.key : ''
    if (!id || id.length > MAX_ID || !key || key.length > MAX_KEY) throw invalid()
    const value = normalizeValue(change?.value)
    if (value === null) throw invalid()
    cells[id] = { ...(cells[id] || {}), [key]: value }
  }
  return write(stateDirectory, cells)
}

export function resetLedgerLocal(stateDirectory) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) throw invalid()
  try { fs.unlinkSync(path.join(stateDirectory, FILE)) } catch {}
  return { savedAt: 0, count: 0 }
}

function write(stateDirectory, cells) {
  const payload = { version: 1, savedAt: Date.now(), cells }
  const serialized = JSON.stringify(payload)
  if (serialized.length > MAX_BYTES) throw invalid()
  const count = countLedgerLocal(payload)
  if (count > MAX_CELLS) throw invalid()
  fs.mkdirSync(stateDirectory, { recursive: true })
  const file = path.join(stateDirectory, FILE)
  const temporary = `${file}.${randomUUID()}.tmp`
  try {
    fs.writeFileSync(temporary, serialized, { mode: 0o600 })
    fs.renameSync(temporary, file)
  } finally {
    try { fs.unlinkSync(temporary) } catch {}
  }
  return { savedAt: payload.savedAt, count }
}
