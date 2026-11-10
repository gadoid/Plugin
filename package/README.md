# dsh-atom

企微群文件工作台与对话工具合一的**独立插件**：装这一个插件，面板和对话都能用。

- 面板：按群和时间预览企微附件，勾选文件、调整保存目录后归档；浏览已保存目录，解压 zip/rar，重命名、删除归档副本；按归档目录建单并导出 Excel。
- 对话：模型通过五个工具完成配置、读取预览、批量归档、单份保存/解压/重命名/删除、已保存目录查询与建单。
- 版本：0.5.0
- 依赖：无 npm 运行时依赖。工作台 Host 服务、客户端界面与本机读取组件已随包内置（来自 `dsh-wecom-fws` 0.8.5 的同一份实现）；建单流水线（exceljs、unpdf、mammoth、jszip）打进 `lib/order/host.bundle.mjs`，扫描件渲染用的 canvas 随包放在 `vendor/canvas`。
- 数据：仍使用原来 fws 的 Workbench 状态目录与归档目录，升级到本插件不会另起一套索引；建单状态在 `<状态目录>/orders`。

## 安装

从插件市场搜索「Atom」安装，装完完全退出并重开 SparkSeed。面板会出现在侧栏，插件页只有一张「Atom」卡片。

本机开发时把 tarball 放进 profile 的 `dependencies`，或用 `file:` 指向本目录亦可；市场通道和本地通道互不影响。

## 工具

### `wecom_atom_query`

只读查询当前工作台与已保存文件：

| action | 作用 |
|---|---|
| `state` | 设置、当前预览任务、各群摘要（不含全部记录） |
| `accounts` | 列企微数据根目录下的账号 |
| `groups` | 按关键字列群（需要 `root` + `account`） |
| `records` | 分页列当前预览的文件（可带 `groupId`/`keyword`/`status`/`order`） |
| `directories` | 分页浏览已保存文件所在目录（含解压产物） |
| `saved-folders` | 列某群已用过的归档目录名 |

### `wecom_atom_file`

单份写操作：

| action | 作用 |
|---|---|
| `save` | 把一份群附件复制到归档目录；省略 `groupName` 时按该群目录 |
| `extract` | 解压已保存的 zip/rar（子压缩包落到同名子目录） |
| `rename` | 重命名已保存副本 |
| `delete` | 删除已保存副本（企微原文件不动） |

`jobId` 省略时使用 Workbench 当前的预览任务；所有结果都会带上使用的 `jobId`。

### `wecom_atom_preview`

读取与归档任务：

| action | 作用 |
|---|---|
| `start` | 按已保存配置生成预览；`mode=bill`（默认，只读账单文件名）或 `all`；`start`/`end` 省略时取今天 |
| `cancel` | 取消当前读取或归档任务 |
| `plan` | 估算各群将归档的数量与自动命名目录数（只读，可带 `groupIds` 只看这些群） |
| `confirm` | 按预览里的勾选批量归档；**必须显式传 `groupIds`**，自动命名目录需 `allowAutoFolders: true` |

`start` / `confirm` 立即返回 `running` 状态，用 `wecom_atom_query` 的 `state` / `records` 轮询进度。逐文件调整用 `changes: [{ id, selected?, documentFolder? }]`，整群勾选用 `groupSelections`，整群指定子目录用 `groupFolders`；`plan` 与 `confirm` 接受同一组参数，可先估算再落盘。

### `wecom_atom_settings`

配置读写（只改配置，不动文件）：

| action | 作用 |
|---|---|
| `save` | 保存配置；省略的字段沿用当前值，`groups` 传完整群列表（省略则沿用现有群） |
| `clear` | 清空当前预览/结果（不删归档文件，配置不变） |

保存配置会清空当前预览与结果（与面板保存配置一致）；已有任务时必须同时传 `confirm: true`。改 `saveDirectory` 会清空「已保存位置」索引。

### `wecom_atom_order`

把已归档的一票单据识别成订单并导出 Excel。**粒度：一个归档目录 = 一票**。

| action | 作用 |
|---|---|
| `build` | 递归读取目录内的 PDF/Word/Excel/图片，提取字段并导出 `目录\_orders\订单_目录名_时间.xlsx`；`force: true` 忽略文件指纹强制重跑 |
| `scan` | 只列目录内可识别的单据与最近一次任务，不建单 |
| `status` | 列最近归档目录、建单配置与各目录任务状态（面板轮询同一动作） |
| `cancel` | 取消该目录排队中或运行中的任务 |
| `config` | 读写建单配置：`autoOrder`（归档后自动建单）、`multimodal`、`ocr`、`model`/`provider`、`outputFolder` 等 |

`build` 立即返回任务头，之后用 `status` 轮询。结果里有 `completeness`（必填完整度）、`missing`（缺失必填）与 `issues`（业务校验提示）；扫描件需要当前默认模型支持图片，否则只能依赖可选的 `doc_ocr` 工具。目录内单据上限 200 份。

### 对话完成一次归档

