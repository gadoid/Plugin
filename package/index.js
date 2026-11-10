import path from 'node:path'
import { defineTool } from '@deepseek-ai/dsh-tools'
import WecomFiles from './lib/service.js'
import { createRemoteCall, createTools } from './lib/tools.mjs'
import { createOrderTools } from './lib/order-tools.mjs'
import { OrderRunner } from './lib/order/host.bundle.mjs'

/** Atom = archive workbench + archive-to-order pipeline sharing one request surface. */
export default class Atom extends WecomFiles {
  static inject = ['subprocess', 'tools']

  constructor(ctx, config) {
    super(ctx, config)
    this.orders = new OrderRunner({ ctx, stateDirectory: this.workbench.config.stateDirectory })
    ctx.effect(() => () => this.orders.dispose())
    const call = createRemoteCall(this)
    for (const tool of createTools(defineTool, call)) ctx.tools.register(tool)
    for (const tool of createOrderTools(defineTool, call)) ctx.tools.register(tool)
  }

  async request(payload) {
    let value
    try { value = JSON.parse(payload) } catch { return JSON.stringify({ ok: false, code: 'invalid-request' }) }
    if (typeof value?.action === 'string' && value.action.startsWith('order-')) {
      try {
        return JSON.stringify({ ok: true, value: await this.orderAction(value) })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'order-failed' })
      }
    }
    const confirming = value?.action === 'confirm'
    const startedAt = Date.now()
    const result = await super.request(payload)
    if (confirming) {
      try {
        if (JSON.parse(result)?.ok) {
          const dirs = this.recentSavedDirectories(startedAt)
          if (dirs.length) this.orders.scheduleAfterArchive(dirs).catch(() => {})
        }
      } catch { /* A failed auto-build must never fail the archive result. */ }
    }
    return result
  }

  async orderAction(request) {
    if (request.action === 'order-config') {
      const config = await this.orders.configure(request.patch || {})
      return { config }
    }
    if (request.action === 'order-state') {
      return { ...(await this.orders.state()), directories: this.archiveDirectories() }
    }
    if (request.action === 'order-scan') {
      return this.orders.scan(request.directory)
    }
    if (request.action === 'order-build') {
      return { job: await this.orders.build(request.directory, { force: request.force === true }) }
    }
    if (request.action === 'order-cancel') {
      return { job: await this.orders.cancel(request.directory) }
    }
    throw Object.assign(new Error('invalid order action'), { code: 'invalid-action' })
  }

  /** Archive folders touched by the save that just finished; auto-order only looks here. */
  recentSavedDirectories(since) {
    const entries = Object.values(this.workbench.savedIndex?.entries || {})
    const dirs = new Set()
    for (const entry of entries) {
      if (typeof entry?.path !== 'string' || !Number.isFinite(entry.savedAt)) continue
      if (entry.savedAt < since - 5000) continue
      dirs.add(path.dirname(entry.path))
    }
    return [...dirs]
  }

  /** Panels list the folders files actually landed in, newest first. */
  archiveDirectories() {
    const map = new Map()
    for (const entry of Object.values(this.workbench.savedIndex?.entries || {})) {
      if (typeof entry?.path !== 'string' || !Number.isFinite(entry.savedAt)) continue
      const directory = path.dirname(entry.path)
      const key = process.platform === 'win32' ? directory.toLowerCase() : directory
      const item = map.get(key) || { directory, fileCount: 0, lastSavedAt: 0 }
      item.fileCount += 1
      item.lastSavedAt = Math.max(item.lastSavedAt, entry.savedAt)
      map.set(key, item)
    }
    return [...map.values()].sort((a, b) => b.lastSavedAt - a.lastSavedAt).slice(0, 100)
  }
}
