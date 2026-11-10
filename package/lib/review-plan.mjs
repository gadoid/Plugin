/** Pure archive preview and explicit selection; these functions never touch the filesystem. */
import path from 'node:path'
import { attachmentLayout, OperationError, safeName } from './files.mjs'
import { directoryNameError } from './directory-rules.mjs'
import { matchBillFilename, isBillFileFormatAllowed } from './filename-filter.mjs'

const modeCheck = mode => { if (!['all', 'bill'].includes(mode)) throw new OperationError('invalid-save-mode') }
const invalid = () => { throw new OperationError('invalid-review') }
const objectWithKeys = (value, keys) => value && typeof value === 'object' && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value)) && Object.keys(value).every(key => keys.includes(key))

function groupIndex(groups) {
  if (!Array.isArray(groups) || groups.length > 100) invalid()
  const result = new Map()
  groups.forEach((group, index) => {
    if (!group || typeof group.id !== 'string' || !group.id || result.has(group.id) || typeof group.name !== 'string' || typeof group.folder !== 'string' || group.folder !== safeName(group.folder, 180)) invalid()
    result.set(group.id, { ...group, index })
  })
  return result
}

function withPlan(record, settings, mode, groups) {
  const group = groups.get(record.groupId)
  if (!group || typeof record.id !== 'string' || !record.id || record.id.length > 1024 || typeof record.name !== 'string') invalid()
  const bound = { ...record, group: group.name, folder: group.folder }
  if (!bound.documentFolder) delete bound.documentFolder
  const match = matchBillFilename(record.name), billFormatAllowed = isBillFileFormatAllowed(record.name)
  const layout = attachmentLayout(settings.saveDirectory, bound)
  const documentFolder = layout?.documentFolder ?? (record.documentFolder || safeName(path.parse(safeName(record.name, 32767)).name || '_', 180))
  const folderSource = record.folderSource === 'auto' || record.folderSource === 'file' ? record.folderSource : record.documentFolder ? 'file' : layout ? 'auto' : 'file'
  let issue = null
  if (record.sourceStatus !== 'ok' || !Number.isFinite(record.time) || typeof record.day !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(record.day)) issue = 'source-conflict'
  else if (!Number.isSafeInteger(record.size) || record.size < 0 || !/^[a-f\d]{32}$/i.test(String(record.md5 ?? ''))) issue = 'unverifiable'
  else if (mode === 'bill' && !billFormatAllowed) issue = 'format'
  else if (!layout) issue = 'path-too-long'
  const selectable = issue === null
  const selected = selectable && (mode === 'all' || match.matched)
  return {
    ...bound, match, billFormatAllowed, selectable, selected, issue,
    documentFolder, folderSource, plannedName: layout?.filename ?? null,
    plannedPath: layout ? path.join(settings.saveDirectory, group.folder, record.day, layout.documentFolder, layout.filename) : null,
    status: issue === 'format' ? 'skipped' : issue || (selected ? 'ready' : 'skipped'),
    skipReason: issue === 'format' ? 'format' : !issue && !selected ? 'filename' : undefined,
  }
}

/** Return all records in configured group order and chronological message order. */
export function buildPlan(records, settings, mode) {
  modeCheck(mode)
  if (!Array.isArray(records) || !settings || typeof settings.saveDirectory !== 'string') invalid()
  const groups = groupIndex(settings.groups), seen = new Set()
  return records.map(record => {
    if (!record || seen.has(record.id)) invalid()
    seen.add(record.id)
    return withPlan(record, settings, mode, groups)
  }).sort((a, b) => groups.get(a.groupId).index - groups.get(b.groupId).index || (Number.isFinite(a.time) ? a.time : Infinity) - (Number.isFinite(b.time) ? b.time : Infinity) || a.id.localeCompare(b.id))
}

function entries(value, maximum, allowedKeys, identifier, known) {
  if (value === undefined) return []
  if (!Array.isArray(value) || value.length > maximum) invalid()
  const seen = new Set()
  for (const item of value) {
    if (!objectWithKeys(item, allowedKeys) || typeof item[identifier] !== 'string' || !known.has(item[identifier]) || seen.has(item[identifier])) invalid()
    seen.add(item[identifier])
  }
  return value
}

