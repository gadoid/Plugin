import fs from 'node:fs'
import path from 'node:path'
import { defineTool } from '@deepseek-ai/dsh-tools'
import WecomFiles from './lib/service.js'
import { createRemoteCall, createTools } from './lib/tools.mjs'
import { createOrderTools } from './lib/order-tools.mjs'
import { OrderRunner, builtinDictionary, CUSTOM_FIELD_LIMIT, DICTIONARY_VERSION, exportLedgerSheet, readExtraction } from './lib/order/host.bundle.mjs'
import { LEDGER_MAX_LIMIT, ledgerState } from './lib/ledger-source.mjs'
import { readLedgerView, saveLedgerView } from './lib/ledger-view-state.mjs'
import { readLedgerLocal, resetLedgerLocal, saveLedgerLocal } from './lib/ledger-local.mjs'
import {
  migrateLedgerLocal, readLedgerConfig, resetLedgerReview, restoreLegacyLayout, saveLedgerReview,
  setLedgerExportExcluded, upsertLedgerFromExtraction, writeLedgerConfig,
} from './lib/ledger-store.mjs'

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
    if (value?.action === 'ledger-state') {
      const stateDirectory = this.workbench.config.stateDirectory
      try {
        restoreLegacyLayout(stateDirectory)
        const local = readLedgerLocal(stateDirectory)
        return JSON.stringify({ ok: true, value: { ...ledgerState({ stateDirectory, offset: value.offset, limit: value.limit, local }), view: readLedgerView(stateDirectory) } })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-failed' })
      }
    }
    if (value?.action === 'ledger-dictionary') {
      try {
        return JSON.stringify({ ok: true, value: { version: DICTIONARY_VERSION, fields: builtinDictionary().fields, customLimit: CUSTOM_FIELD_LIMIT } })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-dictionary-failed' })
      }
    }
    if (value?.action === 'ledger-config') {
      try {
        return JSON.stringify({ ok: true, value: { config: readLedgerConfig(this.workbench.config.stateDirectory) } })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-config-failed' })
      }
    }
    if (value?.action === 'ledger-configure') {
      try {
        const config = writeLedgerConfig(this.workbench.config.stateDirectory, {
          name: value.name, fields: value.fields, columns: value.columns,
        })
        return JSON.stringify({ ok: true, value: { config } })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-config-failed', message: error.message })
      }
    }
    if (value?.action === 'ledger-review-save') {
      try {
        return JSON.stringify({ ok: true, value: saveLedgerReview(this.workbench.config.stateDirectory, { baseRev: value.baseRev, changes: value.changes }) })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-review-failed', currentRev: error.currentRev })
      }
    }
    if (value?.action === 'ledger-review-reset') {
      try {
        return JSON.stringify({ ok: true, value: resetLedgerReview(this.workbench.config.stateDirectory, { baseRev: value.baseRev, id: value.id, keys: value.keys }) })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-review-failed', currentRev: error.currentRev })
      }
    }
    if (value?.action === 'ledger-migrate-local') {
      try {
        return JSON.stringify({ ok: true, value: migrateLedgerLocal(this.workbench.config.stateDirectory) })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-migrate-failed' })
      }
    }
    if (value?.action === 'ledger-build') {
      try {
        const stateDirectory = this.workbench.config.stateDirectory
        const config = readLedgerConfig(stateDirectory)
        if (!config) return JSON.stringify({ ok: false, code: 'ledger-unconfigured' })
        const job = await this.orders.build(value.directory, {
          force: value.force === true, fields: config.fields, mode: 'ledger', exportOrder: false,
        })
        return JSON.stringify({ ok: true, value: { job } })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-build-failed' })
      }
    }
    if (value?.action === 'ledger-ingest') {
      try {
        const stateDirectory = this.workbench.config.stateDirectory
        const extraction = await readExtraction(stateDirectory, value.runId)
        if (!extraction) return JSON.stringify({ ok: false, code: 'ledger-extraction-missing' })
        return JSON.stringify({ ok: true, value: upsertLedgerFromExtraction(stateDirectory, extraction) })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-ingest-failed' })
      }
    }
    if (value?.action === 'ledger-export') {
      try {
        const stateDirectory = this.workbench.config.stateDirectory
        const excluded = setLedgerExportExcluded(stateDirectory, value.exclude)
        const state = ledgerState({ stateDirectory, offset: 0, limit: LEDGER_MAX_LIMIT })
        const indexByKey = new Map(state.columns.map((column, index) => [column.key, index]))
        const columns = state.columns.filter(column => !excluded.includes(column.key))
        if (!columns.length) return JSON.stringify({ ok: false, code: 'ledger-export-empty' })
        const rows = state.rows.map(row => columns.map(column => row.values[indexByKey.get(column.key)]))
        const directory = path.join(stateDirectory, 'exports')
        fs.mkdirSync(directory, { recursive: true })
        const exportPath = path.join(directory, `台账_${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`)
        await exportLedgerSheet({ columns, rows, exportPath })
        return JSON.stringify({ ok: true, value: { path: exportPath, rows: rows.length, columns: columns.map(column => column.key) } })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-export-failed', message: error.message })
      }
    }
    if (value?.action === 'ledger-local-save') {
      try {
        return JSON.stringify({ ok: true, value: saveLedgerLocal(this.workbench.config.stateDirectory, value.changes) })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-local-failed' })
      }
    }
    if (value?.action === 'ledger-local-reset') {
      try {
        return JSON.stringify({ ok: true, value: resetLedgerLocal(this.workbench.config.stateDirectory) })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-local-failed' })
      }
    }
    if (value?.action === 'ledger-view-save') {
      try {
        return JSON.stringify({ ok: true, value: saveLedgerView(this.workbench.config.stateDirectory, value.view) })
      } catch (error) {
        return JSON.stringify({ ok: false, code: error.code || 'ledger-view-failed' })
      }
    }
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
