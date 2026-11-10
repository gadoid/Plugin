/** Model-facing tools for the archive-to-order pipeline; the panel calls the same order-* actions. */
const ORDER_ACTIONS = ['build', 'scan', 'status', 'cancel', 'config']
const render = (_args, value) => [{ type: 'text', text: JSON.stringify(value, null, 1) }]

export function createOrderTools(defineTool, call) {
  const order = async args => {
    if (!ORDER_ACTIONS.includes(args.action)) throw new Error('atom: invalid-action')
    if (args.action === 'status') return call({ action: 'order-state' })
    if (args.action === 'config') {
      return call({ action: 'order-config', ...(args.patch && typeof args.patch === 'object' ? { patch: args.patch } : {}) })
    }
    if (typeof args.directory !== 'string' || !args.directory) throw new Error('atom: directory-required')
    if (args.action === 'scan') return call({ action: 'order-scan', directory: args.directory })
    if (args.action === 'build') return call({ action: 'order-build', directory: args.directory, force: args.force === true })
    return call({ action: 'order-cancel', directory: args.directory })
  }

  const orderTool = defineTool({
    name: 'wecom_atom_order',
    description: '把已归档的一票单据（一个目录）识别成订单并导出 Excel。目录=一票：选中目录后递归读取其中的 PDF/Word/Excel/图片单据，用当前默认模型提取字段，输出到「目录/_orders/订单_目录名_时间.xlsx」。扫描件/图片会渲染后交给视觉模型，需要默认模型支持图片。build=开始建单（force=true 时忽略指纹强制重跑）；scan=只扫描目录不建单；status=列最近归档目录与建单状态；cancel=取消；config=读写建单配置（autoOrder 归档后自动建单、multimodal、ocr、model 等）。返回字段含 completeness（必填完整度）、missing（缺失必填）、issues（业务校验提示）。',
    parameters: {
      action: { type: 'string', enum: ORDER_ACTIONS, required: true, description: '建单动作' },
      directory: { type: 'string', description: '归档目录绝对路径（build/scan/cancel）' },
      force: { type: 'boolean', description: 'build 时忽略文件指纹强制重建' },
      patch: { type: 'object', additionalProperties: true, description: 'config 时的配置增量，如 { autoOrder: true }' },
    },
    output: { schema: { type: 'json' }, render },
    execute: order,
  })

  return [orderTool]
}
