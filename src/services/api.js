import { ILOVEAPI_PUBLIC_KEY, API_BASE } from './iloveapi.js'

/**
 * iLoveAPI 工作流封装
 * 1. start(task) → 获取 task token
 * 2. upload(task, files) → 上传文件
 * 3. process(task, params) → 处理
 * 4. download(task) → 下载结果
 */

async function apiFetch(url, options = {}) {
  const res = await fetch(url, options)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `API 错误: ${res.status}`)
  }
  return res
}

// 1. 创建任务
export async function startTask(tool) {
  const res = await apiFetch(`${API_BASE}/start/${tool}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${ILOVEAPI_PUBLIC_KEY}` }
  })
  return res.json() // { task, server }
}

// 2. 上传文件
export async function uploadFiles(taskToken, server, files) {
  const formData = new FormData()
  for (const file of files) {
    formData.append('file', file)
  }
  const res = await apiFetch(`${server}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${taskToken}` },
    body: formData
  })
  return res.json()
}

// 3. 处理
export async function processTask(taskToken, server, params = {}) {
  const body = { task: taskToken, ...params }
  const res = await apiFetch(`${server}/process`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${taskToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return res.json()
}

// 4. 下载结果
export async function downloadResult(taskToken, server) {
  const res = await apiFetch(`${server}/download/${taskToken}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${taskToken}` }
  })
  return res.blob()
}

// 完整流程：一键处理
export async function runTool(tool, files, params = {}) {
  const { task, server } = await startTask(tool)
  await uploadFiles(task, server, files)
  await processTask(task, server, params)
  const blob = await downloadResult(task, server)
  return blob
}

// 下载 blob 为文件
export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
