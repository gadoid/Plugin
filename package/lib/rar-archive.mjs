/** Single-level RAR inspection and extraction via the vendored official unrar WASM. */
import { createHash } from 'node:crypto'
import * as fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import { crc32 } from 'node:zlib'
import { OperationError, checkCancel } from './files.mjs'
import { ZIP_ENTRY_LIMIT, ZIP_ENTRY_SIZE_LIMIT, zipEntryParts } from './zip-archive.mjs'

const require = createRequire(import.meta.url)
const { createExtractorFromFile } = require('./vendor/unrar/index.js')

export function isRarName(name) {
  if (typeof name !== 'string') return false
  const dot = name.lastIndexOf('.')
  return dot >= 0 && name.slice(dot + 1).toLowerCase() === 'rar'
}

function rarError(error) {
  if (error instanceof OperationError) return error
  switch (error?.reason) {
    case 'ERAR_MISSING_PASSWORD': case 'ERAR_BAD_PASSWORD': return new OperationError('rar-encrypted', error.message)
    case 'ERAR_BAD_DATA': return new OperationError('rar-damaged', error.message)
    case 'ERAR_BAD_ARCHIVE': case 'ERAR_UNKNOWN_FORMAT': return new OperationError('rar-invalid', error.message)
    case 'ERAR_NO_MEMORY': return new OperationError('rar-no-memory', error.message)
    case 'ERAR_EREFERENCE': return new OperationError('rar-solid-reference', error.message)
    default: return new OperationError('rar-failed', error?.message)
  }
}

// The wasm module is a singleton whose active extractor is swapped on creation; overlapping calls would race.
let queue = Promise.resolve()
function withUnrarLock(run) {
  const result = queue.then(run, run)
  queue = result.then(() => {}, () => {})
  return result
}

/** List one package without extracting; directories are skipped and unsafe names are sanitized. */
export async function readRarEntries(filename, cancel) {
  return withUnrarLock(async () => {
    let extractor
    try {
      extractor = await createExtractorFromFile({ filepath: filename, targetPath: '' })
      const { arcHeader, fileHeaders } = extractor.getFileList()
      if (arcHeader.flags.volume) throw new OperationError('rar-volume')
      if (arcHeader.flags.headerEncrypted) throw new OperationError('rar-encrypted')
      const entries = [], seen = new Set()
      let truncated = false, totalSize = 0
      // Iterate to the end even past the limit: stopping early leaks the embind archive object.
      for (const header of fileHeaders) {
        checkCancel(cancel)
        if (header.flags.directory) continue
        const parts = zipEntryParts(header.name)
        if (!parts.length) continue
        const size = header.unpSize
        totalSize += size
        if (entries.length >= ZIP_ENTRY_LIMIT) { truncated = true; continue }
        const entryPath = parts.join('/')
        const reason = header.flags.encrypted ? 'encrypted' : size > ZIP_ENTRY_SIZE_LIMIT ? 'too-large' : seen.has(entryPath) ? 'duplicate' : null
        seen.add(entryPath)
        entries.push({ path: entryPath, name: parts[parts.length - 1], rawName: header.name, size, compressedSize: header.packSize, crc32: header.crc, supported: reason === null, reason })
      }
      return { entries, truncated, totalSize }
    } catch (error) {
      throw rarError(error)
    } finally {
      if (extractor?._archive) extractor.closeArc()
    }
  })
}

/** Extract the requested entries into a fresh staging directory; partial results survive a mid-archive failure. */
export async function extractRarToStaging(filename, rawNames, staging, cancel) {
  return withUnrarLock(async () => {
    const extractor = await createExtractorFromFile({
      filepath: filename,
      targetPath: staging,
      filenameTransform: (name) => zipEntryParts(name).join('/'),
    })
    const extracted = new Set()
    try {
      const { files } = extractor.extract({ files: rawNames })
      for (const file of files) {
        checkCancel(cancel)
        extracted.add(file.fileHeader.name)
      }
      return { extracted, error: null }
    } catch (error) {
      if (error instanceof OperationError && error.code === 'cancelled') throw error
      return { extracted, error: rarError(error) }
    } finally {
      // ExtractorFile overwrites on create, so staging must be fresh; close the archive if a write error left it open.
      if (extractor._archive) extractor.closeArc()
    }
  })
}

/** Prove the staged file's size and CRC before hashing it for publication. */
export async function hashExtracted(filePath, entry, cancel) {
  const handle = await fs.open(filePath, 'r')
  try {
    const md5 = createHash('md5'), sha256 = createHash('sha256')
    let crc = 0, size = 0
    for await (const chunk of handle.createReadStream({ autoClose: false })) {
      checkCancel(cancel)
      size += chunk.length
      if (size > entry.size || size > ZIP_ENTRY_SIZE_LIMIT) throw new OperationError('rar-entry-changed')
      crc = crc32(chunk, crc); md5.update(chunk); sha256.update(chunk)
    }
    if (size !== entry.size || (crc >>> 0) !== (entry.crc32 >>> 0)) throw new OperationError('rar-entry-changed')
    return { size, md5: md5.digest('hex'), sha256: sha256.digest('hex') }
  } finally { await handle.close() }
}