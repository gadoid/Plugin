# Changelog

## 0.5.0

日期：2026-11-10

- 新增 `wecom_atom_order`：按归档目录建单（一个目录 = 一票），读取 PDF/Word/Excel/图片，提取字段后导出 `目录\_orders\订单_<目录名>_<时间>.xlsx`；`build` / `scan` / `status` / `cancel` / `config` 五个动作。
- 面板新增「AI 建单」区：最近归档目录、状态与进度、输出路径、完整度/缺失必填/校验提示，可取消或重新建单，可打开「归档完成后自动建单」。
- 归档成功后自动建单：面板或 `confirm` 归档完成后，对本次实际落盘的目录排队；`autoOrder` 默认关闭，同目录按文件指纹去重。
- 建单流水线随包内置（exceljs、unpdf、mammoth、jszip 打进 `lib/order/host.bundle.mjs`）；扫描件 PDF 由随包 `@napi-rs/canvas` 渲染成 JPEG 交给视觉模型，CMap 随包解决中文 PDF。
- 客户端改为在 0.4.0 发布版 bundle 上注入建单面板：0.4.0 的 `client.js.map` 已过期（与 0.8.5 界面不符），不再据此全量重建，解压/目录视图/分组等界面保持原样。
- 测试 26 项：新增客户端注入与 bundle 装载测试；建单流水线用替身模型跑通文本 + 扫描 PDF 的端到端。

## 0.4.0

日期：2026-11-10

- 新增 `wecom_atom_preview`：`start` 生成预览（bill/all、日期范围默认今天）、`cancel` 取消、`plan` 估算归档与自动命名目录、`confirm` 按预览勾选批量归档。
- `confirm` 必须显式给 `groupIds`，自动命名目录需 `allowAutoFolders: true`；支持 `groupSelections` / `groupFolders` / `changes` 逐群、逐文件调整。
- 新增 `wecom_atom_settings`：`save` 合并保存配置（省略字段沿用当前值，`groups` 传完整列表），`clear` 清空当前预览/结果；有任务时保存需 `confirm: true`。
- `start` / `confirm` 立即返回 `running`，进度通过 `state` / `records` 轮询，与面板一致。
- 工具测试扩到 24 项，参数 schema 用真实 `defineTool` 编译校验。

## 0.3.0

日期：2026-11-10

- 改为可上市的独立插件：工作台 Host 服务、面板客户端与本机读取组件随包内置（源自 `dsh-wecom-fws` 0.8.5），不再依赖 `dsh-wecom-fws`，也没有 `file:` 路径依赖。
- `cordis.patch.yml` 只插入一行 `eline-atom`；服务名仍是 `wecomFws`，与旧状态目录和归档数据兼容。
- 客户端模块、typert 清单与样式归属改为 `dsh-atom`，面板与侧栏文案改为「Atom 群文件工作台」，插件卡片为「Atom」。
- 对话工具错误前缀改为 `atom:`；工具说明不再提及其它插件。
- 新增包结构测试：客户端/typert 归属、单行 patch、无 npm 依赖。

## 0.2.0

日期：2026-11-10

- 由纯工具插件改为组合包：一个 Atom bundle 同时插入 `dsh-wecom-fws`（面板与 Host 服务）和 `dsh-atom`（对话工具）两行。
- 插件页只显示一张 Atom 卡片；工作台 UI 仍由 `dsh-wecom-fws` 客户端提供，不复制代码。
- 新增对 `dsh-wecom-fws` 的 npm 依赖；profile 只需选中 `dsh-atom`，不再单独选 fws。
- 显示说明改为“工作台 + 对话工具”。

## 0.1.3

日期：2026-11-10

- 工具名去掉 `fws`：`wecom_fws_query` → `wecom_atom_query`，`wecom_fws_file` → `wecom_atom_file`。

## 0.1.2

日期：2026-11-10

- 插件页显示标题改为「Atom」（`locale/zh.json`、`locale/en.json` 的 `meta.title`）。

## 0.1.1

日期：2026-11-10

- 包名由 `dsh-wecom-fws-tools` 改为 `dsh-atom`，组合包插入行改为 `eline-atom`。
- 增加 `locale/zh.json`、`locale/en.json` 显示元数据，插件页显示「企微群文件工具」而不是裸包名。
- 明确与 fws 的隔离方式：独立 bundle/插入行、无 npm 依赖、profile 用 `file:` 本地通道。
- 文档标注 `extract` 需要 fws ≥ 0.8.2（其余动作 0.8.1 可用）。

## 0.1.0

日期：2026-11-10

新插件：把 `dsh-wecom-fws` 的能力暴露为对话内工具，面板与对话共享同一个 Workbench。

- 新增 `wecom_fws_query`：`state` / `accounts` / `groups` / `records` / `directories` / `saved-folders`。
- 新增 `wecom_fws_file`：`save` / `extract` / `rename` / `delete`，只做单份操作。
- `jobId` 省略时取当前预览任务；`save` 省略 `groupName` 时按群归档目录推导。
- 结果裁剪掉面板用的完整 snapshot，仅返回任务头、群摘要或本次操作结果。
- 不提供批量 `start`/`confirm`/`save`：授权动作仍由用户在面板完成。
- 最终一致：工具与面板同源，面板下次读取时同步；无实时推送。
