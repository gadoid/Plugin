/**
 * Model-facing tools over the Atom Workbench.
 * `defineTool` and `call` are injected so this module stays testable without the Host runtime.
 */
const QUERY_ACTIONS = ['state', 'accounts', 'groups', 'records', 'directories', 'saved-folders']
const FILE_ACTIONS = ['save', 'extract', 'rename', 'delete']
const PREVIEW_ACTIONS = ['start', 'cancel', 'plan', 'confirm']
const SETTINGS_ACTIONS = ['save', 'clear']
const FILTER_FIELDS = ['groupId', 'keyword', 'order', 'status']
const DIRECTORY_FIELDS = ['groupId', 'keyword', 'directory', 'directoryOffset', 'directoryLimit', 'fileOffset', 'fileLimit']
const REVIEW_FIELDS = ['groupSelections', 'groupFolders', 'changes']
const SETTINGS_FIELDS = ['root', 'account', 'accountLabel', 'saveDirectory', 'savedIndexDays', 'defaultSavedFilter', 'autoExtract', 'extractNested', 'groups']

const render = (_args, value) => [{ type: 'text', text: JSON.stringify(value, null, 1) }]

/** The fws Remote method returns a JSON envelope; surface its code as a normal tool failure. */
export function createRemoteCall(remote) {
  return async payload => {
    const raw = await remote.request(JSON.stringify(payload))
    const envelope = JSON.parse(raw)
    if (envelope?.ok !== true) throw new Error(`atom: ${envelope?.code || 'request-failed'}`)
    return envelope.value
  }
}

function copyFields(source, keys, target) {
  for (const key of keys) if (source[key] !== undefined) target[key] = source[key]
  return target
}

/** Forward only the review arrays the caller supplied; the Workbench validates every entry. */
const reviewFields = args => copyFields(args, REVIEW_FIELDS, {})

/** The panel shows the full snapshot; the model only needs the job header and group summary. */
function trimSnapshot(snapshot) {
  const job = snapshot?.job || null
  return {
    settings: snapshot?.settings ?? null,
    today: snapshot?.today ?? null,
    defaultRoot: snapshot?.defaultRoot ?? null,
    sourceCapability: snapshot?.sourceCapability ?? null,
    job: job ? {
      id: job.id,
      status: job.status,
      phase: job.phase,
      operation: job.operation,
      mode: job.mode,
      reviewReady: job.reviewReady,
      previewStale: job.previewStale,
      recordCount: job.recordCount,
      matchedCount: job.matchedCount,
      counts: job.counts,
      saveDirectory: job.saveDirectory,
      groupSummaries: job.groupSummaries,
      extracting: job.extracting,
      extractSummary: job.extractSummary ?? null,
      warnings: Array.isArray(job.warnings) ? job.warnings.slice(0, 20) : [],
    } : null,
  }
}

/** Snapshot and mutation results carry the whole job for the panel; drop it from model-facing output. */
function trimMutation(action, jobId, value) {
  if (!value || typeof value !== 'object') return { action, jobId, value }
  const { snapshot, ...rest } = value
  return { action, jobId, ...rest }
}

