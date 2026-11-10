/** Windows directory rules shared by the workbench and Host; no silent input cleanup. */
const illegalName = /[\\/<>:"|?*\x00-\x1f]/
const reservedName = /^(con|prn|aux|nul|com[1-9¹²³]|lpt[1-9¹²³])(?:\.|$)/i

export function directoryNameError(value, maximum = 180) {
  return typeof value !== 'string' || !value.trim() || value.length > maximum || illegalName.test(value) || /[. ]$/.test(value) || value === '.' || value === '..' || reservedName.test(value) ? 'invalid-folder-name' : null
}

/** Renamed archive files are one Windows path component; reuse the folder rules with the file-name limit. */
export function fileNameError(value, maximum = 255) {
  return typeof value !== 'string' || !value.trim() || value.length > maximum || illegalName.test(value) || /[. ]$/.test(value) || value === '.' || value === '..' || reservedName.test(value) ? 'invalid-file-name' : null
}

/** Separators and a drive-letter colon are legal only as full-path structure. */
export function directoryPathError(value) {
  if (typeof value !== 'string' || !value.trim() || value.length > 2048 || /[<>"|?*\x00-\x1f]/.test(value)) return 'invalid-save-directory'
  const normalized = value.replaceAll('/', '\\')
  let parts
  if (/^[a-z]:\\/i.test(normalized)) parts = normalized.slice(3).split('\\')
  else if (normalized.startsWith('\\\\')) {
    parts = normalized.slice(2).split('\\')
    if (!parts[0] || !parts[1]) return 'invalid-save-directory'
  } else return 'invalid-save-directory'
  return parts.filter(Boolean).some(part => directoryNameError(part, 255)) ? 'invalid-save-directory' : null
}

/** Suggest a legal initial alias for group titles containing Windows punctuation. */
export function suggestDirectoryName(value) {
  let name = String(value).normalize('NFC').replace(/[\\/<>:"|?*\x00-\x1f]/g, '_').slice(0, 180).replace(/[. ]+$/g, '')
  if (!name || name === '.' || name === '..') name = '_'
  if (reservedName.test(name)) name = `_${name}`.slice(0, 180)
  return name
}