1. `wecom_atom_query { action: "accounts" }` → `groups` 找到账号与群 id。
2. `wecom_atom_settings { action: "save", root, account, saveDirectory, groups }` 保存配置。
3. `wecom_atom_preview { action: "start", mode: "bill" }`，再轮询 `state` / `records`。
4. `wecom_atom_preview { action: "plan", groupIds }` 核对数量与自动命名目录。
5. `wecom_atom_preview { action: "confirm", groupIds, allowAutoFolders }` 批量归档。
6. `wecom_atom_query { action: "records", status: "saved" }` 或 `directories` 查看结果。

### 建单入口

| 入口 | 操作 |
|---|---|
| 面板 | 「AI 建单」区列出最近归档目录，点「重新建单」或「选择其他目录建单」；可勾选「归档完成后自动建单」 |
| 对话 | `wecom_atom_order { action: "build", directory: "D:\\客户资料\\群\\2026-11-10\\提单" }`，再轮询 `status` |
| 归档后自动 | 面板或 `confirm` 归档成功后，对本次实际落盘的目录排队建单；需先在 `config` 里打开 `autoOrder` |

无论入口，输出都是同一份 `<目录>\_orders\订单_<目录名>_<时间>.xlsx`；同一目录按文件指纹去重，文件没变时自动跳过。

## 授权边界

- 批量落盘只能通过 `confirm`：必须显式指定 `groupIds`，与面板确认框按群勾选一致；自动命名目录必须显式 `allowAutoFolders: true`。
- `settings save` 会清空当前预览/结果（与面板保存配置一致），有任务时要求 `confirm: true`；不删除归档文件。
- `delete` 删除的是工作台归档副本，不是企微源文件；与面板行为一致。
- 工具不越过 Workbench 的后端校验（`job-changed`、`preview-stale`、`already-saved`、`selection-unavailable` 等原样返回为错误码）。
- 面板的目录选择器是系统对话框，对话里只能传绝对路径；实时进度用轮询，没有推送。
- 建单只读取归档目录、不移动原件；输出写入该目录下的 `_orders`。归档后自动建单默认关闭，需显式打开；它只处理本次归档实际写入的目录。
- 建单代码源自 `ai-order-builder-v2`（`UNLICENSED`），对外发布前需取得授权；详见 `THIRD_PARTY_NOTICES.md`。

## 一致性

- 工具与面板读写同一个 Workbench 和同一块磁盘，落盘结果不会分叉。
- 工具修改状态后，面板在下一次读取（重新进入、刷新或任一动作）时看到新状态；没有实时推送。
- 设置是读-改-写合并：面板与对话同时改配置时后写覆盖先写。

## 包结构

| 路径 | 内容 |
|---|---|
| `index.js` | Host 入口：工作台服务（服务名仍为 `wecomFws`）+ 五个对话工具 |
| `lib/service.js`、`lib/backend.mjs` 等 | 工作台 Host 实现与本机读取 |
| `lib/client.js` | 面板客户端（槽位、样式、文案）；建单面板作为独立组件注入 |
| `lib/typert.js` | 面板与 Host 之间的调用清单，归属包名 `dsh-atom` |
| `lib/order/host.bundle.mjs` | 建单流水线（含 exceljs/unpdf/mammoth/jszip） |
| `lib/order/defaults` | 字段表、国别表、提取提示词与 PDF CMap |
| `vendor/canvas` | 扫描件 PDF 渲染用的 `@napi-rs/canvas`（Windows x64，约 38 MB） |
| `runtime/win32-x64/wecom-source` | 本机企微只读组件 |
| `lib/vendor/unrar` | rar 解压组件 |
| `locale/*.json` | 插件卡片显示名与说明 |
| `cordis.patch.yml` | 只插入一行 `eline-atom` |

工作台界面文案：侧栏与页面标题为「Atom 群文件工作台」；插件卡片为「Atom」。

## 验证

- `node --test test/*.test.mjs`：27 项通过。覆盖查询/单份写/任务/设置四组工具、包结构（客户端/typert 归属、单行 patch、无 npm 依赖）、客户端 bundle 的建单注入（保留解压/目录视图/分组界面、locale 与渲染点各一处），以及建单端到端（文本 + 无文字层 PDF → 1 票、完整度 100、xlsx 落盘）。工具参数 schema 用真实 `defineTool` 编译校验。
- 建单流水线端到端（本机 Node，替身模型）：`提单.txt` + `装箱单.txt` + 无文字层 PDF → 1 票、完整度 100、48 列 xlsx；扫描页经随包 canvas 转成 1 张图片交给视觉模型。
- 未在真实桌面宿主里点过建单面板，也尚未用真实模型跑通一票中文单据；安装后需在面板点一次「重新建单」，并在对话里调用一次 `wecom_atom_order { action: "status" }` 核对。
- 客户端说明：0.4.0 随包的 `client.js.map` 是更早构建留下的过期源码（与 0.8.5 界面不一致），因此 `build-client.mjs` 不重建整份界面，只在发布版 bundle 上注入建单文案、组件和渲染点；解压、目录视图、分组等既有界面保持原样。`src/client` 下除建单组件外的旧还原源码仅作参考，不参与构建。

## 打包

```bash
npm pack --ignore-scripts
```

得到 `dsh-atom-0.5.0.tgz`，直接上传插件市场即可；包内不含 `file:` / 本地路径依赖。canvas 约 38 MB，tarball 实测 30.1 MB、解包 79.2 MB，属预期。
