/**
 * Model-facing tools over the ledger: read the projection, inspect one ticket's
 * evidence, and write review values back through the same Host actions the panel uses.
 */
const READ_ACTIONS = ['state', 'ticket', 'dictionary', 'config', 'boxes', 'audit']
const EDIT_ACTIONS = ['recognize', 'ingest', 'values', 'confirm', 'reset', 'configure', 'export']
const AUDIT_KINDS = ['recognize', 'edit', 'confirm', 'reset', 'archive', 'migrate-local']
const MAX_CHANGES = 500
const MAX_ROWS = 5000

const render = (_args, value) => [{ type: 'text', text: JSON.stringify(value, null, 1) }]
const text = value => (typeof value === 'string' ? value.trim() : '')

function integer(value, fallback, min, max) {
  const number = Number(value)
  if (!Number.isInteger(number)) return fallback
  return Math.min(max, Math.max(min, number))
}

/** rows carry values as a positional array; keyed output is easier for the model to reason about. */
function keyedValues(columns, row) {
  const values = {}
  for (let index = 0; index < columns.length; index += 1) {
    values[columns[index].key] = row?.values?.[index] ?? ''
  }
  return values
}

function keyedRow(columns, row) {
  return { ...row, values: keyedValues(columns, row) }
}

function compactEvidence(evidence) {
  if (!evidence) return null
  return {
    raw: evidence.raw,
    evidence: evidence.evidence,
    page: evidence.page,
    source_file: evidence.source_file,
    document_type: evidence.document_type,
    selection_reason: evidence.selection_reason,
    confidence: evidence.confidence,
    method: evidence.method,
    status: evidence.status,
    doc: evidence.doc,
    alternatives: Array.isArray(evidence.alternatives) ? evidence.alternatives.slice(0, 3) : [],
  }
}

function compactDetail(detail) {
  const documents = Array.isArray(detail?.documents) ? detail.documents : []
  return {
    id: detail?.id || '',
    directory: detail?.directory || '',
    rev: Number.isInteger(detail?.rev) ? detail.rev : null,
    confirmedAt: Number(detail?.confirmedAt) || 0,
    documentCount: documents.length,
    documents: documents.slice(0, 50).map(doc => ({
      name: doc.name, rel: doc.rel, ext: doc.ext, previewable: doc.previewable,
    })),
    fields: (Array.isArray(detail?.fields) ? detail.fields : []).map(field => ({
      key: field.key,
      name: field.name,
      required: field.required === true,
      data_type: field.data_type || 'text',
      options: Array.isArray(field.options) ? field.options : [],
      value: field.value,
      review: field.review,
      stored: field.stored,
      evidence: compactEvidence(field.evidence),
      newerEvidence: compactEvidence(field.newerEvidence),
    })),
  }
}

function compactConfig(config) {
  if (!config) return null
  return {
    name: config.name,
    updatedAt: config.updatedAt,
    fieldsUpdatedAt: config.fieldsUpdatedAt,
    fields: (config.fields || []).map(field => ({
      key: field.key,
      name: field.name,
      data_type: field.data_type,
      required: field.required === true,
      nullable: field.nullable === true,
      options: Array.isArray(field.options) ? field.options : [],
    })),
    columns: (config.columns || []).map(column => ({
      key: column.key, label: column.label, source: column.source, frozen: column.frozen === true,
    })),
    exportExcluded: Array.isArray(config.exportExcluded) ? config.exportExcluded : [],
  }
}

function compactDictionary(dictionary) {
  return {
    version: dictionary?.version || '',
    customLimit: dictionary?.customLimit ?? null,
    fields: (Array.isArray(dictionary?.fields) ? dictionary.fields : []).map(field => ({
      key: field.key,
      name: field.name,
      data_type: field.data_type || 'text',
      required: field.required === true,
      nullable: field.nullable === true,
      options: Array.isArray(field.options) ? field.options : [],
      description: field.description || '',
    })),
  }
}

