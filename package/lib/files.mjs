/** Filesystem operations shared by the source reader and archive worker. */
import { createHash, randomUUID } from 'node:crypto'
import { createReadStream } from 'node:fs'
import * as fs from 'node:fs/promises'
import path from 'node:path'
import { directoryNameError } from './directory-rules.mjs'

export class OperationError extends Error {
  constructor(code, message = code) { super(message); this.code = code }
}
export const ARCHIVE_LAYOUT_VERSION = 2

/** Stable Windows-compatible path component, including reserved device names. */
export function safeName(value, length = 100) {
  let name = String(value).normalize('NFC').replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').replace(/[. ]+$/g, '').slice(0, length).replace(/[. ]+$/g, '')
  if (!name || name === '.' || name === '..') name = '_'
  if (/^(con|prn|aux|nul|com[1-9¹²³]|lpt[1-9¹²³])(?:\.|$)/i.test(name)) name = `_${name}`
  return name
}

export function shortId(value) { return createHash('sha256').update(String(value)).digest('hex').slice(0, 10) }
export function inside(parent, target) {
  const relative = path.relative(parent, target)
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))
}
export function checkCancel(cancel) { if (cancel?.()) throw new OperationError('cancelled') }
export async function exists(filename) { try { await fs.lstat(filename); return true } catch (error) { if (error.code === 'ENOENT') return false; throw error } }

/** Reject link-shaped children so archive subdirectories cannot redirect writes. */
export async function childDirectory(base, parts) {
  let current = base
  for (const part of parts) {
    if (part !== safeName(part, 180)) throw new OperationError('invalid-path-component')
    current = path.join(current, part)
    try { await fs.mkdir(current) } catch (error) { if (error.code !== 'EEXIST') throw error }
    const entry = await fs.lstat(current)
    if (!entry.isDirectory() || entry.isSymbolicLink() || !inside(base, await fs.realpath(current))) throw new OperationError('unsafe-output-path')
  }
  return current
}

/** Rename only the selected group's old archive directory, within the chosen base. */
export async function prepareGroupDirectories(base, settings, cancel) {
  const moves = []
  for (const group of settings.groups) {
    checkCancel(cancel)
    const legacy = path.resolve(base, `${safeName(group.name, 70)}--${shortId(`${settings.account}:${group.id}`)}`)
    const destination = path.resolve(base, group.folder)
    if (!inside(base, legacy) || !inside(base, destination) || destination === base) throw new OperationError('unsafe-output-path')
    if (!await exists(legacy)) continue
    const info = await fs.lstat(legacy)
    if (!info.isDirectory() || info.isSymbolicLink() || !inside(base, await fs.realpath(legacy))) throw new OperationError('unsafe-output-path')
    if (await exists(destination)) throw new OperationError('legacy-folder-conflict')
    moves.push({ legacy, destination })
  }
  for (const { legacy, destination } of moves) {
    checkCancel(cancel)
    // Targets were checked as siblings below the user's resolved archive root.
    if (await exists(destination)) throw new OperationError('legacy-folder-conflict')
    try { await fs.rename(legacy, destination) }
    catch (error) { throw new OperationError(error.code === 'EEXIST' || error.code === 'ENOTEMPTY' ? 'legacy-folder-conflict' : 'legacy-rename-failed') }
  }
  return moves.length
}

export async function hashFile(filename, cancel) {
  const md5 = createHash('md5'), sha256 = createHash('sha256')
  let size = 0
  for await (const chunk of createReadStream(filename)) {
    checkCancel(cancel); md5.update(chunk); sha256.update(chunk); size += chunk.length
  }
  return { size, md5: md5.digest('hex'), sha256: sha256.digest('hex') }
}

/** Build only a metadata index; file contents are read for selected attachment fingerprints. */
export async function cacheIndex(root, cancel) {
  const index = new Map()
  if (!await exists(root)) return index
  const realRoot = await fs.realpath(root)
  async function walk(folder) {
    for (const entry of await fs.readdir(folder, { withFileTypes: true })) {
      checkCancel(cancel)
      const filename = path.join(folder, entry.name)
      if (entry.isSymbolicLink()) continue
      if (entry.isDirectory()) await walk(filename)
      else if (entry.isFile()) {
        const info = await fs.lstat(filename)
        if (!inside(realRoot, await fs.realpath(filename))) continue
        const list = index.get(info.size) ?? []
        list.push({ path: filename, name: entry.name, stamp: `${info.size}:${info.mtimeMs}` })
        index.set(info.size, list)
      }
    }
  }
  await walk(root)
  return index
}

