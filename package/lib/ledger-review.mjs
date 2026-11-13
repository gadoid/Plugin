/**
 * 核对浮层的数据面：一票多份单证、字段证据与按需页面渲染。
 * 证据只存在识别快照（orders/extraction/<runId>.json）里，台账只存值与来源。
 */
import fs from 'node:fs'
import path from 'node:path'
import { extractionPath, readPdfPageItems, renderDocumentPage } from './order/host.bundle.mjs'
import { readLedger, readLedgerConfig, ticketIdOf } from './ledger-store.mjs'
import { buildPageModel, locateEvidence } from './evidence-boxes.mjs'
import { readOcrBoxes } from './ocr-boxes.mjs'

const PREVIEWABLE = new Set(['.pdf', '.png', '.jpg', '.jpeg', '.webp', '.gif'])
const MAX_DOCS = 200
const MAX_DEPTH = 4
const PAGE_CACHE_LIMIT = 12
const pageCache = new Map()

const fail = (code, message) => Object.assign(new Error(message || code), { code })
const readJson = file => { try { return JSON.parse(fs.readFileSync(file, 'utf8')) } catch { return null } }
const norm = value => String(value || '').replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase()

function ticketDirectory(stateDirectory, id, row) {
  if (typeof row?.directory === 'string' && row.directory && fs.existsSync(row.directory)) return row.directory
  const index = readJson(path.join(stateDirectory, 'saved-index.json'))
  for (const entry of Object.values(index?.entries || {})) {
    if (typeof entry?.path !== 'string') continue
    const directory = path.dirname(entry.path)
    if (ticketIdOf(directory) === id) return directory
  }
  return typeof row?.directory === 'string' ? row.directory : ''
}

function listDocuments(directory) {
  const out = []
  const walk = (dir, depth) => {
    if (out.length >= MAX_DOCS || depth > MAX_DEPTH) return
    let entries
    try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { return }
    for (const entry of entries) {
      if (out.length >= MAX_DOCS) return
      if (entry.name.startsWith('.')) continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) { walk(full, depth + 1); continue }
      if (!entry.isFile()) continue
      let size = 0
      try { size = fs.statSync(full).size } catch {}
      const ext = path.extname(entry.name).toLowerCase()
      out.push({
        name: entry.name,
        rel: path.relative(directory, full).replace(/\\/g, '/'),
        ext,
        size,
        previewable: PREVIEWABLE.has(ext),
      })
    }
  }
  walk(directory, 0)
  return out.sort((left, right) => left.rel.localeCompare(right.rel, 'zh-CN'))
}

/** 一次识别可能包含多票；按目录精确定位，其次按票 ID，最后退回该次识别唯一的一票。 */
function loadGroup(stateDirectory, runId, directory, id) {
  let file
  try { file = extractionPath(stateDirectory, runId) } catch { return null }
  const snapshot = readJson(file)
  const groups = Array.isArray(snapshot?.groups) ? snapshot.groups : []
  if (!groups.length) return null
  const target = norm(directory)
  return groups.find(group => norm(group.directory) === target)
    || groups.find(group => ticketIdOf(group.directory) === id)
    || groups[0]
}

function alternativeList(input) {
  return (Array.isArray(input) ? input : []).slice(0, 8).map((item) => {
    if (item == null) return null
    if (typeof item === 'string') return { value: item, source_file: '' }
    return { value: String(item.value ?? item.raw_value ?? ''), source_file: String(item.source_file ?? item.sourceFile ?? '') }
  }).filter(item => item?.value)
}

function evidenceDetail(value, resolveDoc) {
  if (!value) return null
  const page = Number(value.page)
  return {
    raw: String(value.raw_value || ''),
    evidence: String(value.evidence || ''),
    page: Number.isInteger(page) && page > 0 ? page : null,
    source_file: String(value.source_file || ''),
    document_type: String(value.document_type || ''),
    selection_reason: String(value.selection_reason || ''),
    alternatives: alternativeList(value.alternatives),
    confidence: Number.isFinite(Number(value.confidence)) ? Number(value.confidence) : null,
    status: String(value.status || ''),
    method: String(value.method || ''),
    doc: resolveDoc(value.source_file)?.rel || null,
  }
}

