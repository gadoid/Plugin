# dsh-atom

企微群文件工作台与对话工具合一的**独立插件**：装这一个插件，面板和对话都能用。

- 面板：按群和时间预览企微附件，勾选文件、调整保存目录后归档；浏览已保存目录，解压 zip/rar，重命名、删除归档副本；在已保存目录视图里对当前目录一键 AI 识别到台账，目录头保留小图标复制路径；台账页先选字段建台账，再查看识别结果、人工复核；看板页按台账字段自行拼图，新建/编辑/保存柱状、条形、折线、面积、饼、环形、明细表与指标卡；保存只进图库，逐张选择展示或隐藏；点图上的柱、点或扇区可跳到台账按该条件筛选，提示行可一键清除（首版只筛已载入的热数据）；饼图/环形图悬浮时显示该分类的数量与占比。
- 对话：模型通过八个工具完成配置、读取预览、批量归档、单份保存/解压/重命名/删除、已保存目录查询、建单，以及台账的识别/改值/确认/建表与看板图表维护。
- 版本：0.8.0
- 依赖：无 npm 运行时依赖。工作台 Host 服务、客户端界面与本机读取组件已随包内置（来自 `dsh-wecom-fws` 0.8.5 的同一份实现）；建单流水线（exceljs、unpdf、mammoth、jszip）打进 `lib/order/host.bundle.mjs`，扫描件渲染用的 canvas 随包放在 `vendor/canvas`。
- 数据：仍使用原来 fws 的 Workbench 状态目录与归档目录，升级到本插件不会另起一套索引；建单状态在 `<状态目录>/orders`，台账配置、热窗数据、归档分片、识别快照与看板定义在状态目录下的 `ledger-config.json`、`ledger.json`、`ledger-archive.json`、`ledger-archive/`、`extraction/`、`ledger-dashboards.json`。台账字段单选内的内置字段原样迁移，生成的提示词与 0.5.0 逐字一致。

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

`config` 不传配置字段时只读；改 `model`/`provider`/`modelFallbacks` 需同时传 `confirm: true`。台账识别与建单共用这份配置。

### `wecom_atom_ledger`

只读台账（归档行不在热窗投影里，需看月度分片时用面板）：

| action | 作用 |
|---|---|
| `state` | 分页列热窗台账行；`offset`（默认 0）/`limit`（默认 50，上限 5000），值按字段 key 返回；带 `rev`、`local` 标记、归档总数与导出排除列 |
| `ticket` | 单票核对详情：单证清单（上限 50，另给 `documentCount`）、字段值/复核值/证据（备选上限 3） |
| `dictionary` | 内置字段字典，建表或改配置时查可用 key |
| `config` | 当前台账配置（名称、字段、列、导出排除列） |
| `boxes` | 某个单证某页的证据框（归一化矩形）；`id` + `file` 必填，`page` 默认 1 |
| `audit` | 复核审计事件，可按 `ticket`/`kind` 过滤，`limit` 默认 50、上限 200 |

`boxes` 对扫描件同样可用：Host 在缺文本层时回退本地 RapidOCR，未配置 OCR 时返回空框并说明来源。

### `wecom_atom_ledger_edit`

台账写入；所有校验仍由 Host 完成，工具只做参数收敛与幂等前置：

| action | 作用 |
|---|---|
| `recognize` | 识别一个归档目录并入库；`force: true` 忽略指纹重跑 |
| `ingest` | 用 `runId` 补写一次入库结果（幂等） |
| `values` | 批量改单元格：`changes: [{ id, key, value }]`，1–500 条；空字符串表示清空 |
| `confirm` | 把票标记为已核对：`ids`，1–500 个 |
| `reset` | 撤销复核值；`id` + 非空 `keys` 可局部撤销，否则需 `confirm: true` |
| `configure` | 建表/改配置，需 `confirm: true`；`fields` 直接给完整字段，或用 `fieldKeys`（内置 key）+ `customFields` |
| `export` | 导出 Excel；`exclude` 指定不导出的列 key |

