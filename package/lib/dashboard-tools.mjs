/** Model-facing tools over the saved dashboard widgets; the panel renders the same query results. */
const ACTIONS = ['read', 'preview', 'save', 'pin', 'delete']
const TYPES = ['bar', 'hbar', 'line', 'area', 'pie', 'donut', 'table', 'stat']
const METRICS = ['count', 'sum', 'avg']
const TABLE_ROWS = 20

const render = (_args, value) => [{ type: 'text', text: JSON.stringify(value, null, 1) }]
const text = value => (typeof value === 'string' ? value.trim() : '')

function compactWidget(widget) {
  if (!widget) return null
  return {
    id: widget.id,
    title: widget.title,
    type: widget.type,
    dimension: widget.dimension,
    series: widget.series,
    metric: widget.metric,
    valueField: widget.valueField,
    top: widget.top,
    order: widget.order,
    layout: widget.layout,
    months: widget.months,
    columns: widget.columns,
    limit: widget.limit,
    span: widget.span,
    pinned: widget.pinned === true,
  }
}

function compactCatalog(catalog) {
  if (!catalog) return null
  return {
    fields: catalog.fields || [],
    tableColumns: catalog.tableColumns || [],
    metrics: catalog.metrics || METRICS,
    types: catalog.types || TYPES,
    maxWidgets: catalog.maxWidgets,
    maxPinned: catalog.maxPinned,
    seriesLimit: catalog.seriesLimit,
    monthOptions: catalog.monthOptions,
    maxTop: catalog.maxTop,
  }
}

/** Table results can carry the whole page; the model only needs a preview plus the true total. */
function compactResult(result) {
  if (result?.kind !== 'table' || !Array.isArray(result.rows)) return result
  const rows = result.rows.slice(0, TABLE_ROWS)
  return {
    ...result,
    rows,
    truncated: result.truncated === true || rows.length < result.rows.length,
    returned: rows.length,
  }
}

export function createDashboardTools(defineTool, call) {
  const run = async args => {
    if (!ACTIONS.includes(args.action)) throw new Error('atom: invalid-action')
    const scope = text(args.scope)
    if (args.action === 'read') {
      const value = await call({ action: 'ledger-dashboard', ...(scope ? { scope } : {}) })
      return {
        configured: value?.configured === true,
        name: value?.name || '',
        scope: value?.scope || 'all',
        months: value?.months || [],
        total: Number(value?.total) || 0,
        archivedTotal: Number(value?.archivedTotal) || 0,
        pinnedCount: Number(value?.pinnedCount) || 0,
        revision: value?.revision || '',
        catalog: compactCatalog(value?.catalog),
        widgets: (value?.widgets || []).map(item => ({
          widget: compactWidget(item.widget),
          result: compactResult(item.result),
        })),
        library: (value?.library || []).map(compactWidget),
      }
    }
    if (args.action === 'preview' || args.action === 'save') {
      if (!args.widget || typeof args.widget !== 'object') throw new Error('atom: widget-required')
    }
    if (args.action === 'preview') {
      const value = await call({
        action: 'ledger-dashboard-preview',
        widget: args.widget,
        ...(scope ? { scope } : {}),
      })
      return {
        configured: value?.configured === true,
        scope: value?.scope || 'all',
        widget: compactWidget(value?.widget),
        result: value?.result,
      }
    }
    if (args.action === 'save') {
      const value = await call({
        action: 'ledger-dashboard-save',
        ...(text(args.id) ? { id: text(args.id) } : {}),
        widget: args.widget,
      })
      return {
        widget: compactWidget(value?.widget),
        count: Array.isArray(value?.widgets) ? value.widgets.length : 0,
        updatedAt: value?.updatedAt,
      }
    }
    const id = text(args.id)
    if (!id) throw new Error('atom: widget-id-required')
    if (args.action === 'pin') {
      const value = await call({
        action: 'ledger-dashboard-pin',
        id,
        pinned: args.pinned !== false,
      })
      return {
        widget: compactWidget(value?.widget),
        count: Array.isArray(value?.widgets) ? value.widgets.length : 0,
        updatedAt: value?.updatedAt,
      }
    }
    if (args.confirm !== true) throw new Error('atom: confirm-required')
    const value = await call({ action: 'ledger-dashboard-delete', id })
    return {
      count: Array.isArray(value?.widgets) ? value.widgets.length : 0,
      updatedAt: value?.updatedAt,
    }
  }

  const tool = defineTool({
    name: 'wecom_atom_dashboard',
    description: '读取与维护 dsh-atom 看板。read=按范围（scope=all 或 YYYY-MM）取展示中的图、图库与可字段目录；preview=用草稿 widget 试算一张图，不落盘；save=保存/覆盖一张图（建议先 preview 验证字段与指标）；pin=显示或隐藏一张已保存的图；delete=删除一张图（需 confirm=true）。图表字段来自当前台账配置，保存时由 Host 校验。',
    parameters: {
      action: { type: 'string', enum: ACTIONS, required: true, description: '看板动作' },
      scope: { type: 'string', description: '取数范围：all 或 YYYY-MM；省略沿用看板当前选择' },
      id: { type: 'string', description: '已保存图的 id（save 覆盖时传，pin/delete 必填）' },
      widget: {
        type: 'object',
        additionalProperties: true,
        description: '图表定义（preview/save）',
        properties: {
          id: { type: 'string', description: '覆盖已有图时省略' },
          title: { type: 'string', description: '标题；省略按维度与指标生成' },
          type: { type: 'string', enum: TYPES, description: '图表类型' },
          dimension: { type: 'string', description: '分组字段 key；month 表示按入账月份' },
          series: { type: 'string', description: '拆分字段 key；数字字段不能用于拆分' },
          metric: { type: 'string', enum: METRICS, description: '指标：count 票数、sum 求和、avg 平均' },
          valueField: { type: 'string', description: '求和/平均使用的数字字段 key' },
          top: { type: 'integer', description: '分类图保留的标签数 3–20，溢出合并为「其他」' },
          order: { type: 'string', enum: ['value', 'label'], description: '标签排序' },
          layout: { type: 'string', enum: ['grouped', 'stacked'], description: '多系列柱/条图布局' },
          months: { type: 'integer', description: '按月份维度时的窗口月数 0–24' },
          columns: { type: 'array', items: { type: 'string' }, description: '明细表显示的列 key' },
          limit: { type: 'integer', description: '明细表行数 1–500' },
          span: { type: 'integer', enum: [1, 2], description: '看板占位宽度' },
          pinned: { type: 'boolean', description: '保存后是否展示在看板上' },
        },
      },
      pinned: { type: 'boolean', description: 'pin 时 true 展示、false 隐藏；默认 true' },
      confirm: { type: 'boolean', description: 'delete 的风险确认' },
    },
    output: { schema: { type: 'json' }, render },
    isConcurrencySafe: args => args.action === 'read' || args.action === 'preview',
    execute: run,
  })

  return [tool]
}