/** Merge metadata indexes across several cache roots (File, Image, Video). */
export async function cacheIndexes(roots, cancel) {
  const index = new Map()
  for (const root of roots) {
    checkCancel(cancel)
    for (const [size, candidates] of await cacheIndex(root, cancel)) {
      const list = index.get(size) ?? []
      list.push(...candidates)
      index.set(size, list)
    }
  }
  return index
}

/** Keep ordinary names intact, shortening long names with a stable suffix. */
export function compactName(value, maximum) {
  if (value.length <= maximum) return value
  if (maximum < 12) return null
  const prefix = value.slice(0, maximum - 11).replace(/[\uD800-\uDBFF]$/, '')
  return `${prefix}~${shortId(value)}`
}

/** Reserve room for file versions and temporary publication within MAX_PATH. */
export function attachmentLayout(base, record) {
  const dayFolder = path.join(base, record.folder, record.day)
  const original = safeName(record.name, 32767), extension = path.extname(original)
  const stem = original.slice(0, original.length - extension.length) || '_'
  const available = 259 - dayFolder.length - 2 // Two additional separators.
  const folderMaximum = Math.min(180, Math.floor((available - 20) / 2), available - 48)
  if (record.documentFolder !== undefined && directoryNameError(record.documentFolder)) throw new OperationError('invalid-folder-name')
  const documentFolder = record.documentFolder === undefined ? compactName(safeName(stem, 32767), folderMaximum) : record.documentFolder.normalize('NFC')
  if (!documentFolder) return null
  if (documentFolder.length + 48 > available) return null
  const fileMaximum = Math.min(200, available - documentFolder.length - 20)
  const fileStem = compactName(stem, fileMaximum - extension.length)
  if (!fileStem) return null
  return { documentFolder, filename: `${fileStem}${extension}` }
}

export function versionNames(clean, expected) {
  const extension = path.extname(clean), stem = clean.slice(0, clean.length - extension.length)
  return { stem, extension, names: [clean, `${stem}~${expected.slice(0, 10)}${extension}`] }
}

/** Include rare UUID-suffixed versions created after both preferred names collided. */
export async function archivedNames(folder, clean, expected) {
  const { stem, extension, names } = versionNames(clean, expected), prefix = `${stem}~${expected.slice(0, 10)}-`
  for (const entry of await fs.readdir(folder)) {
    if (!entry.startsWith(prefix) || !entry.endsWith(extension)) continue
    const suffix = entry.slice(prefix.length, entry.length - extension.length || undefined)
    if (/^[a-f0-9]{8}$/.test(suffix)) names.push(entry)
  }
  return names
}

export async function verifiedArchive(filename, record, expected, cancel) {
  checkCancel(cancel)
  try {
    const before = await fs.lstat(filename)
    if (!before.isFile() || before.isSymbolicLink() || before.size !== record.size) return null
    const digest = await hashFile(filename, cancel), after = await fs.lstat(filename)
    return before.ino === after.ino && before.dev === after.dev && before.size === after.size && before.mtimeMs === after.mtimeMs && digest.size === record.size && digest.md5 === expected ? digest : null
  } catch (error) { if (error.code === 'ENOENT') return null; throw error }
}

