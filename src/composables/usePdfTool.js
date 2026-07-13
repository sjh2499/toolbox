import { ref, onUnmounted } from 'vue'
import { runTool, saveBlob } from '../services/api.js'

export function usePdfTool(options = {}) {
  const files = ref([])
  const loading = ref(false)
  const error = ref('')
  const result = ref(null) // { blob, filename }
  const fileInput = ref(null)
  let abortCtrl = null

  function onFiles(e) {
    const fileList = e.target?.files
    if (fileList) {
      files.value = Array.from(fileList)
    }
    error.value = ''
    result.value = null
  }

  function removeFile(index) {
    files.value.splice(index, 1)
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  async function execute(params = {}) {
    if (!files.value.length) {
      error.value = '请先选择文件'
      return
    }
    loading.value = true
    error.value = ''
    result.value = null
    abortCtrl = new AbortController()
    try {
      const blob = await runTool(options.tool, files.value, params)
      const ext = options.outputExt || 'pdf'
      const baseName = files.value[0]?.name?.replace(/\.[^.]+$/, '') || 'output'
      result.value = {
        blob,
        filename: `${baseName}_converted.${ext}`
      }
    } catch (e) {
      if (e.name === 'AbortError') return
      error.value = e.message || '处理失败'
    } finally {
      loading.value = false
      abortCtrl = null
    }
  }

  function download() {
    if (result.value) {
      saveBlob(result.value.blob, result.value.filename)
    }
  }

  onUnmounted(() => {
    if (abortCtrl) abortCtrl.abort()
  })

  return {
    files, loading, error, result, fileInput,
    onFiles, removeFile, formatSize, execute, download
  }
}
