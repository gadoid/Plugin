/** Model-facing tools for the archive-to-order pipeline; the panel calls the same order-* actions. */
const ORDER_ACTIONS = ['build', 'scan', 'status', 'cancel', 'config']
const CONFIG_FIELDS = ['autoOrder', 'multimodal', 'outputFolder', 'maxDocChars', 'llmTimeoutMs', 'model', 'provider']
const OCR_FIELDS = ['maxPages', 'pdfScale', 'timeoutMs', 'dualChannel']
const render = (_args, value) => [{ type: 'text', text: JSON.stringify(value, null, 1) }]

function configPatch(args) {
  const patch = {}
  for (const key of CONFIG_FIELDS) if (args[key] !== undefined) patch[key] = args[key]
  if (args.ocr && typeof args.ocr === 'object') {
    const ocr = {}
    for (const key of OCR_FIELDS) if (args.ocr[key] !== undefined) ocr[key] = args.ocr[key]
    if (Object.keys(ocr).length) patch.ocr = ocr
  }
  if (Array.isArray(args.modelFallbacks)) patch.modelFallbacks = args.modelFallbacks
  return patch
}

export function createOrderTools(defineTool, call) {
  const order = async args => {
    if (!ORDER_ACTIONS.includes(args.action)) throw new Error('atom: invalid-action')
    if (args.action === 'status') return call({ action: 'order-state' })
    if (args.action === 'config') {
      const patch = configPatch(args)
      // No config keys means a read, matching the previous patch-only behavior.
      if (!Object.keys(patch).length) return call({ action: 'order-config' })
      if ((patch.model !== undefined || patch.provider !== undefined || patch.modelFallbacks !== undefined)
        && args.confirm !== true) throw new Error('atom: confirm-required')
      return call({ action: 'order-config', patch })
    }
    const directory = typeof args.directory === 'string' ? args.directory.trim() : ''
    if (!directory) throw new Error('atom: directory-required')
    if (args.action === 'scan') return call({ action: 'order-scan', directory })
    if (args.action === 'build') return call({ action: 'order-build', directory, force: args.force === true })
    return call({ action: 'order-cancel', directory })
  }

  const orderTool = defineTool({
    name: 'wecom_atom_order',
    description: '把已归档的一票单据（一个目录）识别成订单并导出 Excel。目录=一票：选中目录后递归读取其中的 PDF/Word/Excel/图片单据，用当前默认模型提取字段，输出到「目录/_orders/订单_目录名_时间.xlsx」。扫描件/图片会渲染后交给视觉模型，需要默认模型支持图片。build=开始建单（force=true 时忽略指纹强制重跑）；scan=只扫描目录不建单；status=列最近归档目录、建单配置与各目录任务状态；cancel=取消；config=读写建单配置（不传配置字段时只读）。返回字段含 completeness（必填完整度）、missing（缺失必填）、issues（业务校验提示）。台账识别共用这份配置。',
    parameters: {
      action: { type: 'string', enum: ORDER_ACTIONS, required: true, description: '建单动作' },
      directory: { type: 'string', description: '归档目录绝对路径（build/scan/cancel）' },
      force: { type: 'boolean', description: 'build 时忽略文件指纹强制重建' },
      autoOrder: { type: 'boolean', description: '归档完成后自动建单' },
      multimodal: { type: 'boolean', description: '把扫描件/图片页面交给视觉模型' },
      outputFolder: { type: 'string', description: '输出子目录名，默认 _orders' },
      ocr: {
        type: 'object',
        additionalProperties: false,
        description: '扫描件渲染参数；省略的键沿用当前值',
        properties: {
          maxPages: { type: 'integer', description: '单份单据最多渲染页数 1–200' },
          pdfScale: { type: 'integer', description: 'PDF 渲染倍率 1–6' },
          timeoutMs: { type: 'integer', description: 'OCR/渲染超时毫秒 1000–3600000' },
          dualChannel: { type: 'string', enum: ['quality', 'always', 'off'], description: '文本与图片双通道策略' },
        },
      },
      maxDocChars: { type: 'integer', description: '单份文档交给模型的字符上限 2000–200000' },
      llmTimeoutMs: { type: 'integer', description: '模型调用超时毫秒 10000–3600000' },
      model: { type: 'string', description: '识别模型名；空字符串表示用默认模型。修改需 confirm=true' },
      provider: { type: 'string', description: '模型提供方；修改需 confirm=true' },
      modelFallbacks: {
        type: 'array',
        items: { type: 'string' },
        description: '模型失败时的回退列表，最多 5 个；修改需 confirm=true',
      },
      confirm: { type: 'boolean', description: '修改 model/provider/modelFallbacks 时的风险确认' },
    },
    output: { schema: { type: 'json' }, render },
    execute: order,
  })

  return [orderTool]
}
