/** Filename intake rules; neither a carrier lookup nor file-content inspection. */
export const FILTER_VERSION = 4
export const BILL_FILE_EXTENSIONS = Object.freeze(['pdf', 'png', 'jpeg', 'jpg', 'svg', 'doc', 'docx', 'pptx', 'zip', 'xls', 'xlsx'])
const billExtensions = new Set(BILL_FILE_EXTENSIONS)

/** Check the final extension only; do not let a .pdf.exe double suffix pass. */
export function isBillFileFormatAllowed(filename) {
  if (typeof filename !== 'string') return false
  const dot = filename.lastIndexOf('.')
  return dot >= 0 && billExtensions.has(filename.slice(dot + 1).toLowerCase())
}

function calendarNumber(value) {
  if (!/^(?:19|20)\d{6}(?:\d{6})?$/.test(value)) return false
  const day = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
  const stamp = new Date(`${day}T00:00:00Z`)
  return Number.isFinite(stamp.getTime()) && stamp.toISOString().slice(0, 10) === day
}

/** Identify plausible numeric identifiers independently of the format whitelist. */
export function matchBillFilename(filename) {
  const stem = String(filename).normalize('NFKC').replace(/\.[^.]*$/, '').toUpperCase()
    .replace(/(?:19|20)\d{2}[-_.年]\d{1,2}[-_.月]\d{1,2}日?/g, ' ')
  const candidates = []
  for (const match of stem.matchAll(/[A-Z0-9]+(?:[-_][A-Z0-9]+)*/g)) {
    const token = match[0], compact = token.replace(/[-_]/g, '')
    const digits = (compact.match(/\d/g) || []).length
    const letters = (compact.match(/[A-Z]/g) || []).length
    if (compact.length > 32 || calendarNumber(compact)) continue
    if ((!letters && digits >= 6) || (letters && digits >= 4 && compact.length >= 8)) candidates.push(token)
  }
  return { matched: candidates.length > 0, candidates: [...new Set(candidates)] }
}