`values` 只写可编辑列：内置字段与来源群、归档日期可人工改；票 ID、目录、归档时间、文件数、完整度、核对状态由系统维护。只改热窗行，已归档的月度分片不接受写入。值与当前投影相同或票不存在时该格直接跳过，全部跳过则不升 `rev`、不撤销确认。

### `wecom_atom_dashboard`

读取与维护看板图表；字段来自当前台账配置，保存时由 Host 校验：

| action | 作用 |
|---|---|
| `read` | 取展示中的图、图库与可字段目录；`scope=all` 或 `YYYY-MM` |
| `preview` | 用草稿 `widget` 试算一张图，不落盘 |
| `save` | 保存一张图；传 `id` 覆盖，建议先 `preview` |
| `pin` | 显示或隐藏已保存的图；`pinned` 默认 true |
| `delete` | 删除一张图，需 `confirm: true` |

图表定义支持 `bar`/`hbar`/`line`/`area`/`pie`/`donut`/`table`/`stat`，指标为 `count`/`sum`/`avg`；明细表结果在工具返回里截到 20 行并给真实总数。

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

### 对话维护台账

1. `wecom_atom_ledger { action: "config" }` 看是否已建表；`dictionary` 取可用字段。
2. 未建表时 `wecom_atom_ledger_edit { action: "configure", confirm: true, name, fieldKeys }`（自定义字段走 `customFields`）。
3. `wecom_atom_ledger_edit { action: "recognize", directory }`，再轮询 `wecom_atom_order { action: "status" }` 或直接读 `wecom_atom_ledger { action: "state" }`。
4. 复核：`ledger { action: "ticket", id }` 看证据 → `ledger_edit { action: "values", changes }` 改值 → `ledger_edit { action: "confirm", ids }`。
5. `wecom_atom_ledger_edit { action: "export", exclude }` 导出；`wecom_atom_dashboard` 的 `preview`/`save`/`pin` 维护看板图。

## 授权边界

- 批量落盘只能通过 `confirm`：必须显式指定 `groupIds`，与面板确认框按群勾选一致；自动命名目录必须显式 `allowAutoFolders: true`。
- `settings save` 会清空当前预览/结果（与面板保存配置一致），有任务时要求 `confirm: true`；不删除归档文件。
- `delete` 删除的是工作台归档副本，不是企微源文件；与面板行为一致。
- 工具不越过 Workbench 的后端校验（`job-changed`、`preview-stale`、`already-saved`、`selection-unavailable` 等原样返回为错误码）。
- 面板的目录选择器是系统对话框，对话里只能传绝对路径；实时进度用轮询，没有推送。
- 建单只读取归档目录、不移动原件；输出写入该目录下的 `_orders`。归档后自动建单默认关闭，需显式打开；它只处理本次归档实际写入的目录。
- 台账改值只作用于可编辑列（系统维护的票 ID、目录、归档时间、文件数、完整度、核对状态不可改），且只写热窗行；已归档的月度分片只读。重复识别不会覆盖人工复核值。
- `ledger_edit configure`、`ledger_edit reset`（未限定 `id` + `keys` 时）与 `dashboard delete` 都要求 `confirm: true`；改订单模型/提供方同样要求确认。
- 台账导出写到状态目录的 `exports`，不改动归档目录里的原件。
- 建单代码源自 `ai-order-builder-v2`（`UNLICENSED`），对外发布前需取得授权；详见 `THIRD_PARTY_NOTICES.md`。

## 一致性

- 台账页、看板取数与导出统一按票 ID（目录名）计数：尚未识别的归档票也计入；同一票重复保存到多个日期目录时只保留最近一次。
- 工具与面板读写同一个 Workbench 和同一块磁盘，落盘结果不会分叉。
- 工具修改状态后，面板在下一次读取（重新进入、刷新或任一动作）时看到新状态；没有实时推送。
- 设置是读-改-写合并：面板与对话同时改配置时后写覆盖先写。

