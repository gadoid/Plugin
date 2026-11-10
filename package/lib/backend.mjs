/** Persistent workbench configuration and user-triggered worker lifecycle. */
import * as fs from 'node:fs/promises'
import path from 'node:path'
import { Worker } from 'node:worker_threads'
import { randomUUID } from 'node:crypto'
import { homedir } from 'node:os'
import { dateWindow, today, accountPath } from './source.mjs'
import { OperationError, inside, safeName, exists, ARCHIVE_LAYOUT_VERSION, hashFile, childDirectory, shortId, checkCancel } from './files.mjs'
import { isZipName, readZipEntries, writeZipEntry, publishExtracted, extractedFileName, ZIP_TOTAL_SIZE_LIMIT } from './zip-archive.mjs'
import { isRarName, readRarEntries, extractRarToStaging, hashExtracted } from './rar-archive.mjs'
import { FILTER_VERSION } from './filename-filter.mjs'
import { directoryNameError, directoryPathError, suggestDirectoryName, fileNameError } from './directory-rules.mjs'
import { applyReview, summarizeGroups } from './review-plan.mjs'

export async function writeJson(filename, value, { exclusive = false } = {}) {
  const temporary = `${filename}.${randomUUID()}.tmp`
  try {
    await fs.writeFile(temporary, JSON.stringify(value), { flag: 'wx', mode: 0o600 })
    if (exclusive) { await fs.link(temporary, filename); return } // Same-directory, atomic no-replace publication.
    // Windows scanners/readers can briefly hold the existing state file without delete sharing.
    for (let attempt = 0; ; attempt++) {
      try { await fs.rename(temporary, filename); break }
      catch (error) { if (attempt >= 6 || !['EPERM', 'EACCES', 'EBUSY'].includes(error.code)) throw error; await new Promise(resolve => setTimeout(resolve, 25 * (attempt + 1))) }
    }
  }
  finally { await fs.unlink(temporary).catch(error => { if (error.code !== 'ENOENT') throw error }) }
}
async function readJson(filename, fallback) {
  try { return JSON.parse(await fs.readFile(filename, 'utf8')) } catch (error) { if (error.code === 'ENOENT') return fallback; throw new OperationError('state-unreadable') }
}
/** Rows a save result already keeps final: counted as saved, never selectable or saveable again. */
const finalInSaveResult = row => row.status === 'saved' || row.status === 'existing' || row.status === 'not-selected' && Boolean(row.savedBefore)
/** Per-file memory of verified save locations, kept across reads; entries are advisory only. */
const SAVED_INDEX_LIMIT = 10000
const EXTRACT_DEPTH_LIMIT = 8
const isArchiveName = name => isZipName(name) || isRarName(name)
const archiveFolderName = name => { const extension = path.extname(name); return safeName(name.slice(0, name.length - extension.length) || '_', 180) }
const extractSummary = () => ({ saved: 0, existing: 0, failed: 0, skipped: 0, pathTooLong: 0, errors: [] })
function validateSavedIndex(value) {
  const entries = {}
  if (value && typeof value === 'object' && value.version === 1 && value.entries && typeof value.entries === 'object') {
    for (const [id, entry] of Object.entries(value.entries)) {
      if (typeof id !== 'string' || !id || id === '__proto__' || id.length > 1024 || !entry || typeof entry !== 'object') continue
      if (typeof entry.path !== 'string' || !path.isAbsolute(entry.path) || entry.path.length > 2048) continue
      if (typeof entry.md5 !== 'string' || !/^[a-f0-9]{32}$/i.test(entry.md5) || !Number.isFinite(entry.savedAt)) continue
      const documentFolder = typeof entry.documentFolder === 'string' && entry.documentFolder && entry.documentFolder.length <= 180 && !directoryNameError(entry.documentFolder) ? entry.documentFolder : ''
      // Extracted files have no attachment row; they are remembered by their own key and keep the package they came from.
      const extracted = entry.kind === 'extracted'
      if (extracted && (typeof entry.sourceId !== 'string' || !entry.sourceId || entry.sourceId.length > 1024 || typeof entry.entryPath !== 'string' || !entry.entryPath || entry.entryPath.length > 1024)) continue
      entries[id] = {
        path: entry.path, savedAt: entry.savedAt, md5: entry.md5.toLowerCase(),
        size: Number.isSafeInteger(entry.size) ? entry.size : -1,
        groupId: typeof entry.groupId === 'string' ? entry.groupId.slice(0, 512) : '',
        day: typeof entry.day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(entry.day) ? entry.day : '',
        documentFolder,
        ...(extracted ? {
          kind: 'extracted', sourceId: entry.sourceId, entryPath: entry.entryPath,
          sourceArchive: typeof entry.sourceArchive === 'string' ? entry.sourceArchive.slice(0, 300) : '',
          folder: typeof entry.folder === 'string' && entry.folder.length <= 180 && !directoryNameError(entry.folder) ? entry.folder : '',
        } : {}),
      }
    }
  }
  return { version: 1, entries }
}
/** Fuzzy filename/saved-folder filter and message-time ordering for a group's records page.
 *  Keywords are case-insensitive; whitespace separates tokens that must all match.
 *  Ascending (the default) preserves the reader's chronological order for equal times. */
export function queryRecords(records, { keyword = '', order = 'asc', folderOf = null } = {}) {
  const tokens = keyword.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const textOf = row => `${String(row.name ?? '')}\n${String(folderOf ? folderOf(row) : row.documentFolder ?? '')}\n${String(row.savedBefore?.path ?? '')}`.toLowerCase()
  const filtered = tokens.length ? records.filter(row => {
    const text = textOf(row)
    return tokens.every(token => text.includes(token))
  }) : [...records]
  const timeOf = row => { const number = Number(row.time); return number > 0 ? number : Number.MAX_SAFE_INTEGER }
  filtered.sort((a, b) => timeOf(a) - timeOf(b))
  if (order === 'desc') filtered.reverse()
  return filtered
}
/** The Host-provided profile home (profileContext.home) owns the state, so
 * Sparkseed devices keep data under ~/.sparkseed and the dsh desktop under
 * ~/.eline. Bare hosts keep the previous ~/.eline default; DSH_HOME and the
 * pre-host ~/.eline default remain legacy import sources only. */
export function resolveStateLocation(override, { hostHome = null, userHome = homedir(), legacyHome = process.env.DSH_HOME } = {}) {
  if (override != null) return { stateDirectory: override, legacyStateDirectories: [] }
  const home = hostHome || path.join(userHome, '.eline')
  const stateDirectory = path.join(home, 'plugin-data', 'wecom-fws')
  const key = value => { const resolved = path.resolve(value); return process.platform === 'win32' ? resolved.toLowerCase() : resolved }
  const seen = new Set([key(stateDirectory)])
  const legacyStateDirectories = [
    path.join(userHome, '.eline', 'plugin-data', 'wecom-files'),
    legacyHome && path.isAbsolute(legacyHome) ? path.join(legacyHome, 'plugin-data', 'wecom-files') : null,
    path.join(userHome, '.dsh', 'plugin-data', 'wecom-files'),
  ].filter(value => {
    if (!value || seen.has(key(value))) return false
    seen.add(key(value)); return true
  })
  return { stateDirectory, legacyStateDirectories }
}

/** Import only known JSON state, retaining originals and never replacing new state.
 * The atomic import snapshot allows an interrupted two-file import to resume.
 */
