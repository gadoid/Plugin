/**
 * 扫描件行框：无文本层时调用本地 RapidOCR（独立 Python 环境），
 * 结果按「文件内容哈希 + 页码」缓存到台账状态目录，坐标归一化到 0..1。
 * 解释器由 DSH_OCR_PYTHON 指定；未配置或执行失败时返回结构化原因，由调用方降级。
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ENGINE = fileURLToPath(new URL('./ocr/engine.py', import.meta.url))
const TIMEOUT = 120_000
const CACHE_VERSION = 1
const CACHE_DIR = 'ocr-cache'

export function ocrPython() {
  return String(process.env.DSH_OCR_PYTHON || '').trim()
}

const hashCache = new Map()
function fileHash(full) {
  const stat = fs.statSync(full)
  const key = `${full}|${stat.size}|${stat.mtimeMs}`
  const hit = hashCache.get(key)
  if (hit) return hit
  const hash = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex').slice(0, 32)
  hashCache.set(key, hash)
  if (hashCache.size > 64) hashCache.delete(hashCache.keys().next().value)
  return hash
}

export function ocrCachePath(stateDirectory, full, page) {
  return path.join(stateDirectory, CACHE_DIR, `${fileHash(full)}-p${page}.json`)
}

function readCache(file) {
  try {
    const cached = JSON.parse(fs.readFileSync(file, 'utf8'))
    if (cached?.version !== CACHE_VERSION || !Array.isArray(cached.items)) return null
    return cached
  } catch {
    return null
  }
}

function writeCache(file, payload) {
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true })
    const tmp = `${file}.tmp`
    fs.writeFileSync(tmp, JSON.stringify(payload))
    fs.renameSync(tmp, file)
  } catch {}
}

function runEngine(python, input, page) {
  return new Promise((resolve) => {
    let settled = false
    let stdout = ''
    let stderr = ''
    const finish = (payload) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve(payload)
    }
    const child = spawn(python, [ENGINE, '--input', input, '--page', String(page)], {
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    })
    const timer = setTimeout(() => {
      try { child.kill() } catch {}
      finish({ ok: false, error: 'timeout' })
    }, TIMEOUT)
    child.stdout.on('data', (chunk) => { stdout += String(chunk) })
    child.stderr.on('data', (chunk) => { stderr += String(chunk) })
    child.on('error', (error) => finish({ ok: false, error: 'spawn_failed', detail: error.message }))
    child.on('close', () => {
      const line = stdout.trim().split('\n').filter(Boolean).pop() || ''
      try {
        finish(JSON.parse(line))
      } catch {
        finish({ ok: false, error: 'invalid_output', detail: (stderr || line).trim().slice(-300) })
      }
    })
  })
}

let active = 0
const waiting = []
function withSlot(task) {
  return new Promise((resolve, reject) => {
    const run = () => {
      active += 1
      task().then(resolve, reject).finally(() => {
        active -= 1
        const next = waiting.shift()
        if (next) next()
      })
    }
    if (active < 1) run()
    else waiting.push(run)
  })
}

/**
 * @returns {{available: true, items: Array<{x:number,y:number,w:number,h:number,text:string,conf:number}>, width:number, height:number, cached:boolean, elapsed_s:number}}
 *        | {{available: false, reason: string, detail?: string}}
 */
export async function readOcrBoxes({ stateDirectory, full, page } = {}) {
  const pageNo = Math.max(1, Math.round(Number(page) || 1))
  let cacheFile = ''
  try {
    cacheFile = ocrCachePath(stateDirectory, full, pageNo)
  } catch {
    return { available: false, reason: 'read-failed' }
  }
  // 缓存先于解释器检查：已经识别过的页在环境变量被移除后仍可显示。
  const cached = readCache(cacheFile)
  if (cached) {
    return {
      available: true,
      cached: true,
      items: cached.items,
      width: Number(cached.width) || 0,
      height: Number(cached.height) || 0,
      elapsed_s: Number(cached.elapsed_s) || 0,
    }
  }
  const python = ocrPython()
  if (!python) return { available: false, reason: 'no-python' }
  if (!fs.existsSync(ENGINE)) return { available: false, reason: 'engine-missing' }

  const result = await withSlot(() => runEngine(python, full, pageNo))
  if (!result.ok) return { available: false, reason: String(result.error || 'failed'), detail: String(result.detail || '') }

  const payload = {
    version: CACHE_VERSION,
    page: pageNo,
    width: Number(result.width) || 0,
    height: Number(result.height) || 0,
    elapsed_s: Number(result.elapsed_s) || 0,
    created_at: Date.now(),
    items: Array.isArray(result.items) ? result.items : [],
  }
  writeCache(cacheFile, payload)
  return { available: true, cached: false, items: payload.items, width: payload.width, height: payload.height, elapsed_s: payload.elapsed_s }
}