/** Save a verified file atomically, adopting matching flat-layout archive copies. */
export async function saveAttachment(record, base, index, fingerprints, cancel) {
  checkCancel(cancel)
  const expected = String(record.md5 ?? '').toLowerCase()
  if (!/^[a-f0-9]{32}$/.test(expected)) return { status: 'unverifiable' }
  const layout = attachmentLayout(base, record)
  if (!layout) return { status: 'path-too-long' }
  const dayFolder = await childDirectory(base, [record.folder, record.day])
  const oldNames = await archivedNames(dayFolder, safeName(record.name), expected)
  const stage = path.join(dayFolder, `.eline-old-${expected}`)
  const folderPath = path.join(dayFolder, layout.documentFolder)
  // An old extensionless file can occupy the exact name needed for its new folder.
  if (await exists(folderPath)) {
    const info = await fs.lstat(folderPath)
    if (info.isSymbolicLink()) throw new OperationError('unsafe-output-path')
    if (!info.isDirectory()) {
      if (!oldNames.includes(layout.documentFolder) || !await verifiedArchive(folderPath, record, expected, cancel)) return { status: 'folder-conflict' }
      if (await exists(stage) && !await verifiedArchive(stage, record, expected, cancel)) return { status: 'folder-conflict' }
      try { await fs.link(folderPath, stage) } catch (error) { if (error.code !== 'EEXIST') throw error }
      if (!await verifiedArchive(stage, record, expected, cancel) || !await verifiedArchive(folderPath, record, expected, cancel)) return { status: 'changing' }
      checkCancel(cancel); await fs.unlink(folderPath)
    }
  }
  const folder = await childDirectory(base, [record.folder, record.day, layout.documentFolder])
  const clean = layout.filename, { stem, extension, names: preferred } = versionNames(clean, expected)
  const legacyPaths = [...oldNames.map(name => path.join(dayFolder, name)), stage].filter(filename => filename !== folderPath)
  const removeLegacy = async () => {
    let migrated = false
    for (const filename of legacyPaths) {
      if (!await verifiedArchive(filename, record, expected, cancel)) continue
      checkCancel(cancel); await fs.unlink(filename); migrated = true
    }
    return migrated
  }
  const candidates = await archivedNames(folder, clean, expected)
  let destination
  for (const name of candidates) {
    const target = path.join(folder, name)
    if (!await exists(target)) { if (preferred.includes(name)) destination ??= target; continue }
    const digest = await verifiedArchive(target, record, expected, cancel)
    if (digest) return { status: 'existing', path: target, sha256: digest.sha256, migrated: await removeLegacy() }
  }
  destination ??= path.join(folder, `${stem}~${expected.slice(0, 10)}-${randomUUID().slice(0, 8)}${extension}`)
  for (const legacy of legacyPaths) {
    if (!await verifiedArchive(legacy, record, expected, cancel)) continue
    checkCancel(cancel)
    try { await fs.link(legacy, destination) }
    catch (error) { if (error.code === 'EEXIST') return saveAttachment(record, base, index, fingerprints, cancel); throw new OperationError('archive-migration-failed') }
    const digest = await verifiedArchive(destination, record, expected, cancel)
    if (!digest) return { status: 'changing' }
    return { status: 'existing', path: destination, sha256: digest.sha256, migrated: await removeLegacy() }
  }
  const possible = [...(index.get(record.size) ?? [])].sort((a, b) => Number(b.name === record.name) - Number(a.name === record.name))
  let source
  for (const candidate of possible) {
    checkCancel(cancel)
    try {
      const info = await fs.lstat(candidate.path)
      if (info.isSymbolicLink() || !info.isFile() || info.size !== record.size) continue
      const stamp = `${info.size}:${info.mtimeMs}`
      const cacheKey = `${candidate.path}\0${stamp}`
      let digest = fingerprints.get(cacheKey)
      if (!digest) { digest = await hashFile(candidate.path, cancel); fingerprints.set(cacheKey, digest) }
      if (digest.md5 === expected) { source = candidate.path; break }
    } catch (error) { if (error.code === 'cancelled') throw error; if (error.code !== 'ENOENT') throw error }
  }
  if (!source) return { status: 'missing' }
  const temporary = path.join(folder, `.eline-part-${randomUUID()}`)
  try {
    const before = await fs.stat(source)
    const output = await fs.open(temporary, 'wx', 0o600)
    const md5 = createHash('md5'), sha256 = createHash('sha256')
    let size = 0
    try {
      for await (const chunk of createReadStream(source)) {
        checkCancel(cancel)
        await output.writeFile(chunk); md5.update(chunk); sha256.update(chunk); size += chunk.length
      }
      await output.sync()
    } finally { await output.close() }
    const after = await fs.stat(source)
    if (before.size !== after.size || before.mtimeMs !== after.mtimeMs || size !== record.size || md5.digest('hex') !== expected) return { status: 'changing' }
    checkCancel(cancel)
    // A hard link provides an exclusive publish without Windows rename-overwrite semantics.
    try { await fs.link(temporary, destination) } catch (error) {
      if (error.code === 'EEXIST') return saveAttachment(record, base, index, fingerprints, cancel)
      throw new OperationError('atomic-publish-failed', error.message)
    }
    return { status: 'saved', path: destination, sha256: sha256.digest('hex') }
  } finally { await fs.unlink(temporary).catch(error => { if (error.code !== 'ENOENT') throw error }) }
}
