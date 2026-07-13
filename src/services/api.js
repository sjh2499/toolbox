/**
 * PDF Tool API — client-side processing via pdfEngine
 * Maintains the same public API shape (runTool, saveBlob) so composable/views work unchanged.
 */
import * as engine from './pdfEngine.js'

const TOOL_MAP = {
  merge:       { fn: 'mergePdf',    multi: true,  outputExt: 'pdf' },
  split:       { fn: 'splitPdf',    multi: false, outputExt: 'pdf' },
  compress:    { fn: 'compressPdf', multi: false, outputExt: 'pdf' },
  pdfjpg:      { fn: 'pdfToJpg',    multi: false, outputExt: 'zip' },
  imagepdf:    { fn: 'jpgToPdf',    multi: true,  outputExt: 'pdf' },
  protect:     { fn: 'protectPdf',  multi: false, outputExt: 'html' },
  unlock:      { fn: 'unlockPdf',   multi: false, outputExt: 'pdf' },
  pdfword:     { fn: 'pdfToWord',   multi: false, outputExt: 'doc' },
}

export async function runTool(tool, files, params = {}) {
  const cfg = TOOL_MAP[tool]
  if (!cfg) throw new Error(`未知工具: ${tool}`)

  if (!files.length) throw new Error('请先选择文件')
  if (cfg.multi === false && files.length > 1) {
    files = [files[0]]
  }

  const fn = engine[cfg.fn]
  if (typeof fn !== 'function') throw new Error(`引擎函数 ${cfg.fn} 未找到`)

  return fn(files, params)
}

export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
