/** Single-level ZIP inspection and extraction; a nested archive stays an ordinary file. */
import { createHash, randomUUID } from 'node:crypto'
import * as fs from 'node:fs/promises'
import path from 'node:path'
import { crc32, createInflateRaw } from 'node:zlib'
import { OperationError, checkCancel, safeName, compactName, exists, versionNames, archivedNames, verifiedArchive } from './files.mjs'

export const ZIP_ENTRY_LIMIT = 5000
export const ZIP_ENTRY_SIZE_LIMIT = 2 * 1024 * 1024 * 1024
export const ZIP_TOTAL_SIZE_LIMIT = 8 * 1024 * 1024 * 1024
const CENTRAL_DIRECTORY_LIMIT = 32 * 1024 * 1024

export function isZipName(name) {
  if (typeof name !== 'string') return false
  const dot = name.lastIndexOf('.')
  return dot >= 0 && name.slice(dot + 1).toLowerCase() === 'zip'
}

/** Package paths are untrusted: drop traversal and keep only Windows-safe components. */
export function zipEntryParts(raw) {
  const parts = []
  for (const part of String(raw).replace(/\\/g, '/').split('/')) {
    if (!part || part === '.' || part === '..') continue
    parts.push(safeName(part, 180))
  }
  return parts
}

/** WeCom packages are often built on Chinese Windows without the UTF-8 flag. */
function decodeName(raw, utf8) {
  if (utf8) return raw.toString('utf8')
  try { return new TextDecoder('utf-8', { fatal: true }).decode(raw) } catch { /* fall through to the legacy code page */ }
  try { return new TextDecoder('gbk').decode(raw) } catch { return raw.toString('utf8') }
}

async function readAt(handle, position, length) {
  const buffer = Buffer.alloc(length)
  let done = 0
  while (done < length) {
    const result = await handle.read(buffer, done, length - done, position + done)
    if (!result.bytesRead) break
    done += result.bytesRead
  }
  return done === length ? buffer : buffer.subarray(0, done)
}

function zip64Values(extra, wanted) {
  for (let position = 0; position + 4 <= extra.length;) {
    const id = extra.readUInt16LE(position), length = extra.readUInt16LE(position + 2)
    if (position + 4 + length > extra.length) break
    if (id === 1) {
      const data = extra.subarray(position + 4, position + 4 + length), values = []
      let at = 0
      for (const need of wanted) {
        if (!need) { values.push(null); continue }
        if (at + 8 > data.length) throw new OperationError('zip-invalid')
        values.push(Number(data.readBigUInt64LE(at))); at += 8
      }
      return values
    }
    position += 4 + length
  }
  throw new OperationError('zip-invalid')
}

async function centralDirectory(handle, size, cancel) {
  const tailLength = Math.min(size, 65557)
  const tail = await readAt(handle, size - tailLength, tailLength)
  let end = -1
  for (let position = tail.length - 22; position >= 0; position--) {
    if (tail.readUInt32LE(position) !== 0x06054b50) continue
    if (position + 22 + tail.readUInt16LE(position + 20) === tail.length) { end = position; break }
  }
  if (end < 0) throw new OperationError('zip-invalid')
  checkCancel(cancel)
  let count = tail.readUInt16LE(end + 10), directorySize = tail.readUInt32LE(end + 12), directoryOffset = tail.readUInt32LE(end + 16)
  let disk = tail.readUInt16LE(end + 4), directoryDisk = tail.readUInt16LE(end + 6), entriesOnDisk = tail.readUInt16LE(end + 8)
  if (count === 0xffff || directorySize === 0xffffffff || directoryOffset === 0xffffffff) {
    const locatorPosition = size - tailLength + end - 20
    if (locatorPosition < 0) throw new OperationError('zip-invalid')
    const locator = await readAt(handle, locatorPosition, 20)
    if (locator.length < 20 || locator.readUInt32LE(0) !== 0x07064b50) throw new OperationError('zip-invalid')
    const record = await readAt(handle, Number(locator.readBigUInt64LE(8)), 56)
    if (record.length < 56 || record.readUInt32LE(0) !== 0x06064b50) throw new OperationError('zip-invalid')
    disk = record.readUInt32LE(16); directoryDisk = record.readUInt32LE(20)
    entriesOnDisk = Number(record.readBigUInt64LE(24)); count = Number(record.readBigUInt64LE(32))
    directorySize = Number(record.readBigUInt64LE(40)); directoryOffset = Number(record.readBigUInt64LE(48))
  }
  // Split volumes cannot be read from a single archived copy.
  if (disk !== 0 || directoryDisk !== 0 || entriesOnDisk !== count) throw new OperationError('zip-multi-volume')
  if (!Number.isSafeInteger(count) || count < 0 || !Number.isSafeInteger(directorySize) || directorySize < 0 || !Number.isSafeInteger(directoryOffset) || directoryOffset < 0 || directoryOffset + directorySize > size) throw new OperationError('zip-invalid')
  if (directorySize > CENTRAL_DIRECTORY_LIMIT) throw new OperationError('zip-too-large')
  const buffer = await readAt(handle, directoryOffset, directorySize)
  if (buffer.length !== directorySize) throw new OperationError('zip-invalid')
  return { buffer, count }
}