## 识别链路基线

- 上游为 `ai-order-builder-v2`：`defaults/extraction-prompt.txt` 与其逐字节一致（SHA-256 `f51c8df5…ecbbd`），29 个内置字段的 key、名称、段落顺序与 7 个可空字段由 `test/recognition-baseline.test.mjs` 锁定。字段清单只在 `src/order/dictionary.mjs` 维护，流水线内的映射与必填/可空集合都由字典派生。
- 解析栈统一为：PDF 用 unpdf（含随包 CMap），扫描件/图片用随包 `@napi-rs/canvas` 渲成 JPEG 交视觉模型，文字兜底只调用已安装的 `doc_ocr`；不再使用原始实现的 pdf-to-img / tesseract。Word 用 mammoth，Excel 读写与导出用 exceljs，压缩包用 jszip。
- 两阶段口径：`extraction/` 落模型识别值及证据（raw_value、confidence、evidence、alternatives）；订单模式与台账模式共用同一份后处理（值清洗、单位/币制/国家归一化、提单号/目的地/通知人/付款方式等规则兜底），台账只在用户选中的列内生效。识别入口在文件整理页的已保存目录视图：选中的目录就是识别对象，完成后状态行直接给出票数与格数。台账任务在 Host 侧识别完成时直接写入 `ledger.json` 并在任务上记录入库结果（rev/票数/格数）；入库失败只标记任务，不回滚识别结果。`ledger-ingest` 保留为幂等补写入口，客户端在任务缺少入库标记或写入失败时补写一次，重复补写不升 rev、不追加审计。整票校验与 48 列 Excel 导出仍只属于订单模式。

## 扫描件 OCR（核对证据框）

核对浮层优先用 PDF 文本层定位证据；没有文本层（扫描 PDF、图片）时按页调用本地 RapidOCR，取行级归一化框后走同一套标签匹配。结果按「文件内容 SHA-256 + 页码」缓存在台账状态目录的 `ocr-cache/`，同一页只识别一次。

OCR 是可选能力：未配置解释器时页面照常显示，浮层提示「未配置本地 OCR」，不画框，不影响文本层路径。

点击右侧任一字段会跳到该字段证据所在的单证与页码，并把对应框放大居中以视口中央（框占视口宽约 62%），活动框挂字段名标签；同一页再点直接放大。跳转（含字段行与「查看」按钮）不清空当前页：旧页留在视口里被加载层盖住，新页回来直接替换，避免短暂空白。行内「采用新值 / 还原」按钮不触发跳页；点左侧正在看的单证也不会重载。缩放上限 4×、下限 100%，拖动与滚轮缩放仍可调，双击恢复 100%。

部署用独立虚拟环境（约 280 MB，不污染 DSH 内置 Python）：

```bat
py -3.12 -m venv %LOCALAPPDATA%\dsh-atom-ocr\venv
%LOCALAPPDATA%\dsh-atom-ocr\venv\Scripts\python.exe -m pip install "rapidocr-onnxruntime>=1.3" "pypdfium2>=4" "Pillow>=10"
```

设置用户环境变量后完全重启应用（宿主进程在启动时继承环境变量）：

```bat
setx DSH_OCR_PYTHON "%LOCALAPPDATA%\dsh-atom-ocr\venv\Scripts\python.exe"
```

体积构成：onnxruntime 48M、opencv 113M、numpy 34M、RapidOCR（含 PP-OCRv4 det/rec/cls 模型）16M。单页首次识别约 4–7 秒（含进程启动与模型加载），命中缓存后只读 JSON。

## 包结构