async function importLegacyState({ stateDirectory, legacyStateDirectories = [] }) {
  if (!legacyStateDirectories.length) return
  const pendingFile = path.join(stateDirectory, '.legacy-import.json')
  const validate = value => {
    if (!value || typeof value !== 'object' || !('settings' in value) || !('job' in value)) throw new OperationError('state-unreadable')
    if (value.settings !== null) validateSettings(value.settings, { allowInvalidDirectories: true })
    if (value.job !== null && (typeof value.job !== 'object' || !Array.isArray(value.job.records))) throw new OperationError('state-unreadable')
    return value
  }
  try {
    let imported = await readJson(pendingFile, null)
    if (!imported) {
      if (await exists(path.join(stateDirectory, 'settings.json')) || await exists(path.join(stateDirectory, 'last-run.json'))) return
      for (const legacy of legacyStateDirectories) {
        const settings = await readJson(path.join(legacy, 'settings.json'), null)
        const job = await readJson(path.join(legacy, 'last-run.json'), null)
        if (settings === null && job === null) continue
        imported = validate({ settings, job })
        try { await writeJson(pendingFile, imported, { exclusive: true }) }
        catch (error) { if (error.code !== 'EEXIST') throw error; imported = await readJson(pendingFile, null) }
        break
      }
    }
    if (!imported) return
    validate(imported)
    for (const [filename, value] of [['settings.json', imported.settings], ['last-run.json', imported.job]]) {
      if (value === null) continue
      try { await writeJson(path.join(stateDirectory, filename), value, { exclusive: true }) }
      catch (error) { if (error.code !== 'EEXIST') throw error }
    }
    await fs.unlink(pendingFile).catch(error => { if (error.code !== 'ENOENT') throw error })
  } catch { throw new OperationError('state-migration-failed') }
}
export function validateSettings(value, { allowInvalidDirectories = false } = {}) {
  if (!value || typeof value !== 'object' || typeof value.root !== 'string' || typeof value.account !== 'string' || typeof value.saveDirectory !== 'string' || !Array.isArray(value.groups) || value.groups.length > 100) throw new OperationError('invalid-settings')
  if (!path.isAbsolute(value.root) || !/^\d+$/.test(value.account)) throw new OperationError('absolute-path-required')
  const directoryError = directoryPathError(value.saveDirectory)
  if (directoryError && !allowInvalidDirectories) throw new OperationError(directoryError)
  if (value.groups.some(group => !group || typeof group.id !== 'string' || !group.id || group.id.length > 512 || typeof group.name !== 'string' || !group.name.trim() || group.name.length > 200)) throw new OperationError('invalid-groups')
  if (new Set(value.groups.map(group => group.id)).size !== value.groups.length) throw new OperationError('duplicate-group')
  const root = path.resolve(value.root), saveDirectory = directoryError ? value.saveDirectory : path.resolve(value.saveDirectory)
  if (!directoryError && inside(root, saveDirectory)) throw new OperationError('destination-in-source')
  if (value.accountLabel !== undefined && (typeof value.accountLabel !== 'string' || value.accountLabel.length > 300)) throw new OperationError('invalid-settings')
  if (value.savedIndexDays !== undefined && (!Number.isInteger(value.savedIndexDays) || value.savedIndexDays < 1 || value.savedIndexDays > 365)) throw new OperationError('invalid-settings')
  if (value.defaultSavedFilter !== undefined && !['unsaved', 'saved', 'all'].includes(value.defaultSavedFilter)) throw new OperationError('invalid-settings')
  if (value.ignoreSaved !== undefined && typeof value.ignoreSaved !== 'boolean') throw new OperationError('invalid-settings')
  if (value.autoExtract !== undefined && typeof value.autoExtract !== 'boolean') throw new OperationError('invalid-settings')
  if (value.extractNested !== undefined && typeof value.extractNested !== 'boolean') throw new OperationError('invalid-settings')
  return { root, account: value.account, accountLabel: value.accountLabel || '', savedIndexDays: value.savedIndexDays ?? 7, defaultSavedFilter: value.defaultSavedFilter ?? (value.ignoreSaved === true ? 'unsaved' : 'all'), autoExtract: value.autoExtract === true, extractNested: value.extractNested === true, saveDirectory, groups: value.groups.map(group => {
    if (group.folderName !== undefined && typeof group.folderName !== 'string') throw new OperationError('invalid-groups')
    if (group.sourceLabel !== undefined && (typeof group.sourceLabel !== 'string' || group.sourceLabel.length > 300)) throw new OperationError('invalid-groups')
    const folderName = group.folderName ?? suggestDirectoryName(group.name.trim())
    if (!allowInvalidDirectories && directoryNameError(folderName)) throw new OperationError('invalid-folder-name')
    return { id: group.id, name: group.name.trim(), sourceLabel: group.sourceLabel || '', folderName, folder: safeName(folderName, 180) }
  }) }
}
/** Retention, the default filter and post-save extraction only affect future reads or saves, so they never make a generated preview stale. */
const previewSettingsKey = value => JSON.stringify(value ? { ...value, savedIndexDays: undefined, ignoreSaved: undefined, defaultSavedFilter: undefined, autoExtract: undefined, extractNested: undefined } : value)
/** Reject names that would mix separate groups in one Windows directory. */
function requireDistinctFolders(settings) {
  const names = settings.groups.map(group => group.folder.toLowerCase())
  if (new Set(names).size !== names.length) throw new OperationError('duplicate-folder-name')
}
/** Re-check the current filesystem before saving config or confirming an archive plan. */
/** Surface common Windows sharing/permission failures without leaking host paths. */
function fileSystemError(error) {
  if (error && ['EPERM', 'EACCES', 'EBUSY'].includes(error.code)) return new OperationError('file-locked')
  if (error && error.code === 'ENOENT') return new OperationError('file-missing')
  if (error && error.code === 'EEXIST') return new OperationError('file-exists')
  return new OperationError('file-operation-failed')
}
async function checkDestination(settings, stateDirectory) {
  await accountPath(settings.root, settings.account)
  const root = await fs.realpath(settings.root)
  let existing = settings.saveDirectory, resolvedParent
  try {
    while (!await exists(existing)) {
      const parent = path.dirname(existing)
      if (parent === existing) throw new OperationError('save-directory-unavailable')
      existing = parent
    }
    if (!(await fs.stat(existing)).isDirectory()) throw new OperationError('save-directory-unavailable')
    resolvedParent = await fs.realpath(existing)
  } catch { throw new OperationError('save-directory-unavailable') }
  const realDestination = path.resolve(resolvedParent, path.relative(existing, settings.saveDirectory))
  if (inside(root, realDestination) || inside(stateDirectory, realDestination)) throw new OperationError('destination-in-source')
}
export class Workbench {
  constructor(config) {
    this.config = config; this.settings = null; this.job = null; this.clearedResultId = null; this.active = new Map(); this.closed = false; this.running = null; this.rowBusy = false; this.extractAbort = null
    this.savedIndex = { version: 1, entries: {} }
    this.ready = this.load()
    this.mutations = Promise.resolve()
  }
  async load() {
    await fs.mkdir(this.config.stateDirectory, { recursive: true })
    await importLegacyState(this.config)
    const saved = await readJson(path.join(this.config.stateDirectory, 'settings.json'), null)
    this.settings = saved ? validateSettings(saved, { allowInvalidDirectories: true }) : null
    this.clearedResultId = typeof saved?.clearedResultId === 'string' ? saved.clearedResultId : null
    this.job = await readJson(path.join(this.config.stateDirectory, 'last-run.json'), null)
    if (this.clearedResultId && this.job?.id === this.clearedResultId) this.job = null
    if (this.job && (['running', 'cancelling'].includes(this.job.status) || this.job.extracting === true)) {
      if (['running', 'cancelling'].includes(this.job.status)) this.job.status = 'interrupted'
      this.job.extracting = false
      await this.persistJob()
    }
    try { this.savedIndex = validateSavedIndex(await readJson(path.join(this.config.stateDirectory, 'saved-index.json'), null)) } catch { this.savedIndex = { version: 1, entries: {} } }
    // Seed from the retained save result so files saved before this index existed are recognised too.
    if (this.job?.operation === 'save' && ['completed', 'incomplete'].includes(this.job.status) && this.mergeSaved(this.job.records, this.job.finishedAt || this.job.confirmedAt || Date.now())) {
      this.pruneSaved()
      try { await this.persistSavedIndex() } catch { /* Advisory state. */ }
    }
  }
  async persistJob() { if (this.job) await writeJson(path.join(this.config.stateDirectory, 'last-run.json'), this.job) }
  /** Keep retained save-result totals aligned after a single-row archive change. */
  adjustCount(from, to) {
    if (!this.job || this.job.operation !== 'save') return
    const counts = this.job.counts || (this.job.counts = {})
    if (from && Number.isFinite(counts[from]) && counts[from] > 0) counts[from] -= 1
    if (to) counts[to] = (counts[to] || 0) + 1
  }
  async persistSavedIndex() { await writeJson(path.join(this.config.stateDirectory, 'saved-index.json'), this.savedIndex) }
  /** Merge verified outcomes; an older retained result never replaces a newer remembered location. */
  mergeSaved(rows, savedAt) {
    const entries = this.savedIndex.entries
    let changed = false
    for (const row of rows || []) {
      if (typeof row.id !== 'string' || !row.id || row.id === '__proto__' || row.id.length > 1024) continue
      if (row.status !== 'saved' && row.status !== 'existing') continue
      if (typeof row.path !== 'string' || !path.isAbsolute(row.path) || row.path.length > 2048) continue
      if (typeof row.md5 !== 'string' || !/^[a-f0-9]{32}$/i.test(row.md5)) continue
      const md5 = row.md5.toLowerCase()
      const existing = entries[row.id]
      if (existing && (existing.savedAt > savedAt || existing.md5 === md5 && existing.path === row.path)) continue
      entries[row.id] = {
        path: row.path, savedAt, md5,
        size: Number.isSafeInteger(row.size) ? row.size : -1,
        groupId: typeof row.groupId === 'string' ? row.groupId : '',
        day: typeof row.day === 'string' ? row.day : '',
        documentFolder: typeof row.documentFolder === 'string' && row.documentFolder && row.documentFolder.length <= 180 && !directoryNameError(row.documentFolder) ? row.documentFolder : '',
      }
      changed = true
    }
    return changed
  }
  pruneSaved() {
    const list = Object.entries(this.savedIndex.entries).sort((a, b) => (b[1].savedAt || 0) - (a[1].savedAt || 0))
    this.savedIndex = { version: 1, entries: Object.fromEntries(list.slice(0, SAVED_INDEX_LIMIT)) }
  }
  /** Drop remembered locations older than the configured retention; runs before each query. */
  async pruneSavedExpired(days = 7) {
    const retention = Number.isInteger(days) && days >= 1 && days <= 365 ? days : 7
    const cutoff = Date.now() - retention * 86400000
    let changed = false
    const entries = {}
    for (const [id, entry] of Object.entries(this.savedIndex.entries)) {
      if (entry.savedAt >= cutoff) entries[id] = entry
      else changed = true
    }
    if (!changed) return
    this.savedIndex = { version: 1, entries }
    this.pruneSaved()
    try { await this.persistSavedIndex() } catch { /* Advisory state. */ }
  }
  /** Remember verified locations for saved copies so later reads can mark them as done. */
  async rememberSaved() {
    if (!this.mergeSaved(this.job?.records, Date.now())) return
    this.pruneSaved()
    try { await this.persistSavedIndex() } catch { /* Advisory state; the save itself already succeeded. */ }
  }
  /** Persist archive-backfilled locations so later reads reuse the folder that actually holds the file. */
  async rememberDiscovered(list) {
    const entries = this.savedIndex.entries
    let changed = false
    for (const item of Array.isArray(list) ? list.slice(0, SAVED_INDEX_LIMIT) : []) {
      if (!item || typeof item.id !== 'string' || !item.id || item.id === '__proto__' || item.id.length > 1024) continue
      if (typeof item.path !== 'string' || !path.isAbsolute(item.path) || item.path.length > 2048) continue
      if (typeof item.md5 !== 'string' || !/^[a-f0-9]{32}$/i.test(item.md5) || !Number.isFinite(item.savedAt)) continue
      const md5 = item.md5.toLowerCase(), size = Number.isSafeInteger(item.size) ? item.size : -1
      const documentFolder = typeof item.documentFolder === 'string' && item.documentFolder && item.documentFolder.length <= 180 && !directoryNameError(item.documentFolder) ? item.documentFolder : ''
      const existing = entries[item.id]
      if (existing && existing.path === item.path && existing.md5 === md5 && existing.size === size && existing.documentFolder === documentFolder) continue
      entries[item.id] = {
        path: item.path, savedAt: item.savedAt, md5, size,
        groupId: typeof item.groupId === 'string' ? item.groupId : '',
        day: typeof item.day === 'string' ? item.day : '',
        documentFolder,
      }
      changed = true
    }
    if (!changed) return
    this.pruneSaved()
    try { await this.persistSavedIndex() } catch { /* Advisory state. */ }
  }
  /** The archive copy shown by the directory view, for both previews and save results. */
  savedPathOf(row) {
    if (!this.job) return null
    return this.job.operation === 'preview'
      ? row.savedBefore?.path
      : row.status === 'saved' || row.status === 'existing' ? row.path
        : row.status === 'not-selected' && row.savedBefore ? row.savedBefore.path : null
  }
  /** Prove a remembered copy still sits below the job's save directory. */
  async proveSaved(filePath, base) {
    if (typeof filePath !== 'string' || !filePath || !path.isAbsolute(filePath)) throw new OperationError('not-saved')
    if (typeof base !== 'string' || !path.isAbsolute(base)) throw new OperationError('not-saved')
    const resolvedFile = path.resolve(filePath)
    // The saved path is already canonical, but the configured root may use a short
    // name or a junction; compare physical paths instead of spellings.
    let realBase, info
    try {
      realBase = await fs.realpath(path.resolve(base))
      info = await fs.lstat(resolvedFile)
    } catch (error) {
      if (error.code === 'ENOENT') throw new OperationError('file-missing')
      throw new OperationError('unsafe-output-path')
    }
    if (!info.isFile() || info.isSymbolicLink()) throw new OperationError('unsafe-output-path')
    let realFile
    try { realFile = await fs.realpath(resolvedFile) } catch (error) {
      if (error.code === 'ENOENT') throw new OperationError('file-missing')
      throw new OperationError('unsafe-output-path')
    }
    if (!inside(realBase, realFile)) throw new OperationError('unsafe-output-path')
    return { base: realBase, filePath: realFile }
  }
  /** Resolve one archive file after proving it still sits below the job's save directory. */
  async archiveEntry(recordId) {
    if (!this.job) throw new OperationError('job-changed')
    if (typeof recordId !== 'string' || !recordId) throw new OperationError('invalid-request')
    const index = this.job.records.findIndex(row => row.id === recordId)
    if (index < 0) throw new OperationError('invalid-review')
    const row = this.job.records[index]
    const base = this.job.sourceSettings?.saveDirectory || this.settings?.saveDirectory
    const proven = await this.proveSaved(this.savedPathOf(row), base)
    return { index, row, ...proven }
  }
  /** An archived file is addressed either by its attachment row or by an extracted-file index key. */
  async archiveFile(id) {
    if (!this.job) throw new OperationError('job-changed')
    if (typeof id !== 'string' || !id) throw new OperationError('invalid-request')
    const base = this.job.sourceSettings?.saveDirectory || this.settings?.saveDirectory
    if (id.startsWith('extracted:')) {
      const entry = this.savedIndex.entries[id]
      if (!entry || entry.kind !== 'extracted') throw new OperationError('invalid-review')
      const proven = await this.proveSaved(entry.path, base)
      return { kind: 'extracted', id, entry, ...proven, name: path.basename(entry.path), md5: entry.md5, size: entry.size, groupId: entry.groupId, day: entry.day, folder: entry.folder, time: entry.savedAt }
    }
    const resolved = await this.archiveEntry(id)
    const { row } = resolved
    return { kind: 'row', id: row.id, ...resolved, name: row.name, md5: row.md5, size: row.size, groupId: row.groupId, day: row.day, folder: row.folder, time: row.time }
  }
  /** The copy may have been replaced since it was verified; re-prove it before reading a package. */
  async proveArchiveContent(target, cancel) {
    const expected = String(target.md5 ?? '').toLowerCase()
    if (!/^[a-f0-9]{32}$/.test(expected)) throw new OperationError('unverifiable')
    const before = await fs.lstat(target.filePath)
    const digest = await hashFile(target.filePath, cancel)
    const after = await fs.lstat(target.filePath)
    if (before.ino !== after.ino || before.dev !== after.dev || before.size !== after.size || before.mtimeMs !== after.mtimeMs || digest.md5 !== expected || Number.isSafeInteger(target.size) && target.size >= 0 && digest.size !== target.size) throw new OperationError('archive-changed')
    return digest
  }
  /** How many files were already extracted from each remembered package. */
  extractedCounts() {
    const counts = new Map()
    for (const entry of Object.values(this.savedIndex.entries)) {
      if (entry.kind !== 'extracted' || !entry.sourceId) continue
      counts.set(entry.sourceId, (counts.get(entry.sourceId) || 0) + 1)
    }
    return counts
  }
  /** Extract every supported entry flat into the package's directory; a landed sub-archive gets its own name-named subdirectory. Optionally recurse. */
  async extractArchive(target, { cancel, nested, depth = 0, summary }) {
    const zip = isZipName(target.name)
    await this.proveArchiveContent(target, cancel)
    const listing = await (zip ? readZipEntries(target.filePath, cancel) : readRarEntries(target.filePath, cancel))
    const chosen = listing.entries.filter(entry => entry.supported)
    summary.skipped += listing.entries.length - chosen.length
    if (!chosen.length) return
    if (chosen.reduce((sum, entry) => sum + entry.size, 0) > ZIP_TOTAL_SIZE_LIMIT) throw new OperationError('archive-too-large')
    const parentParts = path.relative(target.base, path.dirname(target.filePath)).split(path.sep).filter(Boolean)
    // A saved attachment already sits inside its name-named folder; a landed sub-archive needs a new one so its contents do not mix into the parent's.
    const directory = await childDirectory(target.base, target.kind === 'extracted' ? [...parentParts, archiveFolderName(target.name)] : parentParts)
    const noteError = code => { summary.failed++; if (summary.errors.length < 20) summary.errors.push(code) }
    const publishEntry = async (entry, sourcePath, digest) => {
      const clean = extractedFileName(entry.name, directory)
      if (!clean) { summary.pathTooLong++; return }
      const published = await publishExtracted(sourcePath, directory, clean, digest, cancel)
      if (published.status === 'conflict') { noteError('file-exists'); return }
      this.savedIndex.entries[`extracted:${shortId(`${target.id}\0${entry.path}`)}`] = {
        kind: 'extracted', path: published.path, savedAt: Date.now(), md5: digest.md5, size: digest.size,
        groupId: target.groupId, day: target.day, folder: target.folder, documentFolder: '',
        sourceId: target.id, sourceArchive: target.name, entryPath: entry.path,
      }
      summary[published.status]++
    }
    // One level at a time: a package inside the package lands as an ordinary file, then recurses below when enabled.
    if (zip) {
      for (const entry of chosen) {
        checkCancel(cancel)
        let temporary
        try {
          temporary = path.join(directory, `.eline-part-${randomUUID()}`)
          const digest = await writeZipEntry(target.filePath, entry, temporary, cancel)
          await publishEntry(entry, temporary, digest)
        } catch (error) {
          if (error.code === 'cancelled') throw error
          noteError(error.code || 'file-operation-failed')
        } finally { if (temporary) await fs.unlink(temporary).catch(() => {}) }
      }
    } else {
      // unrar writes synchronously into a fresh staging directory on the same volume, so publication hardlinks stay local.
      const staging = await fs.mkdtemp(path.join(directory, '.eline-rar-'))
      try {
        const { extracted, error } = await extractRarToStaging(target.filePath, chosen.map(entry => entry.rawName), staging, cancel)
        for (const entry of chosen) {
          checkCancel(cancel)
          if (!extracted.has(entry.rawName)) { noteError(error?.code || 'rar-entry-changed'); continue }
          try {
            const staged = path.join(staging, entry.path)
            const digest = await hashExtracted(staged, entry, cancel)
            await publishEntry(entry, staged, digest)
          } catch (error) {
            if (error.code === 'cancelled') throw error
            noteError(error.code || 'file-operation-failed')
          }
        }
      } finally { await fs.rm(staging, { recursive: true, force: true }).catch(() => {}) }
    }
    if (!nested || depth + 1 >= EXTRACT_DEPTH_LIMIT) return
    for (const entry of chosen) {
      if (!isArchiveName(entry.name)) continue
      const key = `extracted:${shortId(`${target.id}\0${entry.path}`)}`
      if (!this.savedIndex.entries[key]) continue
      checkCancel(cancel)
      try {
        await this.extractArchive(await this.archiveFile(key), { cancel, nested, depth: depth + 1, summary })
      } catch (error) {
        if (error.code === 'cancelled') throw error
        noteError(error.code || 'file-operation-failed')
      }
    }
  }
  /** Auto-extract every package this save verified; one package's failure never blocks the others or the save result. */
  async autoExtractSaved(settings, cancel) {
    const summary = extractSummary()
    for (const row of this.job.records) {
      if (row.status !== 'saved' && row.status !== 'existing') continue
      if (!isArchiveName(row.name)) continue
      checkCancel(cancel)
      try {
        await this.extractArchive(await this.archiveFile(row.id), { cancel, nested: settings.extractNested === true, summary })
      } catch (error) {
        if (error.code === 'cancelled') throw error
        summary.failed++; if (summary.errors.length < 20) summary.errors.push(error.code || 'file-operation-failed')
      }
    }
    return summary
  }
  /** Link first so an existing target is rejected atomically instead of overwritten. */
  async renameArchiveFile(filePath, newName) {
    const directory = path.dirname(filePath), target = path.resolve(directory, newName)
    if (path.dirname(target) !== directory) throw new OperationError('invalid-file-name')
    if (target !== filePath) {
      const caseOnly = process.platform === 'win32' && target.toLowerCase() === filePath.toLowerCase()
      if (caseOnly) {
        try { await fs.rename(filePath, target) } catch (error) { throw fileSystemError(error) }
      } else {
        if (await exists(target)) throw new OperationError('file-exists')
        try {
          await fs.link(filePath, target)
          try { await fs.unlink(filePath) } catch (error) { await fs.unlink(target).catch(() => {}); throw error }
        } catch (error) { throw fileSystemError(error) }
      }
    }
    return target
  }
  snapshot() {
    let job = null
    if (this.job) {
      const { sourceSettings, sourceCache, ...visible } = this.job
      job = { ...visible, records: this.job.records.slice(0, 100), displayed: Math.min(100, this.job.records.length), recordCount: this.job.records.length }
      // A scoped save only carries its own source groups; listing the others would show
      // misleading empty cards for groups this save never touched.
      const withRecords = groups => this.job.operation === 'save' ? groups.filter(group => this.job.records.some(row => row.groupId === group.id)) : groups
      if (this.job.reviewVersion === 1 && sourceSettings) {
        job.groupSummaries = summarizeGroups(this.job.records, withRecords(sourceSettings.groups), this.job.operation === 'save' ? finalInSaveResult : undefined)
        job.previewStale = previewSettingsKey(this.settings) !== previewSettingsKey(sourceSettings)
        job.saveDirectory = sourceSettings.saveDirectory
      } else {
        const groups = [...(this.settings?.groups || [])]
        for (const row of this.job.records) if (typeof row.groupId === 'string' && !groups.some(group => group.id === row.groupId)) groups.push({ id: row.groupId, name: row.group || row.groupId, folder: safeName(row.folder || row.group || row.groupId, 180) })
        job.groupSummaries = summarizeGroups(this.job.records.filter(row => typeof row.groupId === 'string'), withRecords(groups))
        job.reviewReady = false
      }
    }
    return { settings: this.settings, job, today: today(), defaultRoot: path.join(homedir(), 'Documents', 'WXWork'), sourceCapability: this.config.nativeReader ? 'wecom-readonly' : 'readable-index-only' }
  }
  /** Shared group/keyword/status/group-filter query; status means "already saved" for previews and verified outcomes for save results. */
  filteredRecords(request) {
    if (!this.job || request.jobId !== this.job.id) throw new OperationError('job-changed')
    if (request.groupId !== undefined && (typeof request.groupId !== 'string' || !this.job.records.some(row => row.groupId === request.groupId) && !(this.job.sourceSettings?.groups || this.settings?.groups || []).some(group => group.id === request.groupId))) throw new OperationError('invalid-review')
    if (request.keyword !== undefined && (typeof request.keyword !== 'string' || request.keyword.length > 100)) throw new OperationError('invalid-request')
    if (request.order !== undefined && !['asc', 'desc'].includes(request.order)) throw new OperationError('invalid-request')
    if (request.status !== undefined && !['saved', 'unsaved'].includes(request.status)) throw new OperationError('invalid-request')
    const validIds = ids => Array.isArray(ids) && ids.length <= 10000 && ids.every(id => typeof id === 'string' && id.length <= 200)
    if (request.includeIds !== undefined && !validIds(request.includeIds)) throw new OperationError('invalid-request')
    if (request.excludeIds !== undefined && !validIds(request.excludeIds)) throw new OperationError('invalid-request')
    if (request.includeIds !== undefined && request.excludeIds !== undefined) throw new OperationError('invalid-request')
    if (request.search !== undefined && (!request.search || typeof request.search !== 'object' || Array.isArray(request.search))) throw new OperationError('invalid-request')
    const folderOk = value => typeof value === 'string' && value.length <= 180
    if (request.search) {
      const input = request.search
      if (input.folder !== undefined && !folderOk(input.folder)) throw new OperationError('invalid-request')
      if (input.selected !== undefined && !validIds(input.selected)) throw new OperationError('invalid-request')
      if (input.deselected !== undefined && !validIds(input.deselected)) throw new OperationError('invalid-request')
      if (input.overrides !== undefined && (!input.overrides || typeof input.overrides !== 'object' || Array.isArray(input.overrides))) throw new OperationError('invalid-request')
      if (input.overrides && Object.entries(input.overrides).some(([id, folder]) => typeof id !== 'string' || id.length > 200 || !folderOk(folder))) throw new OperationError('invalid-request')
    }
    const search = request.search ? {
      folder: request.search.folder || '',
      overrides: new Map(Object.entries(request.search.overrides || {})),
      selected: new Set(request.search.selected || []),
      deselected: new Set(request.search.deselected || []),
    } : null
    let rows = request.groupId === undefined ? this.job.records : this.job.records.filter(row => row.groupId === request.groupId)
    if (request.includeIds !== undefined) { const wanted = new Set(request.includeIds); rows = rows.filter(row => wanted.has(row.id)) }
    else if (request.excludeIds !== undefined) { const omitted = new Set(request.excludeIds); rows = rows.filter(row => !omitted.has(row.id)) }
    if (request.status !== undefined) {
      const wantSaved = request.status === 'saved'
      // Save results count previously remembered copies too: rows this run did not submit
      // already show as "已保存" and must not drop out of the saved filter.
      const saved = row => this.job.operation === 'preview' ? Boolean(row.savedBefore) : row.status === 'saved' || row.status === 'existing' || row.status === 'not-selected' && Boolean(row.savedBefore)
      rows = rows.filter(row => saved(row) === wantSaved)
    }
    // Match the folder the client actually shows: per-file edits, the group's default folder for selected files, then the planned folder.
    const folderOf = search ? row => {
      if (search.overrides.has(row.id)) return search.overrides.get(row.id)
      const selected = search.selected.has(row.id) ? true : search.deselected.has(row.id) ? false : row.selected === true
      return selected && search.folder ? search.folder : (row.documentFolder ?? '')
    } : null
    return queryRecords(rows, { keyword: request.keyword ?? '', order: request.order ?? 'asc', folderOf })
  }
  async request(request) {
    await this.ready
    if (this.closed) throw new OperationError('plugin-unloaded')
    if (!request || typeof request !== 'object' || typeof request.action !== 'string') throw new OperationError('invalid-request')
    if (request.action === 'state') return this.snapshot()
    if (request.action === 'records') {
      if (!Number.isSafeInteger(request.offset) || request.offset < 0 || !Number.isSafeInteger(request.limit) || request.limit < 1 || request.limit > 100) throw new OperationError('invalid-request')
      const records = this.filteredRecords(request)
      const extracted = this.extractedCounts()
      return { jobId: this.job.id, records: records.slice(request.offset, request.offset + request.limit).map(row => extracted.has(row.id) ? { ...row, extractedCount: extracted.get(row.id) } : row), recordCount: records.length }
    }
    if (request.action === 'directories') {
      // Only files whose copy is already verified: group the current query by the directory that holds it.
      const savedPath = row => this.savedPathOf(row)
      const limit = 10000, groups = new Map()
      let count = 0, truncated = false
      // The directory view always lists saved files, independent of the unsaved/saved segment.
      const scoped = this.filteredRecords({ ...request, status: undefined })
      const extractedCounts = this.extractedCounts()
      const addFile = (directory, file) => {
        const files = groups.get(directory)
        if (files) files.push(file)
        else groups.set(directory, [file])
      }
      for (const row of scoped) {
        const filePath = savedPath(row)
        if (typeof filePath !== 'string' || !filePath) continue
        if (count >= limit) { truncated = true; break }
        count++
        // Show the archive's actual file name so renames and version suffixes stay honest.
        addFile(path.dirname(filePath), { id: row.id, name: path.basename(filePath), time: row.time, path: filePath, extractedCount: extractedCounts.get(row.id) || 0 })
      }
      // Extracted files have no attachment row of their own; list them from the remembered index.
      if (!truncated) {
        const scopedIds = new Set(scoped.map(row => row.id))
        const messageTime = new Map(scoped.map(row => [row.id, row.time]))
        const tokens = String(request.keyword ?? '').trim().toLowerCase().split(/\s+/).filter(Boolean)
        const groupFiltered = request.includeIds !== undefined || request.excludeIds !== undefined
        for (const [id, entry] of Object.entries(this.savedIndex.entries)) {
          if (entry.kind !== 'extracted') continue
          if (request.groupId !== undefined && entry.groupId !== request.groupId) continue
          if (groupFiltered && !scopedIds.has(entry.sourceId)) continue
          const name = path.basename(entry.path)
          const text = `${name}\n${entry.path}\n${entry.sourceArchive ?? ''}`.toLowerCase()
          if (tokens.length && !tokens.every(token => text.includes(token))) continue
          if (count >= limit) { truncated = true; break }
          count++
          addFile(path.dirname(entry.path), { id, name, time: messageTime.get(entry.sourceId) ?? entry.savedAt, path: entry.path, source: entry.sourceArchive || '', extracted: true })
        }
      }
      const entries = [...groups].map(([directory, files]) => ({ directory, files })).sort((a, b) => a.directory.localeCompare(b.directory))
      const page = (value, fallback) => Number.isSafeInteger(value) && value > 0 ? Math.min(value, 100) : fallback
      const directoryLimit = page(request.directoryLimit, 10)
      const wanted = typeof request.directory === 'string' && request.directory ? entries.findIndex(entry => entry.directory === request.directory) : -1
      // A row-level locate opens the page that actually holds its directory, even when the caller starts at page 1.
      const directoryOffset = wanted >= 0 ? Math.floor(wanted / directoryLimit) * directoryLimit : Number.isSafeInteger(request.directoryOffset) && request.directoryOffset >= 0 ? request.directoryOffset : 0
      const pageEntries = entries.slice(directoryOffset, directoryOffset + directoryLimit)
      // Without an explicit pick the first directory on the page opens, so the inline view is never empty.
      const selected = entries.find(entry => entry.directory === request.directory) || pageEntries[0] || null
      const fileOffset = Number.isSafeInteger(request.fileOffset) && request.fileOffset >= 0 ? request.fileOffset : 0
      const fileLimit = page(request.fileLimit, 10)
      return {
        jobId: this.job.id,
        recordCount: count,
        directoryCount: entries.length,
        directories: pageEntries.map(({ directory, files }) => ({ directory, count: files.length })),
        directoryPage: Math.floor(directoryOffset / directoryLimit) + 1,
        truncated,
        directory: selected?.directory ?? null,
        files: selected ? selected.files.slice(fileOffset, fileOffset + fileLimit) : [],
        fileCount: selected?.files.length ?? 0,
      }
    }
    if (request.action === 'saved-folders') {
      // The row menu offers folders that already hold verified copies for this group,
      // including folders created by earlier previews or save results.
      if (typeof request.groupId !== 'string' || !request.groupId) throw new OperationError('invalid-request')
      const names = new Set()
      let truncated = false
      for (const row of this.filteredRecords({ jobId: request.jobId, groupId: request.groupId })) {
        const filePath = this.savedPathOf(row)
        if (typeof filePath !== 'string' || !filePath) continue
        const name = path.basename(path.dirname(filePath))
        // Skip flat legacy layouts (the day is the last component) and temporary folders.
        if (!name || name === row.day || name.startsWith('.eline-') || directoryNameError(name)) continue
        names.add(name)
        if (names.size >= 500) { truncated = true; break }
      }
      return { jobId: this.job.id, names: [...names].sort((a, b) => a.localeCompare(b)), truncated }
    }
    if (request.action === 'scope') {
      // Select-all operates on the current filter scope; only rows the table lets you toggle can change state.
      // A finished save result keeps its saved rows final, so they stay out of select-all and chip counts.
      const archived = this.job.operation === 'save' ? finalInSaveResult : () => false
      const records = this.filteredRecords(request).filter(row => row.selectable === true && !archived(row))
      const limit = 10000
      return { jobId: this.job.id, total: records.length, truncated: records.length > limit, records: records.slice(0, limit).map(row => ({ id: row.id, groupId: row.groupId, selected: row.selected === true, savedBefore: Boolean(row.savedBefore) })) }
    }
    if (request.action === 'plan') {
      if (this.running || this.rowBusy) throw new OperationError('job-running')
      const previousJob = this.job
      if (!previousJob || request.jobId !== previousJob.id) throw new OperationError('job-changed')
      if (previousJob.reviewVersion !== 1 || !previousJob.reviewReady || !previousJob.sourceSettings || !previousJob.sourceCache) throw new OperationError('review-unavailable')
      const settings = validateSettings(this.settings)
      if (previewSettingsKey(settings) !== previewSettingsKey(previousJob.sourceSettings)) throw new OperationError('preview-stale')
      for (const key of ['groupSelections', 'groupFolders', 'changes']) {
        if (request[key] !== undefined && !Array.isArray(request[key])) throw new OperationError('invalid-review')
      }
      // Plan each source group independently so an invalid folder in one group cannot block
      // reviewing or saving another group.
      const available = new Set(previousJob.records.map(row => row.groupId))
      const groups = []
      for (const group of settings.groups) {
        if (!available.has(group.id)) continue
        const records = previousJob.records.filter(row => row.groupId === group.id)
        const ids = new Set(records.map(row => row.id))
        // A finished save result has no pending selection; a retry starts from the rows re-selected now.
        const reviewBase = previousJob.operation === 'save' ? records.map(row => ({ ...row, selected: false })) : records
        try {
          const planned = applyReview(reviewBase, settings, previousJob.mode, {
            groupSelections: (request.groupSelections || []).filter(item => item.groupId === group.id),
            groupFolders: (request.groupFolders || []).filter(item => item.groupId === group.id),
            changes: (request.changes || []).filter(item => ids.has(item.id)),
          }, { allowEmpty: true })
          const selected = planned.filter(row => row.selected)
          groups.push({ id: group.id, name: group.name, selectedCount: selected.length, autoFolderCount: selected.filter(row => row.folderSource === 'auto').length })
        } catch (error) {
          groups.push({ id: group.id, name: group.name, selectedCount: 0, autoFolderCount: 0, error: error.code || 'invalid-review' })
        }
      }
      return { groups, selectedCount: groups.reduce((sum, group) => sum + group.selectedCount, 0), autoFolderCount: groups.reduce((sum, group) => sum + group.autoFolderCount, 0) }
    }
    if (request.action === 'accounts') {
      if (this.running || this.rowBusy) throw new OperationError('job-running')
      if (request.root !== undefined && (typeof request.root !== 'string' || request.root.length > 2048)) throw new OperationError('invalid-root')
      return this.worker({ action: 'accounts', settings: { root: request.root } })
    }
    if (request.action === 'groups') {
      if (this.running || this.rowBusy) throw new OperationError('job-running')
      const input = request.source
      if (!input || typeof input.root !== 'string' || typeof input.account !== 'string') throw new OperationError('invalid-account')
      return this.worker({ action: 'groups', settings: input, name: request.name })
    }
    if (request.action === 'cancel') {
      if (this.extractAbort) this.extractAbort.abort()
      // During auto-extraction the worker has finished and the status is already final; only abort the extraction, don't reopen the job as cancelling.
      if (this.running && this.job && ['running', 'cancelling'].includes(this.job.status)) { this.job.status = 'cancelling'; Atomics.store(this.running.cancel, 0, 1); for (const state of this.active.values()) state.abort.abort() }
      return this.snapshot()
    }
    const mutation = async () => {
      if (this.running || this.rowBusy) throw new OperationError('job-running')
      if (request.action === 'save-row') {
        if (!this.job || request.jobId !== this.job.id) throw new OperationError('job-changed')
        const job = this.job
        if (job.reviewVersion !== 1 || !job.reviewReady || !job.sourceSettings || !job.sourceCache) throw new OperationError('review-unavailable')
        if (typeof request.recordId !== 'string' || !request.recordId) throw new OperationError('invalid-request')
        const index = job.records.findIndex(row => row.id === request.recordId)
        if (index < 0) throw new OperationError('invalid-review')
        const row = job.records[index]
        const alreadySaved = job.operation === 'preview' ? Boolean(row.savedBefore) : row.status === 'saved' || row.status === 'existing' || Boolean(row.savedBefore)
        if (alreadySaved) throw new OperationError('already-saved')
        if (row.selectable !== true) throw new OperationError('selection-unavailable')
        if (directoryNameError(request.groupName)) throw new OperationError('invalid-folder-name')
        const settings = validateSettings(this.settings)
        if (previewSettingsKey(settings) !== previewSettingsKey(job.sourceSettings)) throw new OperationError('preview-stale')
        requireDistinctFolders(settings)
        await checkDestination(settings, this.config.stateDirectory)
        const groupName = request.groupName.normalize('NFC')
        const reviewed = applyReview([row], settings, job.mode, { changes: [{ id: row.id, selected: true, documentFolder: groupName }] })[0]
        this.rowBusy = true
        try {
          let outcome
          await this.worker({ action: 'save', mode: job.mode, settings: structuredClone(settings), records: [reviewed], sourceCache: job.sourceCache }, message => {
            if (message.type === 'record') outcome = message.record
          })
          if (!outcome) throw new OperationError('worker-no-result')
          const saved = (outcome.status === 'saved' || outcome.status === 'existing') && typeof outcome.path === 'string' && path.isAbsolute(outcome.path)
          if (!saved) {
            this.adjustCount(row.status, outcome.status)
            job.records[index] = { ...row, status: outcome.status, error: outcome.error || outcome.status }
            try { await this.persistJob() } catch { /* The save itself already failed; keep the in-memory result. */ }
            return { status: outcome.status, path: null, snapshot: this.snapshot() }
          }
          this.adjustCount(row.status, outcome.status)
          const savedAt = Date.now()
          const updated = {
            ...row,
            selected: false,
            status: outcome.status,
            path: outcome.path,
            savedBefore: { path: outcome.path, savedAt },
            documentFolder: reviewed.documentFolder,
            folderSource: reviewed.folderSource,
            plannedName: reviewed.plannedName,
            plannedPath: reviewed.plannedPath,
            skipReason: undefined,
            error: undefined,
            ...(outcome.sha256 ? { sha256: outcome.sha256 } : {}),
          }
          job.records[index] = updated
          if (this.mergeSaved([updated], savedAt)) {
            this.pruneSaved()
            try { await this.persistSavedIndex() } catch { /* The archive copy is already verified. */ }
          }
          try { await this.persistJob() } catch { /* The archive copy is already verified. */ }
          let autoSummary = null
          if (settings.autoExtract && isArchiveName(updated.name)) {
            this.extractAbort = new AbortController()
            const cancel = () => this.closed || this.extractAbort?.signal.aborted === true
            const summary = extractSummary()
            try { await this.extractArchive(await this.archiveFile(row.id), { cancel, nested: settings.extractNested === true, summary }); autoSummary = summary }
            catch { /* Auto-extraction never changes the save outcome. */ }
            finally { this.extractAbort = null; this.pruneSaved(); try { await this.persistSavedIndex() } catch { /* The extracted copies are already verified. */ } }
          }
          return { status: outcome.status, path: outcome.path, snapshot: this.snapshot(), ...(autoSummary ? { extractSummary: autoSummary } : {}) }
        } finally { this.rowBusy = false }
      }
      if (request.action === 'zip-extract') {
        if (!this.job || request.jobId !== this.job.id) throw new OperationError('job-changed')
        const target = await this.archiveFile(request.recordId)
        if (!isArchiveName(target.name)) throw new OperationError('not-archive')
        this.rowBusy = true
        this.extractAbort = new AbortController()
        const cancel = () => this.closed || this.extractAbort?.signal.aborted === true
        const summary = extractSummary()
        try {
          await this.extractArchive(target, { cancel, nested: this.settings?.extractNested === true, summary })
          return { jobId: this.job.id, id: target.id, summary, snapshot: this.snapshot() }
        } finally {
          this.pruneSaved()
          try { await this.persistSavedIndex() } catch { /* The extracted copies are already verified. */ }
          this.rowBusy = false
          this.extractAbort = null
        }
      }
      if (request.action === 'file-delete') {
        if (!this.job || request.jobId !== this.job.id) throw new OperationError('job-changed')
        const job = this.job
        if (typeof request.recordId === 'string' && request.recordId.startsWith('extracted:')) {
          const { filePath } = await this.archiveFile(request.recordId)
          try { await fs.unlink(filePath) } catch (error) { throw fileSystemError(error) }
          delete this.savedIndex.entries[request.recordId]
          try { await this.persistSavedIndex() } catch { /* Advisory state; the extracted copy is already gone. */ }
          return { removed: true, snapshot: this.snapshot() }
        }
        const { index, row, filePath } = await this.archiveEntry(request.recordId)
        try { await fs.unlink(filePath) } catch (error) { throw fileSystemError(error) }
        if (this.savedIndex.entries[row.id]) {
          delete this.savedIndex.entries[row.id]
          try { await this.persistSavedIndex() } catch { /* Advisory state; the archive file is already gone. */ }
        }
        // Revert the row to an ordinary unsaved file; the WeCom original is untouched.
        this.adjustCount(row.status, job.operation === 'preview' ? null : 'not-selected')
        const reverted = job.operation === 'preview'
          ? { ...row, selected: false, status: row.selectable === true ? (row.match?.matched || job.mode === 'all' ? 'ready' : 'skipped') : row.issue === 'format' ? 'skipped' : 'not-selected' }
          : { ...row, selected: false, status: 'not-selected', skipReason: 'manual' }
        delete reverted.savedBefore; delete reverted.path; delete reverted.sha256; delete reverted.error
        job.records[index] = reverted
        try { await this.persistJob() } catch { /* The archive file is already gone; keep the in-memory result. */ }
        return { removed: true, snapshot: this.snapshot() }
      }
      if (request.action === 'file-rename') {
        if (!this.job || request.jobId !== this.job.id) throw new OperationError('job-changed')
        if (fileNameError(request.name)) throw new OperationError('invalid-file-name')
        const newName = request.name.normalize('NFC')
        const job = this.job
        if (typeof request.recordId === 'string' && request.recordId.startsWith('extracted:')) {
          const { filePath } = await this.archiveFile(request.recordId)
          const target = await this.renameArchiveFile(filePath, newName)
          const extractedEntry = this.savedIndex.entries[request.recordId]
          if (extractedEntry) {
            extractedEntry.path = target
            try { await this.persistSavedIndex() } catch { /* Advisory state; the file itself is already renamed. */ }
          }
          return { name: newName, path: target, snapshot: this.snapshot() }
        }
        const { index, row, filePath } = await this.archiveEntry(request.recordId)
        const target = await this.renameArchiveFile(filePath, newName)
        const entry = this.savedIndex.entries[row.id]
        if (entry) {
          entry.path = target
          try { await this.persistSavedIndex() } catch { /* Advisory state; the file itself is already renamed. */ }
        }
        const updated = { ...row, plannedName: newName }
        if (updated.savedBefore) updated.savedBefore = { ...updated.savedBefore, path: target }
        if (typeof updated.path === 'string') updated.path = target
        if (typeof updated.plannedPath === 'string') updated.plannedPath = target
        job.records[index] = updated
        try { await this.persistJob() } catch { /* The file itself is already renamed. */ }
        return { name: newName, path: target, snapshot: this.snapshot() }
      }
      if (request.action === 'save') {
        if (this.running) throw new OperationError('job-running')
        const settings = validateSettings(request.settings)
        requireDistinctFolders(settings)
        await checkDestination(settings, this.config.stateDirectory)
        // Commit the settings and result dismissal together. An old last-run file cannot
        // reappear after restart, even if its cached metadata is still present on disk.
        // Remembered locations only mean something below the root that produced them, so
        // moving the archive root invalidates every entry.
        const directoryKey = value => { const resolved = path.resolve(value); return process.platform === 'win32' ? resolved.toLowerCase() : resolved }
        const rootChanged = !this.settings || directoryKey(this.settings.saveDirectory) !== directoryKey(settings.saveDirectory)
        const clearedResultId = this.job?.id || this.clearedResultId
        try { await writeJson(path.join(this.config.stateDirectory, 'settings.json'), { ...settings, ...(clearedResultId ? { clearedResultId } : {}) }) }
        catch { throw new OperationError('state-write-failed') }
        this.settings = settings
        if (rootChanged && Object.keys(this.savedIndex.entries).length) {
          this.savedIndex = { version: 1, entries: {} }
          try { await this.persistSavedIndex() } catch { /* Advisory state. */ }
        }
        this.clearedResultId = clearedResultId
        this.job = null
        return this.snapshot()
      }
      if (request.action === 'start' || request.action === 'confirm') {
        if (this.running) throw new OperationError('job-running')
        if (!this.settings?.groups.length) throw new OperationError('configure-first')
        const settings = validateSettings(this.settings)
        requireDistinctFolders(settings)
        const confirming = request.action === 'confirm'
        if (!confirming) { try { await this.pruneSavedExpired(settings.savedIndexDays) } catch { /* Advisory state. */ } }
        const previousJob = this.job
        let groupIds = null
        if (confirming) {
          if (!previousJob || request.jobId !== previousJob.id) throw new OperationError('job-changed')
          if (previousJob.reviewVersion !== 1 || !previousJob.reviewReady || !previousJob.sourceSettings || !previousJob.sourceCache) throw new OperationError('review-unavailable')
          if (previewSettingsKey(settings) !== previewSettingsKey(previousJob.sourceSettings)) throw new OperationError('preview-stale')
          const rawGroupIds = request.groupIds ?? (request.groupId !== undefined ? [request.groupId] : null)
          if (rawGroupIds !== null) {
            const known = new Set(previousJob.records.map(row => row.groupId))
            if (request.groupIds !== undefined && request.groupId !== undefined) throw new OperationError('invalid-review')
            if (!Array.isArray(rawGroupIds) || !rawGroupIds.length || rawGroupIds.length > 100 || new Set(rawGroupIds).size !== rawGroupIds.length) throw new OperationError('invalid-review')
            if (rawGroupIds.some(id => typeof id !== 'string' || !id || id.length > 200 || !known.has(id))) throw new OperationError('invalid-review')
            groupIds = rawGroupIds
          }
          if (request.allowAutoFolders !== undefined && typeof request.allowAutoFolders !== 'boolean') throw new OperationError('invalid-review')
          for (const key of ['groupSelections', 'groupFolders', 'changes']) {
            if (request[key] !== undefined && !Array.isArray(request[key])) throw new OperationError('invalid-review')
          }
          await checkDestination(settings, this.config.stateDirectory)
        }
        const mode = confirming ? previousJob.mode : request.mode ?? 'bill'
        if (!['all', 'bill'].includes(mode)) throw new OperationError('invalid-save-mode')
        // A scoped save reads and validates only the selected source groups, so another
        // group's folder edit or selection cannot block or change this save.
        const scope = groupIds ? new Set(groupIds) : null
        const baseRecords = confirming ? (scope ? previousJob.records.filter(row => scope.has(row.groupId)) : previousJob.records) : []
        const scopedIds = new Set(baseRecords.map(row => row.id))
        const scopedList = (value, keep) => value === undefined || !scope ? value : Array.isArray(value) ? value.filter(keep) : value
        // A finished save result shows no pending selection; a retry must submit only what is re-selected now.
        // Rows already verified by that save keep their marker so they stay "已保存" instead of turning into "未选择".
        const reviewBase = confirming ? (previousJob.operation === 'save' ? baseRecords.map(row => ({
          ...row,
          selected: false,
          ...(!row.savedBefore && (row.status === 'saved' || row.status === 'existing') && typeof row.path === 'string' ? { savedBefore: { path: row.path, savedAt: previousJob.finishedAt || previousJob.confirmedAt || Date.now() } } : {}),
        })) : baseRecords) : []
        // Plan each scoped group separately so one group's folder edit cannot block another's save.
        const scopedSelections = scopedList(request.groupSelections, item => !scope || scope.has(item?.groupId)) || []
        const scopedFolders = scopedList(request.groupFolders, item => !scope || scope.has(item?.groupId)) || []
        const scopedChanges = scopedList(request.changes, item => scopedIds.has(item?.id)) || []
        const reviewed = confirming ? settings.groups.flatMap(group => {
          const rows = reviewBase.filter(row => row.groupId === group.id)
          if (!rows.length) return []
          const ids = new Set(rows.map(row => row.id))
          return applyReview(rows, settings, mode, {
            groupSelections: scopedSelections.filter(item => item.groupId === group.id),
            groupFolders: scopedFolders.filter(item => item.groupId === group.id),
            changes: scopedChanges.filter(item => ids.has(item.id)),
          }, { allowEmpty: true })
        }) : []
        if (confirming && !reviewed.some(row => row.selected)) throw new OperationError('selection-required')
        const autoFolderCount = reviewed.filter(row => row.selected && row.folderSource === 'auto').length
        if (autoFolderCount && request.allowAutoFolders !== true) throw new OperationError('auto-folder-unconfirmed')
        // A scoped save ends only its own groups. Keep the other source groups listed so their
        // cards and files stay visible; their rows simply read as not selected by this save.
        const retained = confirming && scope ? previousJob.records.filter(row => !scope.has(row.groupId)).map(row => ({
          ...row,
          selected: false,
          status: row.issue === 'format' ? 'skipped' : 'not-selected',
          skipReason: row.issue === 'format' ? 'format' : 'manual',
          ...(!row.savedBefore && (row.status === 'saved' || row.status === 'existing') && typeof row.path === 'string' ? { savedBefore: { path: row.path, savedAt: previousJob.finishedAt || previousJob.confirmedAt || Date.now() } } : {}),
        })) : []
        const cutoff = confirming ? previousJob.cutoff : Date.now()
        const start = confirming ? previousJob.start : request.start, end = confirming ? previousJob.end : request.end
        dateWindow(start, end, cutoff)
        this.job = { id: randomUUID(), status: 'running', phase: confirming ? 'indexing' : 'reading', operation: confirming ? 'save' : 'preview', mode, filterVersion: FILTER_VERSION, archiveLayoutVersion: ARCHIVE_LAYOUT_VERSION, reviewVersion: 1, reviewReady: confirming, sourceSettings: structuredClone(settings), sourceCache: confirming ? previousJob.sourceCache : null, matchedCount: reviewed.filter(row => row.match?.matched).length, start, end, cutoff, done: 0, total: confirming ? reviewed.length : null, records: [...reviewed.map(row => ({ ...row, status: row.selected ? 'queued' : 'not-selected' })), ...retained], warnings: confirming ? [...previousJob.warnings] : [], counts: {}, ...(confirming ? { previewId: previousJob.previewId || previousJob.id, confirmedAt: Date.now() } : {}) }
        try { await this.persistJob() } catch { this.job = previousJob; throw new OperationError('state-write-failed') }
        const token = { cancel: new Int32Array(new SharedArrayBuffer(4)), promise: null }
        this.running = token
        const indexes = new Map(this.job.records.map((row, index) => [row.id, index]))
        token.promise = this.worker({ action: confirming ? 'save' : 'preview', mode, settings: structuredClone(settings), records: reviewed, sourceCache: this.job.sourceCache, range: { start, end, cutoff }, ...(confirming ? {} : { savedIndex: this.savedIndex.entries, savedIndexDays: settings.savedIndexDays }) }, message => {
          if (message.type === 'progress') { this.job.phase = message.phase; if (message.total !== undefined) this.job.total = message.total; if (message.warnings) this.job.warnings = message.warnings; if (message.migratedGroups !== undefined) this.job.migratedGroups = message.migratedGroups }
          if (message.type === 'record') {
            if (confirming) this.job.records[indexes.get(message.record.id)] = message.record
            else { this.job.records.push(message.record); if (message.record.match?.matched) this.job.matchedCount++ }
            this.job.done = message.done; this.job.total = message.total; this.job.counts[message.record.status] = (this.job.counts[message.record.status] ?? 0) + 1
          }
        }, token.cancel.buffer).then(async value => {
          if (!confirming) {
            this.job.sourceCache = value.cache; this.job.reviewReady = true; this.job.status = 'awaiting-confirmation'; this.job.phase = 'review'
            try { await this.rememberDiscovered(value.savedDiscoveries) } catch { /* Keep the preview even if the advisory index cannot be written. */ }
          } else {
            this.job.status = Object.keys(this.job.counts).some(key => !['saved', 'existing', 'skipped', 'not-selected'].includes(key)) || this.job.warnings.length ? 'incomplete' : 'completed'
            // Keep the client polling through auto-extraction: the flag flips in the same tick as the status.
            if (settings.autoExtract && (this.job.status === 'completed' || this.job.status === 'incomplete')) this.job.extracting = true
          }
        }, error => { this.job.status = error.code === 'cancelled' ? 'cancelled' : 'failed'; this.job.error = error.code || 'worker-failed' }).finally(async () => {
          this.job.finishedAt = Date.now()
          if (confirming) { try { await this.rememberSaved() } catch { /* Keep the result even if the advisory index cannot be written. */ } }
          if (this.job.extracting === true) {
            this.extractAbort = new AbortController()
            const cancel = () => this.closed || this.extractAbort?.signal.aborted === true
            try { this.job.extractSummary = await this.autoExtractSaved(settings, cancel) }
            catch { /* Auto-extraction never changes the save outcome. */ }
            finally { this.job.extracting = false; this.extractAbort = null; this.pruneSaved(); try { await this.persistSavedIndex() } catch { /* The extracted copies are already verified. */ } }
          }
          try { await this.persistJob() } finally { this.running = null }
        })
        token.promise.catch(() => { this.job.status = 'failed'; this.job.error = 'state-write-failed' })
        return this.snapshot()
      }
      throw new OperationError('unknown-action')
    }
    const pending = this.mutations.then(mutation)
    this.mutations = pending.catch(() => {}) // Preserve serialization after a rejected input.
    return pending
  }
  worker(data, progress = () => {}, cancelBuffer = new SharedArrayBuffer(4)) {
    const worker = new Worker(new URL('./reader-worker.mjs', import.meta.url), { workerData: { ...data, stateDirectory: this.config.stateDirectory, cancelBuffer } })
    const state = { abort: new AbortController(), helpers: new Set() }
    this.active.set(worker, state)
    return new Promise((resolve, reject) => {
      let result, failure, hasResult = false, exited = false
      const deadline = setTimeout(() => { failure = new OperationError('source-timeout'); state.abort.abort(); void worker.terminate() }, this.config.jobTimeoutMs)
      worker.on('message', message => {
        if (message.type === 'result') { hasResult = true; result = message.value }
        else if (message.type === 'error') failure = new OperationError(message.code)
        else if (message.type === 'native-source') {
          const operation = Promise.resolve().then(() => {
            if (state.abort.signal.aborted) throw new OperationError('cancelled')
            if (!this.config.nativeReader) throw new OperationError('reader-missing')
            return this.config.nativeReader(message.request, state.abort.signal)
          }).then(value => { if (!exited) worker.postMessage({ type: 'native-response', id: message.id, ok: true, value }) }, error => { if (!exited) worker.postMessage({ type: 'native-response', id: message.id, ok: false, code: error.code || 'reader-failed' }) })
          state.helpers.add(operation)
          operation.finally(() => state.helpers.delete(operation)).catch(() => {}) // Exit owns any outstanding helper cleanup.
        } else {
          try { progress(message) } catch (error) { failure = error; state.abort.abort(); void worker.terminate() }
        }
      })
      worker.on('error', error => { failure = error })
      worker.on('exit', code => {
        exited = true; clearTimeout(deadline); state.abort.abort()
        void Promise.allSettled([...state.helpers]).then(() => {
          this.active.delete(worker)
          if (failure) reject(failure)
          else if (!hasResult) reject(new OperationError(Atomics.load(new Int32Array(cancelBuffer), 0) ? 'cancelled' : code === 0 ? 'worker-no-result' : 'worker-failed'))
          else resolve(result)
        })
      })
    })
  }
  async dispose() {
    this.closed = true
    await this.ready.catch(() => {})
    if (this.running) Atomics.store(this.running.cancel, 0, 1)
    for (const state of this.active.values()) state.abort.abort()
    await Promise.allSettled([...this.active.keys()].map(worker => worker.terminate()))
    await Promise.allSettled([...this.active.values()].flatMap(state => [...state.helpers]))
    await this.running?.promise
    await this.mutations
  }
}
