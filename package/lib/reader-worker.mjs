/** Isolated association/copy job; native source work remains Host-managed. */
import { parentPort, workerData } from 'node:worker_threads'
import * as fs from 'node:fs/promises'
import path from 'node:path'
import { accounts, findGroups, listAttachments, accountPath, normalizeCacheRoots } from './source.mjs'
import { attachmentLayout, cacheIndexes, saveAttachment, prepareGroupDirectories, OperationError, checkCancel, inside, safeName } from './files.mjs'
import { buildPlan } from './review-plan.mjs'

const { action, settings, stateDirectory, range, cancelBuffer, name, mode = 'bill', records = [], sourceCache, savedIndex, savedIndexDays = 7 } = workerData
const cancelled = () => Atomics.load(new Int32Array(cancelBuffer), 0) !== 0
const savedCutoff = Date.now() - (Number.isInteger(savedIndexDays) && savedIndexDays >= 1 && savedIndexDays <= 365 ? savedIndexDays : 7) * 86400000
const emit = data => parentPort.postMessage(data)
/** Prior saves are a hint: only reuse an entry when the identity, fingerprint, size and file still match. */
async function markSavedBefore(planned) {
  if (!savedIndex || typeof savedIndex !== 'object') return
  for (const record of planned) {
    if (record.selectable !== true) continue
    const entry = savedIndex[record.id]
    if (!entry || typeof entry.path !== 'string' || !(entry.savedAt >= savedCutoff)) continue
    const md5 = String(record.md5 ?? '').toLowerCase()
    if (!/^[a-f0-9]{32}$/.test(md5) || entry.md5 !== md5) continue
    checkCancel(cancelled)
    let info
    try { info = await fs.stat(entry.path) } catch { continue }
    if (!info.isFile() || (Number.isSafeInteger(entry.size) && entry.size >= 0 && info.size !== entry.size)) continue
    record.selected = false
    record.savedBefore = { path: entry.path, savedAt: entry.savedAt }
    // Reuse the folder that actually received the file (default folder or group folder).
    if (typeof entry.documentFolder === 'string' && entry.documentFolder) {
      const layout = attachmentLayout(settings.saveDirectory, { ...record, documentFolder: entry.documentFolder })
      if (layout) {
        record.documentFolder = layout.documentFolder
        record.plannedName = layout.filename
        record.plannedPath = path.join(settings.saveDirectory, record.folder, record.day, layout.documentFolder, layout.filename)
      }
    }
  }
}
/** Backfill from the archive itself when no ledger entry exists; only a unique same-name same-size copy is trusted. */
async function discoverArchivedSaves(planned) {
  const pending = planned.filter(record => record.selectable === true && !record.savedBefore)
  if (!pending.length) return []
  const days = new Map()
  for (const record of pending) {
    if (typeof record.folder !== 'string' || typeof record.day !== 'string' || !Number.isSafeInteger(record.size) || record.size < 0) continue
    const key = `${record.folder}\u0000${record.day}`
    if (!days.has(key)) days.set(key, [])
    days.get(key).push(record)
  }
  const discoveries = []
  for (const [key, rows] of days) {
    const [folder, day] = key.split('\u0000')
    const dayPath = path.join(settings.saveDirectory, folder, day)
    let realDay
    try { realDay = await fs.realpath(dayPath) } catch { continue }
    const found = new Map()
    const walk = async (directory, depth) => {
      let entries
      try { entries = await fs.readdir(directory, { withFileTypes: true }) } catch { return }
      for (const entry of entries) {
        checkCancel(cancelled)
        if (entry.isSymbolicLink()) continue
        const filename = path.join(directory, entry.name)
        if (entry.isDirectory()) { if (depth < 2) await walk(filename, depth + 1); continue }
        if (!entry.isFile()) continue
        let info
        try { info = await fs.lstat(filename) } catch { continue }
        if (!info.isFile()) continue
        const id = `${entry.name.toLowerCase()}\u0000${info.size}`
        const list = found.get(id)
        if (list) list.push(filename)
        else found.set(id, [filename])
      }
    }
    await walk(dayPath, 0)
    for (const record of rows) {
      const names = new Set([String(record.name).toLowerCase(), safeName(record.name, 32767).toLowerCase()])
      let candidate
      for (const name of names) {
        const list = found.get(`${name}\u0000${record.size}`)
        if (list) { candidate = list.length === 1 ? list[0] : null; break }
      }
      if (!candidate) continue
      let real
      try { real = await fs.realpath(candidate) } catch { continue }
      if (!inside(realDay, real)) continue
      const documentFolder = path.relative(dayPath, path.dirname(candidate))
      if (!documentFolder || path.isAbsolute(documentFolder) || documentFolder.includes(path.sep)) continue
      let layout, info
      try { layout = attachmentLayout(settings.saveDirectory, { ...record, documentFolder }); info = await fs.stat(candidate) } catch { continue }
      if (!layout || !info.isFile() || !Number.isFinite(info.mtimeMs) || info.mtimeMs < savedCutoff) continue
      const savedAt = Math.round(info.mtimeMs)
      record.selected = false
      record.savedBefore = { path: candidate, savedAt }
      record.documentFolder = layout.documentFolder
      record.plannedName = layout.filename
      record.plannedPath = path.join(settings.saveDirectory, record.folder, record.day, layout.documentFolder, layout.filename)
      discoveries.push({ id: record.id, path: candidate, md5: String(record.md5).toLowerCase(), size: record.size, groupId: record.groupId, day: record.day, documentFolder: layout.documentFolder, savedAt })
    }
  }
  return discoveries
}
let nextId = 0
const pending = new Map()
const nativeReader = request => new Promise((resolve, reject) => { const id = ++nextId; pending.set(id, { resolve, reject }); emit({ type: 'native-source', id, request }) })
parentPort.on('message', message => {
  if (message.type !== 'native-response') return
  const operation = pending.get(message.id)
  if (!operation) return
  pending.delete(message.id)
  if (message.ok) operation.resolve(message.value)
  else operation.reject(new OperationError(message.code))
})
try {
  if (action === 'accounts') emit({ type: 'result', value: await accounts(settings.root || undefined, stateDirectory, cancelled, nativeReader) })
  else if (action === 'groups') emit({ type: 'result', value: await findGroups(settings, name, stateDirectory, cancelled, nativeReader) })
  else if (action === 'preview') {
    if (!['all', 'bill'].includes(mode)) throw new OperationError('invalid-save-mode')
    emit({ type: 'progress', phase: 'reading' })
    const source = await listAttachments(settings, range.start, range.end, range.cutoff, stateDirectory, cancelled, nativeReader)
    checkCancel(cancelled)
    const planned = buildPlan(source.records, settings, mode)
    await markSavedBefore(planned)
    const discovered = await discoverArchivedSaves(planned)
    emit({ type: 'progress', phase: 'review', total: planned.length, warnings: source.warnings })
    let done = 0
    for (const record of planned) { checkCancel(cancelled); emit({ type: 'record', record, done: ++done, total: planned.length }) }
    emit({ type: 'result', value: { cache: source.cache, savedDiscoveries: discovered } })
  } else if (action === 'save') {
    if (!['all', 'bill'].includes(mode)) throw new OperationError('invalid-save-mode')
    const account = await accountPath(settings.root, settings.account)
    const sourceRoots = normalizeCacheRoots(sourceCache, account)
    checkCancel(cancelled)
    const selected = records.filter(record => record.selected)
    let base, migratedGroups = 0
    if (selected.length) {
      checkCancel(cancelled)
      await fs.mkdir(settings.saveDirectory, { recursive: true })
      base = await fs.realpath(settings.saveDirectory)
      if (inside(await fs.realpath(settings.root), base) || inside(stateDirectory, base)) throw new OperationError('destination-in-source')
      checkCancel(cancelled)
      migratedGroups = await prepareGroupDirectories(base, { ...settings, groups: settings.groups.filter(group => selected.some(record => record.groupId === group.id)) }, cancelled)
    }
    emit({ type: 'progress', phase: 'indexing', total: records.length, migratedGroups })
    const index = selected.length ? await cacheIndexes(sourceRoots, cancelled) : new Map(), fingerprints = new Map()
    let done = 0
    for (const record of records) {
      checkCancel(cancelled)
      let outcome
      try {
        if (!record.selected) outcome = { status: 'not-selected' }
        else if (record.sourceStatus !== 'ok') outcome = { status: 'source-conflict' }
        else if (!Number.isSafeInteger(record.size) || record.size < 0) outcome = { status: 'unverifiable' }
        else outcome = await saveAttachment(record, base, index, fingerprints, cancelled)
      } catch (error) {
        if (error.code === 'cancelled') throw error
        outcome = { status: 'failed', error: error.code || 'file-error' }
      }
      emit({ type: 'record', record: { ...record, ...outcome }, done: ++done, total: records.length })
    }
    emit({ type: 'result', value: { total: records.length } })
  } else throw new OperationError('unknown-action')
} catch (error) {
  emit({ type: 'error', code: error.code || 'source-format-unsupported', message: error.code ? undefined : String(error.message).slice(0, 300) })
} finally {
  pending.clear()
  parentPort.close()
}