| 路径 | 内容 |
|---|---|
| `index.js` | Host 入口：工作台服务（服务名仍为 `wecomFws`）+ 八个对话工具 |
| `lib/service.js`、`lib/backend.mjs` 等 | 工作台 Host 实现与本机读取 |
| `lib/client.js` | 面板客户端（槽位、样式、文案）；建单面板作为独立组件注入 |
| `lib/typert.js` | 面板与 Host 之间的调用清单，归属包名 `dsh-atom` |
| `lib/order/host.bundle.mjs` | 建单流水线（含 exceljs/unpdf/mammoth/jszip） |
| `lib/ocr/engine.py` | 扫描件单页 OCR（RapidOCR，输出行级归一化框） |
| `lib/ocr-boxes.mjs` | OCR 解释器调用、缓存与降级 |
| `lib/order/defaults` | 字段表、国别表、提取提示词与 PDF CMap |
| `vendor/canvas` | 扫描件 PDF 渲染用的 `@napi-rs/canvas`（Windows x64，约 38 MB） |
| `runtime/win32-x64/wecom-source` | 本机企微只读组件 |
| `lib/vendor/unrar` | rar 解压组件 |
| `locale/*.json` | 插件卡片显示名与说明 |
| `cordis.patch.yml` | 只插入一行 `eline-atom` |

工作台界面文案：侧栏与页面标题为「Atom 群文件工作台」；插件卡片为「Atom」。

## 验证

- `node --test test/*.test.mjs`：191 项通过。覆盖查询/单份写/任务/设置/建单/台账/看板七组工具、包结构（客户端/typert 归属、单行 patch、无 npm 依赖）、客户端 bundle 的注入（保留解压/目录视图/分组界面，目录头换成识别工作区、台账页去掉目录选择行，locale 与渲染点各一处）、建单端到端（文本 + 无文字层 PDF → 1 票、完整度 100、xlsx 落盘）、核对浮层（文本层证据框、OCR 缓存命中与未配置降级、全角标点归一化、字段定位的缩放与居中几何），以及识别基线（提示词哈希、29 字段契约、台账/子集提示词结构、Excel 附件读取、识别完成自动入库与幂等补写）。工具参数 schema 用真实 `defineTool` 编译校验。
- 建单流水线端到端（本机 Node，替身模型）：`提单.txt` + `装箱单.txt` + 无文字层 PDF → 1 票、完整度 100、48 列 xlsx；扫描页经随包 canvas 转成 1 张图片交给视觉模型。
- 未在真实桌面宿主里点过建单面板，也尚未用真实模型跑通一票中文单据；安装后需在面板点一次「重新建单」，并在对话里调用一次 `wecom_atom_order { action: "status" }` 核对。
- 扫描件核对浮层已在隔离环境用真实 RapidOCR 与真实页面渲染验证（扫描 PDF 与 JPG 各一页，框与文字行重合；首次 6.7s / 5.0s，二次命中缓存），未在真实桌面宿主里点验；设置 `DSH_OCR_PYTHON` 后需完全重启宿主进程才能生效。字段定位的缩放/居中几何用同一个 `fitBoxZoom` 在隔离页面里按真实 CSS 变换验过（框中心对齐视口中央），React 里的点击链路未在真实宿主里点过。
- 客户端说明：0.4.0 随包的 `client.js.map` 是更早构建留下的过期源码（与 0.8.5 界面不一致），因此 `build-client.mjs` 不重建整份界面，只在发布版 bundle 上注入组件与渲染点：页1 外壳、台账页、看板页、已保存目录头的 AI 识别工作区；解压、分组等既有界面保持原样。`src/client` 下除上述组件外的旧还原源码仅作参考，不参与构建。

## 打包

```bash
npm pack --ignore-scripts
```

得到 `dsh-atom-0.8.0.tgz`，直接上传插件市场即可；包内不含 `file:` / 本地路径依赖。canvas 约 38 MB，tarball 实测约 33 MB、解包约 92 MB，属预期。