function folderName(value) {
  if (directoryNameError(value)) throw new OperationError('invalid-folder-name')
  return value.normalize('NFC')
}

/** Apply only selection and one folder component to trusted server-side records. */
export function applyReview(records, settings, mode, review = {}, { allowEmpty = false } = {}) {
  modeCheck(mode)
  if (!Array.isArray(records) || !settings || typeof settings.saveDirectory !== 'string') invalid()
  if (!objectWithKeys(review, ['groupSelections', 'groupFolders', 'changes'])) invalid()
  const groups = groupIndex(settings.groups), original = new Map()
  for (const record of records) {
    if (!record || original.has(record.id)) invalid()
    original.set(record.id, record)
  }
  const selections = entries(review.groupSelections, 100, ['groupId', 'selected'], 'groupId', groups)
  const folders = entries(review.groupFolders, 100, ['groupId', 'documentFolder'], 'groupId', groups)
  // A scoped select-all submits one entry per matching file; still bounded.
  const changes = entries(review.changes, 20000, ['id', 'selected', 'documentFolder'], 'id', original)
  for (const item of selections) if (typeof item.selected !== 'boolean') invalid()
  for (const item of changes) {
    if (item.selected === undefined && item.documentFolder === undefined) invalid()
    if (item.selected !== undefined && typeof item.selected !== 'boolean') invalid()
  }
  const groupSelections = new Map(selections.map(item => [item.groupId, item.selected]))
  // Folder names are validated only when the row is actually selected: an edit left on an
  // unchecked row must not block saving the rows that are checked.
  const groupFolders = new Map(folders.map(item => [item.groupId, item.documentFolder]))
  const rowChanges = new Map(changes.map(item => [item.id, item]))
  const planned = buildPlan(records, settings, mode).map(row => {
    const previous = original.get(row.id), change = rowChanges.get(row.id)
    // A trusted prior denial remains a denial; saved/existing status is irrelevant.
    const selectable = row.selectable && previous.selectable !== false
    let selected = typeof previous.selected === 'boolean' ? previous.selected : row.selected
    if (groupSelections.has(row.groupId)) selected = groupSelections.get(row.groupId) && selectable
    if (change?.selected !== undefined) selected = change.selected
    if (selected && !selectable) throw new OperationError('selection-unavailable')
    const folderChange = selected && change?.documentFolder !== undefined
    const assigned = folderChange ? folderName(change.documentFolder) : selected && groupFolders.has(row.groupId) ? folderName(groupFolders.get(row.groupId)) : row.documentFolder
    const folderSource = folderChange ? 'file' : selected && groupFolders.has(row.groupId) ? 'group' : row.folderSource === 'auto' ? 'auto' : 'file'
    const layout = attachmentLayout(settings.saveDirectory, { ...row, documentFolder: assigned })
    if (!layout && (selected || folderChange)) throw new OperationError('path-too-long')
    return {
      ...row, selectable, selected,
      documentFolder: assigned, folderSource,
      plannedName: layout?.filename ?? null,
      plannedPath: layout ? path.join(settings.saveDirectory, row.folder, row.day, assigned, layout.filename) : null,
      status: row.issue && row.issue !== 'format' ? row.issue : selected ? 'ready' : row.issue === 'format' ? 'skipped' : 'not-selected',
      skipReason: selected ? undefined : row.issue === 'format' ? 'format' : 'manual',
    }
  })
  if (!allowEmpty && !planned.some(row => row.selected)) throw new OperationError('selection-required')
  return planned
}

/** Include configured empty groups so the review can distinguish zero records. */
export function summarizeGroups(records, groups, archived = () => false) {
  const index = groupIndex(groups)
  const summaries = [...index.values()].map(({ id, name, folder }) => ({ id, name, folder, recordCount: 0, selectableCount: 0, selectedCount: 0 }))
  const byId = new Map(summaries.map(summary => [summary.id, summary]))
  for (const row of records) {
    const summary = byId.get(row.groupId)
    if (!summary) invalid()
    summary.recordCount++
    // A save result keeps already archived rows final; they are listed but no longer "saveable".
    if (row.selectable === true && !archived(row)) summary.selectableCount++
    if (row.selected === true) summary.selectedCount++
  }
  return summaries
}