async function currentRev(call, args) {
  if (Number.isInteger(args.baseRev) && args.baseRev >= 0) return args.baseRev
  const state = await call({ action: 'ledger-state', offset: 0, limit: 1 })
  return Number.isInteger(state?.rev) ? state.rev : undefined
}

export function createLedgerTools(defineTool, call) {
  const read = async args => {
    if (!READ_ACTIONS.includes(args.action)) throw new Error('atom: invalid-action')
    if (args.action === 'state') {
      const state = await call({
        action: 'ledger-state',
        offset: integer(args.offset, 0, 0, MAX_ROWS),
        limit: integer(args.limit, 50, 1, MAX_ROWS),
      })
      return {
        configured: state?.configured === true,
        name: state?.name || '',
        rev: Number.isInteger(state?.rev) ? state.rev : null,
        total: Number(state?.total) || 0,
        offset: Number(state?.offset) || 0,
        limit: Number(state?.limit) || 0,
        columns: state?.columns || [],
        rows: (state?.rows || []).map(row => keyedRow(state.columns || [], row)),
        localCount: Number(state?.localCount) || 0,
        newerCount: Number(state?.newerCount) || 0,
        archivedTotal: Number(state?.archivedTotal) || 0,
        fieldCount: Number(state?.fieldCount) || 0,
        exportExcluded: Array.isArray(state?.exportExcluded) ? state.exportExcluded : [],
      }
    }
    if (args.action === 'ticket') {
      const id = text(args.id)
      if (!id) throw new Error('atom: ticket-id-required')
      return compactDetail(await call({ action: 'ledger-review-detail', id }))
    }
    if (args.action === 'dictionary') return compactDictionary(await call({ action: 'ledger-dictionary' }))
    if (args.action === 'config') {
      const value = await call({ action: 'ledger-config' })
      return { configured: Boolean(value?.config), config: compactConfig(value?.config) }
    }
    if (args.action === 'boxes') {
      const id = text(args.id)
      const file = text(args.file)
      if (!id) throw new Error('atom: ticket-id-required')
      if (!file) throw new Error('atom: file-required')
      return call({
        action: 'ledger-review-boxes',
        id,
        file,
        page: integer(args.page, 1, 1, 100000),
      })
    }
    const kind = text(args.kind)
    if (kind && !AUDIT_KINDS.includes(kind)) throw new Error('atom: invalid-kind')
    return call({
      action: 'ledger-audit',
      ...(text(args.ticket) ? { ticket: text(args.ticket) } : {}),
      ...(kind ? { kind } : {}),
      limit: integer(args.limit, 50, 1, 200),
    })
  }

  const edit = async args => {
    if (!EDIT_ACTIONS.includes(args.action)) throw new Error('atom: invalid-action')
    if (args.action === 'recognize') {
      const directory = text(args.directory)
      if (!directory) throw new Error('atom: directory-required')
      return call({ action: 'ledger-build', directory, force: args.force === true })
    }
    if (args.action === 'ingest') {
      const runId = text(args.runId)
      if (!runId) throw new Error('atom: run-id-required')
      return call({ action: 'ledger-ingest', runId })
    }
    if (args.action === 'values') {
      const input = Array.isArray(args.changes) ? args.changes : []
      if (!input.length || input.length > MAX_CHANGES) throw new Error('atom: changes-required')
      const changes = input.map((change) => {
        const id = text(change?.id)
        const key = text(change?.key)
        const value = change?.value
        if (!id || !key) throw new Error('atom: change-invalid')
        if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
          throw new Error('atom: change-value-invalid')
        }
        return { id, key, value }
      })
      const snapshot = await call({ action: 'ledger-state', offset: 0, limit: MAX_ROWS })
      const rows = Array.isArray(snapshot?.rows) ? snapshot.rows : []
      const complete = rows.length >= Number(snapshot?.total)
      const columns = Array.isArray(snapshot?.columns) ? snapshot.columns : []
      const effective = new Map(rows.map(row => [row.id, keyedValues(columns, row)]))
      const kept = []
      let skipped = 0
      for (const change of changes) {
        if (complete) {
          const values = effective.get(change.id)
          if (!values) throw new Error(`atom: ticket-not-found:${change.id}`)
          if (Object.prototype.hasOwnProperty.call(values, change.key)
            && String(values[change.key] ?? '') === String(change.value)) {
            skipped += 1
            continue
          }
        }
        kept.push(change)
      }
      if (!kept.length) return { action: 'values', rev: snapshot?.rev ?? null, count: 0, skipped, changed: false }
      const rev = Number.isInteger(args.baseRev)
        ? args.baseRev
        : (Number.isInteger(snapshot?.rev) ? snapshot.rev : undefined)
      const result = await call({
        action: 'ledger-review-save',
        ...(rev !== undefined ? { baseRev: rev } : {}),
        changes: kept,
      })
      return { action: 'values', ...result, skipped }
    }
    if (args.action === 'confirm') {
      const ids = (Array.isArray(args.ids) ? args.ids : []).map(text).filter(Boolean)
      if (!ids.length || ids.length > MAX_CHANGES) throw new Error('atom: ids-required')
      const rev = await currentRev(call, args)
      return call({ action: 'ledger-review-commit', ...(rev !== undefined ? { baseRev: rev } : {}), ids })
    }
    if (args.action === 'reset') {
      const id = text(args.id)
      const keys = Array.isArray(args.keys) ? args.keys.map(text).filter(Boolean) : []
      if ((!id || !keys.length) && args.confirm !== true) throw new Error('atom: confirm-required')
      const rev = await currentRev(call, args)
      return call({
        action: 'ledger-review-reset',
        ...(rev !== undefined ? { baseRev: rev } : {}),
        ...(id ? { id } : {}),
        ...(keys.length ? { keys } : {}),
      })
    }
    if (args.action === 'configure') {
      if (args.confirm !== true) throw new Error('atom: confirm-required')
      const fieldKeys = (Array.isArray(args.fieldKeys) ? args.fieldKeys : []).map(text).filter(Boolean)
      const customFields = Array.isArray(args.customFields) ? args.customFields : []
      let fields = Array.isArray(args.fields) ? args.fields : null
      if (fields && (fieldKeys.length || customFields.length)) throw new Error('atom: fields-conflict')
      if (!fields) {
        if (!fieldKeys.length && !customFields.length) throw new Error('atom: fields-required')
        const dictionary = await call({ action: 'ledger-dictionary' })
        const byKey = new Map((dictionary?.fields || []).map(field => [field.key, field]))
        const unknown = fieldKeys.filter(key => !byKey.has(key))
        if (unknown.length) throw new Error(`atom: unknown-field:${unknown.join(',')}`)
        fields = [
          ...fieldKeys.map(key => byKey.get(key)),
          ...customFields.map(field => ({ ...field, source: 'custom' })),
        ]
      }
      const name = text(args.name)
      const columns = Array.isArray(args.columns) ? args.columns : undefined
      const value = await call({
        action: 'ledger-configure',
        ...(name ? { name } : {}),
        fields,
        ...(columns ? { columns } : {}),
      })
      return { config: compactConfig(value?.config) }
    }
    const exclude = (Array.isArray(args.exclude) ? args.exclude : []).map(text).filter(Boolean)
    return call({ action: 'ledger-export', ...(exclude.length ? { exclude } : {}) })
  }

  const readTool = defineTool({
    name: 'wecom_atom_ledger',
    description: '只读查询 dsh-atom 台账与核对数据。state=分页读台账行列（含完整度、核对状态、待处理新值）；ticket=读一票的全部字段、复核值、识别来源与证据（单证/页码/原文）；dictionary=列可用于建台账的内置字段；config=当前台账的字段、列与导出排除项；boxes=取某字段在某单证某页的证据框（归一化坐标，只有文本层或 OCR 可用时才有）；audit=读追加式审计（编辑/确认/撤销/入库）。不改任何数据。',
    parameters: {
      action: { type: 'string', enum: READ_ACTIONS, required: true, description: '查询类型' },
      id: { type: 'string', description: '票 ID（ticket/boxes）' },
      file: { type: 'string', description: '票目录内的相对文件名（boxes）' },
      page: { type: 'integer', description: '页码，默认 1（boxes）' },
      offset: { type: 'integer', description: 'state 行偏移，默认 0' },
      limit: { type: 'integer', description: 'state 行数默认 50、最大 5000；audit 事件数默认 50、最大 200' },
      ticket: { type: 'string', description: '按票过滤审计事件（audit）' },
      kind: {
        type: 'string',
        enum: AUDIT_KINDS,
        description: '按事件类型过滤（audit）',
      },
    },
    output: { schema: { type: 'json' }, render },
    isConcurrencySafe: () => true,
    execute: read,
  })

  const editTool = defineTool({
    name: 'wecom_atom_ledger_edit',
    description: '修改 dsh-atom 台账。recognize=把一票的归档目录送去识别并入库（一个目录=一票；force 强制重跑；返回任务头，用 wecom_atom_order status 轮询）；ingest=按 runId 幂等补写入库；values=写人工复核值（只允许当前台账已选字段与来源群/归档日期，票 ID/目录/时间/文件数/完整度/状态只读；改任何一格都会撤销已核对）；confirm=把票标记为已核对（必须显式给 ids）；reset=撤销复核值（整票或整表需 confirm=true）；configure=重建台账字段/列（需 confirm=true；改字段会让存量行变待重识别，但不会删除识别值）；export=导出 xlsx 到状态目录 exports。写操作默认先读当前 rev 作 baseRev，冲突会返回 ledger-conflict。',
    parameters: {
      action: { type: 'string', enum: EDIT_ACTIONS, required: true, description: '写操作类型' },
      directory: { type: 'string', description: '归档目录绝对路径，一个目录=一票（recognize）' },
      force: { type: 'boolean', description: 'recognize 时忽略文件指纹强制重跑' },
      runId: { type: 'string', description: '识别任务 id（ingest）' },
      changes: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            id: { type: 'string', required: true, description: '票 ID' },
            key: { type: 'string', required: true, description: '列 key（字段 key 或 group/day）' },
            value: {
              oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
              description: '新值；空字符串表示清空该格',
            },
          },
        },
        description: '批量复核值，最多 500 格；与原值相同的格子会跳过，避免无谓撤销核对',
      },
      ids: {
        type: 'array',
        items: { type: 'string' },
        description: 'confirm 要标记为已核对的票 ID 列表',
      },
      id: { type: 'string', description: 'reset 的目标票 ID；省略时撤销整表（需 confirm=true）' },
      keys: {
        type: 'array',
        items: { type: 'string' },
        description: 'reset 的字段 key 列表；省略时撤销该票全部字段（需 confirm=true）',
      },
      baseRev: { type: 'integer', description: '台账 rev；省略时自动读取当前值' },
      confirm: { type: 'boolean', description: 'reset/configure 的风险确认' },
      name: { type: 'string', description: 'configure 的台账名称' },
      fields: {
        type: 'array',
        items: { type: 'object', additionalProperties: true },
        description: 'configure 的完整字段定义；与 fieldKeys/customFields 二选一（高级用法）',
      },
      fieldKeys: {
        type: 'array',
        items: { type: 'string' },
        description: 'configure 选中的内置字段 key；可先用 wecom_atom_ledger action=dictionary 查看',
      },
      customFields: {
        type: 'array',
        items: { type: 'object', additionalProperties: true },
        description: 'configure 的自定义字段定义（name/data_type/required/options）',
      },
      columns: {
        type: 'array',
        items: { type: 'object', additionalProperties: true },
        description: 'configure 的列顺序/宽窄；省略时按票 ID、字段、归档信息自动生成',
      },
      exclude: {
        type: 'array',
        items: { type: 'string' },
        description: 'export 时排除的列 key；省略使用当前配置',
      },
    },
    output: { schema: { type: 'json' }, render },
    execute: edit,
  })

  return [readTool, editTool]
}