/** List one package without decompressing it; only the central directory is read. */
export async function readZipEntries(filename, cancel) {
  const handle = await fs.open(filename, 'r')
  try {
    const stat = await handle.stat()
    if (!stat.isFile() || stat.size < 22) throw new OperationError('zip-invalid')
    const { buffer, count } = await centralDirectory(handle, stat.size, cancel)
    const entries = [], seen = new Set()
    let position = 0, truncated = false, totalSize = 0
    for (let index = 0; index < count; index++) {
      checkCancel(cancel)
      if (position + 46 > buffer.length || buffer.readUInt32LE(position) !== 0x02014b50) throw new OperationError('zip-invalid')
      const flags = buffer.readUInt16LE(position + 8), method = buffer.readUInt16LE(position + 10)
      const crc = buffer.readUInt32LE(position + 16)
      let compressedSize = buffer.readUInt32LE(position + 20), size = buffer.readUInt32LE(position + 24)
      const nameLength = buffer.readUInt16LE(position + 28), extraLength = buffer.readUInt16LE(position + 30), commentLength = buffer.readUInt16LE(position + 32)
      const attributes = buffer.readUInt32LE(position + 38)
      let offset = buffer.readUInt32LE(position + 42)
      const nameStart = position + 46
      if (nameStart + nameLength + extraLength + commentLength > buffer.length) throw new OperationError('zip-invalid')
      const raw = buffer.subarray(nameStart, nameStart + nameLength)
      if (size === 0xffffffff || compressedSize === 0xffffffff || offset === 0xffffffff) {
        const values = zip64Values(buffer.subarray(nameStart + nameLength, nameStart + nameLength + extraLength), [size === 0xffffffff, compressedSize === 0xffffffff, offset === 0xffffffff])
        if (values[0] !== null) size = values[0]
        if (values[1] !== null) compressedSize = values[1]
        if (values[2] !== null) offset = values[2]
      }
      position = nameStart + nameLength + extraLength + commentLength
      const name = decodeName(raw, (flags & 0x800) !== 0)
      if (/[/\\]$/.test(name) || (attributes & 0x10) !== 0 && size === 0) continue
      const parts = zipEntryParts(name)
      if (!parts.length) continue
      if (!Number.isSafeInteger(size) || size < 0 || !Number.isSafeInteger(compressedSize) || compressedSize < 0 || !Number.isSafeInteger(offset) || offset < 0) throw new OperationError('zip-invalid')
      totalSize += size
      if (entries.length >= ZIP_ENTRY_LIMIT) { truncated = true; break }
      const entryPath = parts.join('/')
      const encrypted = (flags & 1) !== 0
      const reason = encrypted ? 'encrypted' : method !== 0 && method !== 8 ? 'method' : size > ZIP_ENTRY_SIZE_LIMIT ? 'too-large' : seen.has(entryPath) ? 'duplicate' : null
      seen.add(entryPath)
      entries.push({ path: entryPath, name: parts[parts.length - 1], size, compressedSize, crc32: crc, method, offset, supported: reason === null, reason })
    }
    return { entries, truncated, totalSize }
  } finally { await handle.close() }
}

/** Leave room for a version suffix inside MAX_PATH. */
export function extractedFileName(name, directory) {
  const maximum = Math.min(200, 259 - directory.length - 13)
  return maximum < 12 ? null : compactName(safeName(name, 32767), maximum)
}

/** Decompress one entry to a temporary file and prove its CRC and size before publishing. */
export async function writeZipEntry(filename, entry, temporary, cancel) {
  const handle = await fs.open(filename, 'r')
  let output
  try {
    const header = await readAt(handle, entry.offset, 30)
    if (header.length < 30 || header.readUInt32LE(0) !== 0x04034b50) throw new OperationError('zip-invalid')
    const start = entry.offset + 30 + header.readUInt16LE(26) + header.readUInt16LE(28)
    const stat = await handle.stat()
    if (start + entry.compressedSize > stat.size) throw new OperationError('zip-invalid')
    output = await fs.open(temporary, 'wx', 0o600)
    const md5 = createHash('md5'), sha256 = createHash('sha256')
    let crc = 0, size = 0
    if (entry.compressedSize > 0) {
      const stream = handle.createReadStream({ start, end: start + entry.compressedSize - 1, autoClose: false })
      const decoder = entry.method === 8 ? createInflateRaw() : null
      try {
        for await (const chunk of decoder ? stream.pipe(decoder) : stream) {
          checkCancel(cancel)
          size += chunk.length
          if (size > entry.size || size > ZIP_ENTRY_SIZE_LIMIT) throw new OperationError('zip-entry-changed')
          crc = crc32(chunk, crc); md5.update(chunk); sha256.update(chunk)
          await output.writeFile(chunk)
        }
      } catch (error) {
        stream.destroy(); decoder?.destroy()
        throw error
      }
    }
    await output.sync()
    if (size !== entry.size || (crc >>> 0) !== (entry.crc32 >>> 0)) throw new OperationError('zip-entry-changed')
    return { size, md5: md5.digest('hex'), sha256: sha256.digest('hex') }
  } finally {
    await output?.close()
    await handle.close()
  }
}

/** Publish with the same no-overwrite and version-suffix rules as an ordinary attachment. */
export async function publishExtracted(temporary, directory, clean, digest, cancel) {
  const { stem, extension, names: preferred } = versionNames(clean, digest.md5)
  let destination
  for (const name of await archivedNames(directory, clean, digest.md5)) {
    const target = path.join(directory, name)
    if (!await exists(target)) { if (preferred.includes(name)) destination ??= target; continue }
    if (await verifiedArchive(target, { size: digest.size }, digest.md5, cancel)) return { status: 'existing', path: target }
  }
  destination ??= path.join(directory, `${stem}~${digest.md5.slice(0, 10)}-${randomUUID().slice(0, 8)}${extension}`)
  try { await fs.link(temporary, destination) }
  catch (error) {
    if (error.code === 'EEXIST') return { status: 'conflict', path: null }
    throw new OperationError('atomic-publish-failed', error.message)
  }
  return { status: 'saved', path: destination }
}