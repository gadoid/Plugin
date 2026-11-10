/** Source association: readable SQLite or the authorized in-memory native reader. */
import * as fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { OperationError, exists, inside, checkCancel } from './files.mjs'

export function today() { return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai' }).format(new Date()) }
/** Shanghai-local minute ranges include the entire end minute; legacy dates include the end day. */
export function dateWindow(start, end, cutoff = Date.now()) {
  const parse = value => {
    const match = typeof value === 'string' && /^(\d{4}-\d{2}-\d{2})(?:T(\d{2}):(\d{2}))?$/.exec(value)
    if (!match || match[1].startsWith('0000')) throw new OperationError('invalid-dates')
    const day = new Date(`${match[1]}T00:00:00Z`), hour = match[2] ?? '00', minute = match[3] ?? '00'
    if (!Number.isFinite(day.getTime()) || day.toISOString().slice(0, 10) !== match[1] || Number(hour) > 23 || Number(minute) > 59) throw new OperationError('invalid-dates')
    return { day: match[1], stamp: Date.parse(`${match[1]}T${hour}:${minute}:00+08:00`), step: match[2] === undefined ? 86400000 : 60000 }
  }
  const lower = parse(start), upper = parse(end), exclusiveEnd = upper.stamp + upper.step
  if (!Number.isFinite(cutoff) || upper.day > today() || lower.stamp >= exclusiveEnd || lower.stamp > cutoff) throw new OperationError('invalid-dates')
  return { start: lower.stamp, end: Math.min(exclusiveEnd, cutoff) }
}
export async function accounts(root = path.join(os.homedir(), 'Documents', 'WXWork'), stateDirectory, cancel, nativeReader) {
  if (!path.isAbsolute(root)) throw new OperationError('absolute-source-required')
  if (!await exists(root)) return { root, accounts: [] }
  const entries = await fs.readdir(root, { withFileTypes: true })
  const result = []
  for (const entry of entries) if (entry.isDirectory() && !entry.isSymbolicLink() && /^\d+$/.test(entry.name) && await exists(path.join(root, entry.name, 'Data', 'session.db'))) {
    checkCancel(cancel)
    const folder = await accountPath(root, entry.name), stamp = await fs.stat(path.join(folder, 'Data', 'session.db'))
    let profile = { organization: '', displayName: '', metadataStatus: 'unavailable' }
    if (stateDirectory && await exists(path.join(folder, 'Data', 'user.db'))) {
      try {
        const names = ['user.db', ...(await exists(path.join(folder, 'Data', 'company.db')) ? ['company.db'] : [])]
        profile = await withDatabases(folder, names, stateDirectory, opened => accountProfile(opened, entry.name), cancel)
      } catch (error) {
        if (error.code === 'cancelled') throw error
        if (error.code === 'source-locked' && nativeReader) {
          try {
            const value = await nativeReader({ action: 'profile', root, account: entry.name })
            if (!value || typeof value.organization !== 'string' || typeof value.displayName !== 'string' || value.organization.length > 300 || value.displayName.length > 200) throw new OperationError('reader-protocol-failed')
            profile = { organization: value.organization, displayName: value.displayName, metadataStatus: value.metadataStatus === 'available' ? 'available' : 'unavailable' }
          } catch (reason) { if (reason.code === 'cancelled') throw reason; profile.error = reason.code || 'source-adapter-failed' }
        } else profile.error = error.code || 'source-format-unsupported'
      }
    }
    result.push({ id: entry.name, ...profile, lastUpdated: stamp.mtimeMs })
  }
  return { root, accounts: result.sort((a, b) => Number(Boolean(b.organization)) - Number(Boolean(a.organization)) || b.lastUpdated - a.lastUpdated) }
}

function hasTable(database, name) { return Boolean(database?.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?").get(name)) }
/** Read only this directory owner's name and own organization, never the contact list. */
export function accountProfile(opened, account) {
  const users = opened['user.db'], company = opened['company.db']
  if (!hasTable(users, 'user_table')) return { organization: '', displayName: '', metadataStatus: 'unavailable' }
  const self = users.prepare('SELECT name,CAST(corp_id AS TEXT) AS corp_id FROM user_table WHERE CAST(id AS TEXT)=?').get(account)
  if (!self) return { organization: '', displayName: '', metadataStatus: 'unavailable' }
  const corp = hasTable(company, 'external_company_table_v2') ? company.prepare('SELECT name,short_name FROM external_company_table_v2 WHERE CAST(corpany_id AS TEXT)=?').get(self.corp_id) : null
  const department = !corp && hasTable(users, 'department_tableV2') ? users.prepare('SELECT name FROM department_tableV2 WHERE CAST(corpany_id AS TEXT)=? AND (parent_id=0 OR parent_id=id) LIMIT 1').get(self.corp_id) : null
  return { organization: String(corp?.name || corp?.short_name || department?.name || ''), displayName: String(self.name || ''), metadataStatus: 'available' }
}
export async function accountPath(root, account) {
  if (!path.isAbsolute(root) || !/^\d+$/.test(account)) throw new OperationError('invalid-account')
  const base = await fs.realpath(root), selected = path.join(base, account)
  const info = await fs.lstat(selected)
  if (!info.isDirectory() || info.isSymbolicLink() || !inside(base, await fs.realpath(selected))) throw new OperationError('invalid-account')
  return selected
}

/** Local cache areas that can hold verified attachment originals (files, images, videos). */
export function cacheRoots(account) { return ['File', 'Image', 'Video'].map(name => path.join(account, 'Cache', name)) }

/**
 * Normalize the cache handshake carried from the preview into the save job.
 * Legacy previews carried the single Cache/File root as a string; new previews
 * carry an array of account-local cache roots. Anything else is protocol failure.
 */
export function normalizeCacheRoots(cache, account) {
  const allowed = cacheRoots(account).map(root => path.resolve(root))
  const roots = Array.isArray(cache) ? cache : [cache]
  if (!roots.length || roots.some(root => typeof root !== 'string')) throw new OperationError('reader-protocol-failed')
  const resolved = roots.map(root => path.resolve(root))
  if (roots.length === 1 && typeof cache === 'string' && resolved[0] !== allowed[0]) throw new OperationError('reader-protocol-failed')
  for (const root of resolved) if (!allowed.includes(root)) throw new OperationError('reader-protocol-failed')
  return roots
}

/** Stable private copy; SQLite never opens the original application database. */
export async function withDatabases(account, names, stateDirectory, action, cancel) {
  const { DatabaseSync } = await import('node:sqlite')
  await fs.mkdir(stateDirectory, { recursive: true })
  const temporary = await fs.mkdtemp(path.join(stateDirectory, 'source-snapshot-'))
  const opened = {}
  try {
    for (const name of names) {
      checkCancel(cancel)
      const original = path.join(account, 'Data', name)
      const header = await fs.open(original, 'r')
      try {
        const bytes = Buffer.alloc(16); await header.read(bytes, 0, 16, 0)
        if (!bytes.equals(Buffer.from('SQLite format 3\0'))) throw new OperationError('source-locked')
      } finally { await header.close() }
      let stable = false
      async function stamps() {
        const result = []
        for (const suffix of ['', '-wal', '-shm']) { const filename = original + suffix; if (await exists(filename)) { const info = await fs.stat(filename); result.push([suffix, info.size, info.mtimeMs]) } }
        return result
      }
      for (let attempt = 0; attempt < 3; attempt++) {
        const before = await stamps()
        for (const suffix of ['', '-wal', '-shm']) {
          const target = path.join(temporary, name + suffix)
          await fs.unlink(target).catch(error => { if (error.code !== 'ENOENT') throw error })
          if (before.some(item => item[0] === suffix)) await fs.copyFile(original + suffix, target)
        }
        if (JSON.stringify(before) === JSON.stringify(await stamps())) { stable = true; break }
      }
      if (!stable) throw new OperationError('source-busy')
      const database = new DatabaseSync(path.join(temporary, name), { readOnly: true })
      opened[name] = database
      database.exec('PRAGMA query_only=ON')
      if (Object.values(database.prepare('PRAGMA quick_check').get())[0] !== 'ok') throw new OperationError('source-damaged')
    }
    return await action(opened)
  } finally {
    for (const database of Object.values(opened)) database.close()
    // Only this mkdtemp-created directory is removed, never a supplied path.
    await fs.rm(temporary, { recursive: true, force: true })
  }
}

export async function findGroups(settings, name, stateDirectory, cancel, nativeReader) {
  if (typeof name !== 'string' || !name.trim() || name.length > 200) throw new OperationError('group-name-required')
  const account = await accountPath(settings.root, settings.account)
  const names = ['session.db', ...(await exists(path.join(account, 'Data', 'file.db')) ? ['file.db'] : [])]
  try { return await withDatabases(account, names, stateDirectory, databases => {
    const sessions = databases['session.db'], files = databases['file.db']
    const columns = new Set(sessions.prepare('PRAGMA table_info(conversation_table)').all().map(row => row.name))
    const query = sessions.prepare(`SELECT id,name,roomname_remark,last_message_time,${columns.has('status') ? 'status' : 'NULL AS status'} FROM conversation_table WHERE (id LIKE 'R:%' OR id LIKE 'room-%') AND (instr(lower(name),lower(?))>0 OR instr(lower(roomname_remark),lower(?))>0) ORDER BY last_message_time DESC LIMIT 200`)
    return query.all(name.trim(), name.trim()).map(row => {
      const memberCount = hasTable(sessions, 'conversation_user_table') ? Number(sessions.prepare('SELECT COUNT(*) AS n FROM conversation_user_table WHERE conversation_id=?').get(row.id).n) : null
      const fileCount = hasTable(files, 'file_table4') ? Number(files.prepare('SELECT COUNT(*) AS n FROM file_table4 WHERE conversation_id=?').get(row.id).n) : null
      const fileExamples = fileCount ? files.prepare('SELECT DISTINCT name FROM file_table4 WHERE conversation_id=? ORDER BY message_id DESC LIMIT 3').all(row.id).map(item => String(item.name)) : []
      return { id: String(row.id), name: row.roomname_remark || row.name, lastTime: String(row.last_message_time ?? ''), memberCount, fileCount, fileExamples, recordState: row.status === 2 ? 'historical' : memberCount > 0 ? 'recent' : 'unknown' }
    }).sort((a, b) => Number(b.recordState === 'recent') - Number(a.recordState === 'recent') || Number(a.recordState === 'historical') - Number(b.recordState === 'historical') || Number(b.lastTime) - Number(a.lastTime))
  }, cancel) } catch (error) {
    if (error.code !== 'source-locked' || !nativeReader) throw error
    const result = await nativeReader({ action: 'groups', root: path.dirname(account), account: settings.account, name })
    if (!Array.isArray(result) || result.length > 200 || result.some(group => !group || typeof group.id !== 'string' || typeof group.name !== 'string' || typeof group.lastTime !== 'string' || !Array.isArray(group.fileExamples) || group.fileExamples.length > 3 || group.fileExamples.some(name => typeof name !== 'string') || ![null, undefined].includes(group.fileCount) && (!Number.isSafeInteger(group.fileCount) || group.fileCount < 0))) throw new OperationError('reader-protocol-failed')
    return result
  }
}

/** Join attachment metadata to original message times; never infer source from filenames. */
export async function listAttachments(settings, start, end, cutoff, stateDirectory, cancel, nativeReader) {
  const account = await accountPath(settings.root, settings.account)
  const window = dateWindow(start, end, cutoff)
  try { return await withDatabases(account, ['session.db', 'file.db', 'message.db'], stateDirectory, databases => {
    const files = databases['file.db'], messages = databases['message.db'], sessions = databases['session.db']
    const result = [], warnings = []
    const tables = ['message_table', 'message_small_table', 'kf_message_tableV1'].filter(name => messages.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?").get(name))
    if (!tables.length) throw new OperationError('source-format-unsupported')
    for (const group of settings.groups) {
      checkCancel(cancel)
      if (!sessions.prepare('SELECT id FROM conversation_table WHERE id=?').get(group.id)) { warnings.push({ code: 'group-not-found', group: group.name }); continue }
      const metadata = new Map()
      for (const table of tables) {
        const query = messages.prepare(`SELECT CAST(message_id AS TEXT) AS message_id,CAST(sender_id AS TEXT) AS sender_id,send_time FROM ${table} WHERE conversation_id=? AND ((send_time>=? AND send_time<?) OR (send_time>=? AND send_time<?))`)
        for (const row of query.all(group.id, window.start / 1000, window.end / 1000, window.start, window.end)) {
          const time = Number(row.send_time) > 100000000000 ? Number(row.send_time) : Number(row.send_time) * 1000
          const previous = metadata.get(row.message_id)
          metadata.set(row.message_id, previous && (previous.time !== time || previous.sender !== row.sender_id) ? { conflict: true } : { time, sender: row.sender_id })
        }
      }
      const rows = files.prepare('SELECT CAST(message_id AS TEXT) AS message_id,file_index,origin,name,size,conversation_id,CAST(sender_id AS TEXT) AS sender_id,md5 FROM file_table4 WHERE conversation_id=?').all(group.id)
      const lookup = tables.map(table => messages.prepare(`SELECT 1 FROM ${table} WHERE conversation_id=? AND CAST(message_id AS TEXT)=? LIMIT 1`))
      let unmapped = 0
      for (const row of rows) {
        const message = metadata.get(row.message_id)
        if (!message) { if (!lookup.some(query => query.get(group.id, row.message_id))) unmapped++; continue }
        const md5 = row.md5 instanceof Uint8Array ? Buffer.from(row.md5).toString(row.md5.length === 16 ? 'hex' : 'ascii').toLowerCase() : String(row.md5 ?? '').toLowerCase()
        result.push({ id: `${settings.account}:${group.id}:${row.message_id}:${row.file_index}:${row.origin}`, groupId: group.id, group: group.name, folder: group.folder, name: String(row.name), size: Number(row.size), md5, time: message.time ?? null, day: message.time ? new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai' }).format(message.time) : start.slice(0, 10), sourceStatus: message.conflict || message.sender !== row.sender_id ? 'source-conflict' : 'ok' })
      }
      if (unmapped) warnings.push({ code: 'missing-message-time', group: group.name, count: unmapped })
    }
    return { records: result, warnings, cache: cacheRoots(account) }
  }, cancel) } catch (error) {
    if (error.code !== 'source-locked' || !nativeReader) throw error
    const result = await nativeReader({ action: 'files', root: path.dirname(account), account: settings.account, groups: settings.groups, start, end, cutoff })
    // Older readers carry only the Cache/File root; newer ones may carry several.
    // The cache roots themselves are derived here, never consumed from the reader.
    const allowedRoots = cacheRoots(account).map(root => path.resolve(root))
    const readerRoots = Array.isArray(result?.cache) ? result.cache : [result?.cache]
    if (!result || !Array.isArray(result.records) || !Array.isArray(result.warnings) || !readerRoots.length || readerRoots.some(root => typeof root !== 'string' || !allowedRoots.includes(path.resolve(root)))) throw new OperationError('reader-protocol-failed')
    for (const record of result.records) {
      const group = settings.groups.find(item => item.id === record.groupId)
      if (!group || record.group !== group.name || record.folder !== group.folder || typeof record.id !== 'string' || !record.id.startsWith(`${settings.account}:${group.id}:`) || typeof record.name !== 'string' || typeof record.day !== 'string' || typeof record.md5 !== 'string' || !['ok', 'source-conflict'].includes(record.sourceStatus)) throw new OperationError('reader-protocol-failed')
      if (record.sourceStatus === 'ok' && (!Number.isFinite(record.time) || record.time < window.start || record.time >= window.end || record.day !== new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai' }).format(record.time))) throw new OperationError('reader-protocol-failed')
    }
    return { ...result, cache: cacheRoots(account) }
  }
}