export function readReviewDetail(stateDirectory, id) {
  if (typeof stateDirectory !== 'string' || !stateDirectory) throw fail('ledger-unavailable')
  const ticket = typeof id === 'string' ? id.trim() : ''
  if (!ticket) throw fail('ledger-invalid', '缺少票 ID')
  const config = readLedgerConfig(stateDirectory)
  if (!config) throw fail('ledger-unconfigured', '尚未创建台账')
  const ledger = readLedger(stateDirectory)
  const row = ledger.rows[ticket]
  if (!row) throw fail('ledger-invalid', '该票尚未识别')

  const directory = ticketDirectory(stateDirectory, ticket, row)
  const documents = directory ? listDocuments(directory) : []
  const byName = new Map()
  for (const doc of documents) if (!byName.has(doc.name)) byName.set(doc.name, doc)
  const resolveDoc = (name) => {
    const text = String(name || '')
    if (!text) return null
    return documents.find(doc => doc.rel === text.replace(/\\/g, '/'))
      || byName.get(path.basename(text))
      || null
  }

  const groupCache = new Map()
  const groupFor = (runId) => {
    const key = String(runId || '')
    if (!key) return null
    if (!groupCache.has(key)) groupCache.set(key, loadGroup(stateDirectory, key, directory, ticket))
    return groupCache.get(key)
  }

  const fields = config.fields.map((field) => {
    const stored = row.values[field.key] || null
    const review = row.review[field.key] || null
    const evidence = groupFor(stored?.run_id)?.values?.find(item => item.key === field.key) || null
    const newerEvidence = review?.newer !== undefined && review.newer_run_id
      ? groupFor(review.newer_run_id)?.values?.find(item => item.key === field.key) || null
      : null
    return {
      key: field.key,
      name: field.name,
      required: field.required === true,
      data_type: field.data_type || 'text',
      options: Array.isArray(field.options) ? field.options : [],
      value: review ? review.value : (stored?.value ?? ''),
      review: review
        ? { value: review.value, edited_at: Number(review.edited_at) || 0, newer: review.newer === undefined ? null : review.newer }
        : null,
      stored: stored
        ? {
          value: stored.value,
          confidence: Number.isFinite(Number(stored.confidence)) ? Number(stored.confidence) : null,
          source_file: String(stored.source_file || ''),
          status: String(stored.status || ''),
          run_id: String(stored.run_id || ''),
        }
        : null,
      evidence: evidenceDetail(evidence, resolveDoc),
      newerEvidence: evidenceDetail(newerEvidence, resolveDoc),
    }
  })

  return {
    id: ticket,
    directory,
    rev: ledger.rev,
    confirmedAt: Number(row.confirmedAt) || 0,
    documents,
    fields,
  }
}

function resolveReviewFile(stateDirectory, id, file) {
  const ticket = typeof id === 'string' ? id.trim() : ''
  if (!ticket) throw fail('ledger-invalid', '缺少票 ID')
  const config = readLedgerConfig(stateDirectory)
  if (!config) throw fail('ledger-unconfigured', '尚未创建台账')
  const ledger = readLedger(stateDirectory)
  const row = ledger.rows[ticket]
  if (!row) throw fail('ledger-invalid', '该票尚未识别')
  const directory = ticketDirectory(stateDirectory, ticket, row)
  if (!directory) throw fail('ledger-invalid', '找不到归档目录')

  const rel = String(file || '').replace(/\\/g, '/')
  if (!rel) throw fail('ledger-invalid', '缺少文件名')
  const root = path.resolve(directory)
  const full = path.resolve(root, rel)
  const inside = path.relative(root, full)
  if (!inside || inside.startsWith('..') || path.isAbsolute(inside)) throw fail('ledger-invalid', '文件不在该票目录内')
  const ext = path.extname(full).toLowerCase()
  if (!PREVIEWABLE.has(ext)) throw fail('ledger-review-preview-unsupported', '该文件不支持页面预览')
  if (!fs.existsSync(full)) throw fail('ledger-invalid', '文件不存在')
  return { ticket, directory, rel, full, ext }
}

/** 本页涉及的字段：单证与页码都匹配才参与定位。 */
function reviewTargets(detail, rel, pageNo) {
  const out = []
  for (const field of detail.fields) {
    for (const kind of ['evidence', 'newerEvidence']) {
      const evidence = field[kind]
      if (!evidence || evidence.doc !== rel) continue
      if (Math.max(1, Math.round(Number(evidence.page) || 1)) !== pageNo) continue
      out.push({ field, kind, evidence })
    }
  }
  return out
}

