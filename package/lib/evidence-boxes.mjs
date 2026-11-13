/**
 * 证据框：把识别证据原文在文本层里定位成归一化矩形。
 * 模型只给原文和页码，坐标由本地文本层匹配得到；扫描件没有文本层时不画框。
 */

const MAX_BOXES = 8
const MAX_OCCURRENCES = 6

const squeeze = value => String(value ?? '').replace(/\s+/g, ' ').trim()

/** OCR 常把标点识别成全角，还可能在缩写后补点；紧凑匹配统一成单一分隔符并折叠连续分隔。 */
const SEPARATORS = new Set(['.', ':', ';', ',', '、', '，', '：', '；', '。'])
const FULLWIDTH = { '（': '(', '）': ')', '－': '-', '％': '%', '／': '/' }
const compactChar = ch => (SEPARATORS.has(ch) ? ':' : (FULLWIDTH[ch] || ch))

function compactText(value) {
  let out = ''
  for (const ch of String(value ?? '').replace(/\s+/g, '')) {
    const next = compactChar(ch).toLowerCase()
    if (next === ':' && out.endsWith(':')) continue
    out += next
  }
  return out
}

function verticalOverlap(a, b) {
  const top = Math.max(a.y, b.y)
  const bottom = Math.min(a.y + a.h, b.y + b.h)
  if (bottom <= top) return 0
  return (bottom - top) / Math.max(1, Math.min(a.h, b.h))
}

/** 按内容顺序拼接整页文本，并保留每个字符来自哪个词框。 */
export function buildPageModel(page) {
  const items = Array.isArray(page?.items) ? page.items : []
  const width = Number(page?.width) || 0
  const height = Number(page?.height) || 0
  let text = ''
  let textLower = ''
  let compact = ''
  const owners = []
  const compactOwners = []
  const boxes = []
  let line = -1
  let previous = null

  const push = (ch, owner) => {
    const char = /\s/.test(ch) ? ' ' : ch
    if (char === ' ' && (!text || text.endsWith(' '))) return
    text += char
    textLower += char.toLowerCase()
    owners.push(owner)
    if (char !== ' ') {
      const next = compactChar(char).toLowerCase()
      if (next === ':' && compact.endsWith(':')) return
      compact += next
      compactOwners.push(owner)
    }
  }

  items.forEach((item, index) => {
    if (!item?.str) return
    if (!previous) line = 0
    else if (item.eol === true || verticalOverlap(previous, item) < 0.4) line += 1
    const box = {
      x: item.x, y: item.y, w: item.w, h: item.h,
      line, size: Number(item.size) || item.h || 1,
    }
    if (previous && line === previous.line) {
      const gap = item.x - (previous.x + previous.w)
      const threshold = Math.max(1, Math.min(box.size, previous.size) * 0.2)
      if (gap > threshold) push(' ', -1)
    } else if (text && !text.endsWith(' ')) push(' ', -1)
    for (const ch of String(item.str)) push(ch, index)
    boxes[index] = box
    previous = box
  })

  return { width, height, text, textLower, compact, owners, compactOwners, boxes }
}

function findRanges(haystack, needle) {
  const out = []
  if (!needle) return out
  let from = 0
  while (out.length < MAX_OCCURRENCES) {
    const at = haystack.indexOf(needle, from)
    if (at < 0) break
    out.push([at, at + needle.length])
    from = at + Math.max(1, needle.length)
  }
  return out
}

function unionBoxes(model, ownerList, start, end) {
  const picked = new Map()
  const limit = Math.min(end, ownerList.length)
  for (let i = Math.max(0, start); i < limit; i++) {
    const owner = ownerList[i]
    if (owner >= 0 && !picked.has(owner)) picked.set(owner, model.boxes[owner])
  }
  const byLine = new Map()
  for (const box of picked.values()) {
    const group = byLine.get(box.line)
    if (!group) { byLine.set(box.line, { x: box.x, y: box.y, w: box.w, h: box.h }); continue }
    const left = Math.min(group.x, box.x)
    const top = Math.min(group.y, box.y)
    const right = Math.max(group.x + group.w, box.x + box.w)
    const bottom = Math.max(group.y + group.h, box.y + box.h)
    group.x = left
    group.y = top
    group.w = right - left
    group.h = bottom - top
  }
  return [...byLine.values()]
}

function toUnit(box, width, height) {
  const pad = 1
  const left = Math.max(0, box.x - pad)
  const y = Math.max(0, box.y - pad)
  const right = Math.min(width, box.x + box.w + pad)
  const bottom = Math.min(height, box.y + box.h + pad)
  return {
    x: Number((left / width).toFixed(4)),
    y: Number((y / height).toFixed(4)),
    w: Number(((right - left) / width).toFixed(4)),
    h: Number(((bottom - y) / height).toFixed(4)),
  }
}

const EMPTY = { boxes: [], ambiguous: false, partial: false, matched: '' }

/** 先按整段原文匹配，再退到去空白匹配，最后退到最长词串。 */
export function locateEvidence(model, evidence) {
  if (!model?.width || !model?.height || !model?.text) return EMPTY
  const needle = squeeze(evidence)
  if (needle.length < 2) return EMPTY

  let ranges = findRanges(model.textLower, needle.toLowerCase())
  let ownerList = model.owners
  if (!ranges.length) {
    const compactNeedle = compactText(needle)
    if (compactNeedle.length >= 2) {
      ranges = findRanges(model.compact, compactNeedle)
      ownerList = model.compactOwners
    }
  }

  let partial = false
  if (!ranges.length) {
    const tokens = needle.split(' ').filter(Boolean)
    search: for (let size = Math.min(tokens.length, 8); size >= 1; size--) {
      for (let start = 0; start + size <= tokens.length; start++) {
        const key = compactText(tokens.slice(start, start + size).join(''))
        if (key.length < (size === 1 ? 4 : 3)) continue
        const found = findRanges(model.compact, key)
        if (found.length) {
          ranges = found
          ownerList = model.compactOwners
          partial = true
          break search
        }
      }
    }
  }
  if (!ranges.length) return EMPTY

  const boxes = []
  const seen = new Set()
  for (const [start, end] of ranges) {
    for (const box of unionBoxes(model, ownerList, start, end)) {
      const unit = toUnit(box, model.width, model.height)
      const key = `${unit.x}:${unit.y}:${unit.w}:${unit.h}`
      if (seen.has(key)) continue
      seen.add(key)
      boxes.push(unit)
      if (boxes.length >= MAX_BOXES) break
    }
    if (boxes.length >= MAX_BOXES) break
  }
  return { boxes, ambiguous: ranges.length > 1, partial, matched: needle }
}
