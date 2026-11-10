/** One-shot, provider-managed native source reader. No keys cross this interface. */
import * as fs from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { OperationError } from './files.mjs'

export async function readNativeSource(subprocess, request, signal, options) {
  if (process.platform !== 'win32' || process.arch !== 'x64') throw new OperationError('reader-windows-x64-required')
  if (!request || !['groups', 'files', 'profile'].includes(request.action)) throw new OperationError('reader-invalid-request')
  const executable = fileURLToPath(new URL('../runtime/win32-x64/wecom-source/wecom-source.exe', import.meta.url))
  let manifest, binary
  try { manifest = JSON.parse(await fs.readFile(`${executable}.manifest.json`, 'utf8')); binary = await fs.readFile(executable) }
  catch (error) { if (error.code === 'ENOENT') throw new OperationError('reader-missing'); throw new OperationError('reader-integrity-failed') }
  if (manifest.protocol !== 1 || createHash('sha256').update(binary).digest('hex') !== manifest.sha256) throw new OperationError('reader-integrity-failed')
  if (signal.aborted) throw new OperationError('cancelled')
  const handle = subprocess.spawn({
    argv: [executable], cwd: dirname(executable), graceMs: 2000, signal,
    stdio: { stdin: { data: JSON.stringify({ ...request, protocol: 1, keyTimeoutMs: request.action === 'profile' ? Math.min(5000, options.readerKeyTimeoutMs) : options.readerKeyTimeoutMs, maxDatabaseBytes: options.readerMaxDatabaseBytes }) }, stdout: { maxBytes: 64 * 1024 * 1024 }, stderr: { maxBytes: 4096 } },
  })
  let outcome
  try { outcome = await handle.done } catch (error) { if (signal.aborted) throw new OperationError('cancelled'); throw error }
  if (signal.aborted) throw new OperationError('cancelled')
  if (outcome.exitCode !== 0) throw new OperationError('reader-failed')
  const output = handle.collected.stdout.readFrom(0)
  if (output.lossy) throw new OperationError('source-output-too-large')
  let response
  try { response = JSON.parse(output.text) } catch { throw new OperationError('reader-protocol-failed') }
  if (!response || response.protocol !== 1 || typeof response.ok !== 'boolean') throw new OperationError('reader-protocol-failed')
  if (!response.ok) {
    if (typeof response.code !== 'string' || !/^[a-z][a-z0-9-]{1,80}$/.test(response.code)) throw new OperationError('reader-protocol-failed')
    throw new OperationError(response.code)
  }
  return response.value
}