function locateTargets(targets, model) {
  const fields = []
  for (const { field, kind, evidence } of targets) {
    const candidates = [evidence.evidence, evidence.raw].filter((text, index, list) => text && list.indexOf(text) === index)
    for (const text of candidates) {
      const located = locateEvidence(model, text)
      if (!located.boxes.length) continue
      fields.push({
        key: field.key,
        kind: kind === 'newerEvidence' ? 'newer' : 'evidence',
        name: field.name,
        text,
        boxes: located.boxes,
        ambiguous: located.ambiguous,
        partial: located.partial,
      })
      break
    }
  }
  return fields
}

/** OCR 行框已归一化；放大到固定像素空间后复用文本层匹配器（1px 内边距可忽略）。 */
const OCR_SCALE = 10000
function ocrPageModel(items) {
  return buildPageModel({
    width: OCR_SCALE,
    height: OCR_SCALE,
    items: items.map(item => ({
      str: String(item.text || ''),
      x: Number(item.x) * OCR_SCALE,
      y: Number(item.y) * OCR_SCALE,
      w: Number(item.w) * OCR_SCALE,
      h: Number(item.h) * OCR_SCALE,
      size: Math.max(1, Number(item.h) * OCR_SCALE),
    })),
  })
}

/** 证据框：优先文本层；无文本层（扫描件/图片）按页回退 OCR 并缓存。 */
export async function readReviewBoxes(stateDirectory, id, file, page) {
  const resolved = resolveReviewFile(stateDirectory, id, file)
  const pageNo = Math.max(1, Math.round(Number(page) || 1))
  const detail = readReviewDetail(stateDirectory, id)
  const targets = reviewTargets(detail, resolved.rel, pageNo)
  const empty = { file: resolved.rel, page: pageNo, hasTextLayer: false, source: 'none', fields: [] }
  if (!targets.length) return empty

  if (resolved.ext === '.pdf') {
    const extracted = await readPdfPageItems(resolved.full, pageNo)
    if (extracted?.items?.length) {
      return {
        file: resolved.rel,
        page: extracted.page,
        pageWidth: extracted.width,
        pageHeight: extracted.height,
        hasTextLayer: true,
        source: 'text',
        fields: locateTargets(targets, buildPageModel(extracted)),
      }
    }
  }

  const ocr = await readOcrBoxes({ stateDirectory, full: resolved.full, page: pageNo })
  if (!ocr.available) return { ...empty, ocr: { available: false, reason: ocr.reason } }
  return {
    file: resolved.rel,
    page: pageNo,
    hasTextLayer: false,
    source: 'ocr',
    ocr: { available: true, cached: ocr.cached, elapsed_s: ocr.elapsed_s },
    fields: locateTargets(targets, ocrPageModel(ocr.items)),
  }
}

/** 页面按需渲染并做小容量 LRU；返回 data URL，客户端只做显示，不落盘。 */
export async function readReviewPage({ stateDirectory, id, file, page, width } = {}) {
  const resolved = resolveReviewFile(stateDirectory, id, file)
  const ticket = resolved.ticket
  const rel = resolved.rel
  const full = resolved.full

  const pageNo = Math.max(1, Math.round(Number(page) || 1))
  const maxEdge = Math.round(Number(width) || 1600)
  const key = `${full}|${pageNo}|${maxEdge}`
  const cached = pageCache.get(key)
  if (cached) {
    pageCache.delete(key)
    pageCache.set(key, cached)
    return cached
  }

  const rendered = await renderDocumentPage(full, pageNo, { maxEdge })
  if (!rendered?.data) throw fail('ledger-review-preview-failed', '页面渲染失败')
  const dataUrl = `data:${rendered.mediaType};base64,${Buffer.from(rendered.data).toString('base64')}`
  let boxes = { file: rel, page: rendered.page, hasTextLayer: false, source: 'none', fields: [] }
  try { boxes = await readReviewBoxes(stateDirectory, ticket, rel, rendered.page) } catch {}
  const result = {
    file: rel,
    page: rendered.page,
    pages: rendered.pages,
    width: rendered.width,
    height: rendered.height,
    dataUrl,
    boxes,
  }
  pageCache.set(key, result)
  if (pageCache.size > PAGE_CACHE_LIMIT) pageCache.delete(pageCache.keys().next().value)
  return result
}