export function createTools(defineTool, call) {
  const readState = () => call({ action: 'state' })

  // A tool call may omit jobId; the Workbench holds one current preview per profile.
  const resolveJob = async args => {
    if (typeof args.jobId === 'string' && args.jobId) return { jobId: args.jobId, snapshot: null }
    const snapshot = await readState()
    const jobId = snapshot?.job?.id
    if (!jobId) throw new Error('atom: no-preview')
    return { jobId, snapshot }
  }

  const query = async args => {
    if (!QUERY_ACTIONS.includes(args.action)) throw new Error('atom: invalid-action')
    if (args.action === 'state') return trimSnapshot(await readState())
    if (args.action === 'accounts') return call({ action: 'accounts', ...(args.root ? { root: args.root } : {}) })
    if (args.action === 'groups') {
      if (!args.root || !args.account) throw new Error('atom: root-account-required')
      return call({ action: 'groups', source: { root: args.root, account: args.account }, ...(args.name ? { name: args.name } : {}) })
    }
    const { jobId } = await resolveJob(args)
    if (args.action === 'records') {
      return call(copyFields(args, FILTER_FIELDS, {
        action: 'records',
        jobId,
        offset: args.offset ?? 0,
        limit: args.limit ?? 20,
      }))
    }
    if (args.action === 'directories') return call(copyFields(args, DIRECTORY_FIELDS, { action: 'directories', jobId }))
    if (!args.groupId) throw new Error('atom: group-id-required')
    return call({ action: 'saved-folders', jobId, groupId: args.groupId })
  }

  const file = async args => {
    if (!FILE_ACTIONS.includes(args.action)) throw new Error('atom: invalid-action')
    if (typeof args.recordId !== 'string' || !args.recordId) throw new Error('atom: record-id-required')
    if (args.action === 'rename' && (typeof args.name !== 'string' || !args.name)) throw new Error('atom: name-required')
    const { jobId, snapshot } = await resolveJob(args)
    if (args.action === 'extract') {
      return trimMutation('extract', jobId, await call({ action: 'zip-extract', jobId, recordId: args.recordId }))
    }
    if (args.action === 'delete') {
      return trimMutation('delete', jobId, await call({ action: 'file-delete', jobId, recordId: args.recordId }))
    }
    if (args.action === 'rename') {
      return trimMutation('rename', jobId, await call({ action: 'file-rename', jobId, recordId: args.recordId, name: args.name }))
    }
    let groupName = args.groupName
    if (groupName === undefined) {
      // The panel passes the group's archive folder; derive the same default for the tool.
      const scope = await call({ action: 'scope', jobId })
      const row = (scope?.records || []).find(item => item.id === args.recordId)
      if (!row) throw new Error('atom: record-not-found')
      const state = snapshot ?? await readState()
      const group = (state?.settings?.groups || []).find(item => item.id === row.groupId)
        || (state?.job?.groupSummaries || []).find(item => item.id === row.groupId)
      groupName = group?.folder ?? group?.folderName
      if (!groupName) throw new Error('atom: group-folder-required')
    }
    return trimMutation('save', jobId, await call({ action: 'save-row', jobId, recordId: args.recordId, groupName }))
  }

  const preview = async args => {
    if (!PREVIEW_ACTIONS.includes(args.action)) throw new Error('atom: invalid-action')
    if (args.action === 'start') {
      const state = await readState()
      const day = state?.today
      if (!day) throw new Error('atom: today-unavailable')
      return trimSnapshot(await call({
        action: 'start',
        mode: args.mode ?? 'bill',
        start: args.start || day,
        end: args.end || day,
      }))
    }
    if (args.action === 'cancel') return trimSnapshot(await call({ action: 'cancel' }))
    const { jobId } = await resolveJob(args)
    const review = reviewFields(args)
    if (args.action === 'plan') {
      const plan = await call({ action: 'plan', jobId, ...review })
      if (!Array.isArray(args.groupIds) || !args.groupIds.length) return plan
      const wanted = new Set(args.groupIds)
      const groups = (plan.groups || []).filter(group => wanted.has(group.id))
      return {
        ...plan,
        groups,
        selectedCount: groups.reduce((sum, group) => sum + (group.selectedCount || 0), 0),
        autoFolderCount: groups.reduce((sum, group) => sum + (group.autoFolderCount || 0), 0),
      }
    }
    // Archiving stays scoped to explicitly chosen groups, like the panel's confirmation dialog.
    if (!Array.isArray(args.groupIds) || !args.groupIds.length) throw new Error('atom: group-ids-required')
    return trimSnapshot(await call({
      action: 'confirm',
      jobId,
      groupIds: args.groupIds,
      ...(args.allowAutoFolders === true ? { allowAutoFolders: true } : {}),
      ...review,
    }))
  }

  const settings = async args => {
    if (!SETTINGS_ACTIONS.includes(args.action)) throw new Error('atom: invalid-action')
    const state = await readState()
    const current = state?.settings
    if (args.action === 'clear') {
      if (!current) throw new Error('atom: not-configured')
      return trimSnapshot(await call({ action: 'save', settings: current }))
    }
    // Saving settings clears the preview/result; make that side effect an explicit decision.
    if (state?.job && ['running', 'cancelling'].includes(state.job.status)) throw new Error('atom: job-running')
    if (state?.job && args.confirm !== true) throw new Error('atom: preview-will-be-cleared')
    const merged = copyFields(args, SETTINGS_FIELDS, { ...(current || {}) })
    if (typeof merged.root !== 'string' || !merged.root || typeof merged.account !== 'string' || !merged.account
      || typeof merged.saveDirectory !== 'string' || !merged.saveDirectory) throw new Error('atom: settings-required')
    return trimSnapshot(await call({ action: 'save', settings: merged }))
  }

  const queryTool = defineTool({
    name: 'wecom_atom_query',
    description: '查询 Atom 群文件工作台（dsh-atom）的当前状态与已保存文件。state=设置与预览任务总览；accounts=列账号；groups=按关键字列群；records=分页列当前预览的文件；directories=分页浏览已保存文件所在目录；saved-folders=列某群已用过的归档目录名。只读，不改磁盘。',
    parameters: {
      action: { type: 'string', enum: QUERY_ACTIONS, required: true, description: '查询类型' },
      jobId: { type: 'string', description: '预览任务 id；省略时使用当前任务' },
      root: { type: 'string', description: '企微数据根目录（accounts/groups）' },
      account: { type: 'string', description: '账号 id（groups）' },
      name: { type: 'string', description: '群名关键字（groups）' },
      groupId: { type: 'string', description: '群 id（records/directories/saved-folders）' },
      keyword: { type: 'string', description: '文件名或路径关键字' },
      order: { type: 'string', enum: ['asc', 'desc'], description: '按消息时间排序' },
      status: { type: 'string', enum: ['saved', 'unsaved'], description: '已保存或未保存' },
      offset: { type: 'integer', description: 'records 起始偏移，默认 0' },
      limit: { type: 'integer', description: 'records 条数，默认 20，最大 100' },
      directory: { type: 'string', description: 'directories 目标目录，省略时取第一页第一个' },
      directoryOffset: { type: 'integer', description: '目录分页偏移' },
      directoryLimit: { type: 'integer', description: '目录每页数量，默认 10，最大 100' },
      fileOffset: { type: 'integer', description: '目录内文件分页偏移' },
      fileLimit: { type: 'integer', description: '目录内文件每页数量，默认 10，最大 100' },
    },
    output: { schema: { type: 'json' }, render },
    isConcurrencySafe: args => args.action === 'state' || args.action === 'records' || args.action === 'directories' || args.action === 'saved-folders',
    execute: query,
  })

  const fileTool = defineTool({
    name: 'wecom_atom_file',
    description: '操作 Atom 群文件工作台里已保存的文件。save=把一份群附件复制到归档目录（企微原文件不动）；extract=解压已保存的 zip/rar 到所在目录；rename=重命名已保存副本；delete=删除已保存副本（企微原文件不动）。jobId 省略时使用当前预览任务；save 的 groupName 省略时按该群的归档目录。',
    parameters: {
      action: { type: 'string', enum: FILE_ACTIONS, required: true, description: '操作类型' },
      recordId: { type: 'string', required: true, description: '文件 id；解压产物形如 extracted:...' },
      jobId: { type: 'string', description: '预览任务 id；省略时使用当前任务' },
      groupName: { type: 'string', description: 'save 的目标子目录；省略时按群目录' },
      name: { type: 'string', description: 'rename 的新文件名' },
    },
    output: { schema: { type: 'json' }, render },
    execute: file,
  })

  const previewTool = defineTool({
    name: 'wecom_atom_preview',
    description: '驱动 Atom 群文件工作台的读取与归档任务。start=按设置生成预览（mode=bill 只读账单文件名，all=全部附件；默认今天；立即返回 running，用 state/records 轮询进度）；cancel=取消当前任务；plan=估算各群将归档的数量与自动命名目录数（只读）；confirm=按预览里的勾选批量归档到归档目录（企微原文件不动），必须显式给 groupIds，自动命名目录需 allowAutoFolders=true。confirm 也立即返回，结果用 state/records 查看。',
    parameters: {
      action: { type: 'string', enum: PREVIEW_ACTIONS, required: true, description: '任务动作' },
      mode: { type: 'string', enum: ['bill', 'all'], description: 'start 的读取范围：bill=账单文件名（默认），all=全部附件' },
      start: { type: 'string', description: 'start 起始：YYYY-MM-DD 或 YYYY-MM-DDTHH:MM；省略为今天' },
      end: { type: 'string', description: 'start 结束：YYYY-MM-DD 或 YYYY-MM-DDTHH:MM；省略为今天' },
      jobId: { type: 'string', description: '预览任务 id；省略时使用当前任务' },
      groupIds: { type: 'array', items: { type: 'string' }, description: 'confirm 必填，要归档的群 id 列表；plan 可选，用于只返回这些群' },
      allowAutoFolders: { type: 'boolean', description: 'confirm 时允许自动命名目录；plan 显示 autoFolderCount>0 时必须显式传 true' },
      groupSelections: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            groupId: { type: 'string', required: true, description: '群 id' },
            selected: { type: 'boolean', required: true, description: '整群勾选或取消' },
          },
        },
        description: '整群勾选；在 confirm 时生效',
      },
      groupFolders: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            groupId: { type: 'string', required: true, description: '群 id' },
            documentFolder: { type: 'string', required: true, description: '该群这次归档使用的子目录名' },
          },
        },
        description: '整群指定归档子目录；在 confirm 时生效',
      },
      changes: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            id: { type: 'string', required: true, description: '文件 id' },
            selected: { type: 'boolean', description: '勾选或取消该文件' },
            documentFolder: { type: 'string', description: '该文件的归档子目录名' },
          },
        },
        description: '逐文件勾选或指定子目录；selected 与 documentFolder 至少给一个',
      },
    },
    output: { schema: { type: 'json' }, render },
    execute: preview,
  })

  const settingsTool = defineTool({
    name: 'wecom_atom_settings',
    description: '读写 Atom 群文件工作台的配置（只改配置，不动文件）。save=保存配置：省略的字段沿用当前值，groups 传完整群列表（省略则沿用）；注意保存配置会清空当前预览与结果，已有任务时必须同时传 confirm=true。clear=清空当前预览/结果（不删归档文件，配置保持不变）。先用 wecom_atom_query 的 accounts/groups 找到账号与群 id。',
    parameters: {
      action: { type: 'string', enum: SETTINGS_ACTIONS, required: true, description: '配置动作' },
      confirm: { type: 'boolean', description: 'save 时确认清空当前预览/结果' },
      root: { type: 'string', description: '企微数据根目录；省略沿用当前值' },
      account: { type: 'string', description: '账号 id（纯数字）；省略沿用当前值' },
      accountLabel: { type: 'string', description: '账号显示名；传空字符串可清除' },
      saveDirectory: { type: 'string', description: '归档根目录（绝对路径）；改它会忘记已保存位置索引' },
      savedIndexDays: { type: 'integer', description: '已保存位置索引保留天数 1～365，默认 7' },
      defaultSavedFilter: { type: 'string', enum: ['unsaved', 'saved', 'all'], description: '读取后各群默认筛选' },
      autoExtract: { type: 'boolean', description: '保存后自动解压压缩包' },
      extractNested: { type: 'boolean', description: '自动解压时同时处理子压缩包' },
      groups: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: true,
          properties: {
            id: { type: 'string', required: true, description: '群 id' },
            name: { type: 'string', required: true, description: '群名' },
            folderName: { type: 'string', description: '保存子目录名；省略按群名生成' },
            sourceLabel: { type: 'string', description: '来源标识（可选）' },
          },
        },
        description: '完整群列表；省略沿用当前群。可直接传 state.settings.groups',
      },
    },
    output: { schema: { type: 'json' }, render },
    execute: settings,
  })

  return [queryTool, fileTool, previewTool, settingsTool]
}
