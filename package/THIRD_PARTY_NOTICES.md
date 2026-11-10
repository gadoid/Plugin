# Native reader dependencies

The Windows reader bundles Python (PSF license), cryptography (Apache-2.0 or BSD-3-Clause), psutil (BSD-3-Clause), and the PyInstaller bootloader (GPL with its bootloader distribution exception). Dependency versions and the executable SHA-256 are recorded in `runtime/win32-x64/wecom-source/wecom-source.exe.manifest.json`; supplied license texts are included in the adjacent `licenses` directory.

The reader implements the wxSQLite3 AES-128 page format verified against this machine's WeCom 5.0.12.6026 installation. Earlier format research referenced `raclen/wechat-suite` (`wxwork_crypto.py`, `find_wxwork_keys.py`). No source, key, process dump, client database, or customer attachment from that research is included in the plugin package.

The JavaScript wire schemas bundle Zod under its MIT license, as preserved in the bundled source. DSH and Cordis remain Host-provided peers.

# Order building dependencies

The archive-to-order pipeline (`src/order`, `lib/order`) is derived from the internal plugin `ai-order-builder-v2`, whose package declares the license `UNLICENSED`. That origin does not grant redistribution rights. Publishing this package outside the organization, including to a plugin marketplace, requires permission from the rights holder; the derivation is recorded here so the permission can be confirmed before release. The defaults (`doc_types.json`, `port_country.json`, `extraction-prompt.txt`) and the extraction rules come from the same source.

Bundled into `lib/order/host.bundle.mjs` and shipped under their own licenses:

| Package | Version | License |
|---|---|---|
| exceljs | 4.4.0 | MIT |
| unpdf | 1.9.1 | MIT |
| pdf.js (embedded in unpdf) | 5.x | Apache-2.0 |
| mammoth | 1.13.0 | BSD-2-Clause |
| jszip | 3.10.2 | MIT (used under the MIT option) |

`@napi-rs/canvas` 1.1.0 (MIT), including its Windows x64 Skia binary and ICU data, is vendored unmodified under `vendor/canvas` and loaded at runtime to render scanned PDF pages. PDF CMap data under `lib/order/defaults/cmaps` comes from pdf.js and keeps its Apache-2.0 `LICENSE` file. License texts for the bundled packages are copied to `lib/order/licenses` at build time.

# RAR extraction dependencies

RAR support vendors `node-unrar-js` 2.0.2 (Copyright (c) 2017 Jianrong Yu, MIT license, full text preserved in `lib/vendor/unrar/LICENSE.md`) together with its WebAssembly binary compiled from the official UnRAR 6.1.7 source. The vendored files are unmodified apart from a `package.json` marking the directory as CommonJS. No RAR compression functionality is included or re-created; the binary only reads and extracts RAR archives.

The UnRAR license requires the following paragraph to accompany distribution:

> UnRAR source code may be used in any software to handle RAR archives without limitations free of charge, but cannot be used to develop RAR (WinRAR) compatible archiver and to re-create RAR compression algorithm, which is proprietary. Distribution of modified UnRAR source code in separate form or as a part of other software is permitted, provided that full text of this paragraph, starting from "UnRAR source code" words, is included in license, or in documentation if license is not available, and in source code comments of resulting package.

Full UnRAR license text (from `unrarsrc-6.1.7/license.txt`):

```
 ******    *****   ******   UnRAR - free utility for RAR archives
 **   **  **   **  **   **  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ******   *******  ******    License for use and distribution of
 **   **  **   **  **   **   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 **   **  **   **  **   **         FREE portable version
                                   ~~~~~~~~~~~~~~~~~~~~~

      The source code of UnRAR utility is freeware. This means:

   1. All copyrights to RAR and the utility UnRAR are exclusively
      owned by the author - Alexander Roshal.

   2. UnRAR source code may be used in any software to handle
      RAR archives without limitations free of charge, but cannot be
      used to develop RAR (WinRAR) compatible archiver and to
      re-create RAR compression algorithm, which is proprietary.
      Distribution of modified UnRAR source code in separate form
      or as a part of other software is permitted, provided that
      full text of this paragraph, starting from "UnRAR source code"
      words, is included in license, or in documentation if license
      is not available, and in source code comments of resulting package.

   3. The UnRAR utility may be freely distributed. It is allowed
      to distribute UnRAR inside of other software packages.

   4. THE RAR ARCHIVER AND THE UnRAR UTILITY ARE DISTRIBUTED "AS IS".
      NO WARRANTY OF ANY KIND IS EXPRESSED OR IMPLIED.  YOU USE AT
      YOUR OWN RISK. THE AUTHOR WILL NOT BE LIABLE FOR DATA LOSS,
      DAMAGES, LOSS OF PROFITS OR ANY OTHER KIND OF LOSS WHILE USING
      OR MISUSING THIS SOFTWARE.

   5. Installing and using the UnRAR utility signifies acceptance of
      these terms and conditions of the license.

   6. If you don't agree with terms of the license you must remove
      UnRAR files from your storage devices and cease to use the
      utility.

      Thank you for your interest in RAR and UnRAR.


                                            Alexander L. Roshal
```
