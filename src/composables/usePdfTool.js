import { ref } from 'vue'
import { runTool, saveBlob } from '../services/api.js'

export function usePdfTool(options = {}) {
  const files = ref([])
  const loading = ref(false)
  const error = ref('')
  const result = ref(null) // { blob, filename }
  const fileInput = ref(null)

  function onFiles(e) {
    const list = e.target?.files || e
    files.value = Array.from(list)
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
    try {
      const blob = await runTool(options.tool, files.value, params)
      const ext = options.outputExt || 'pdf'
      const baseName = files.value[0]?.name?.replace(/\.[^.]+$/, '') || 'output'
      result.value = {
        blob,
        filename: `${baseName}_converted.${ext}`
      }
    } catch (e) {
      error.value = e.message || '处理失败，请检查 API Key 是否正确'
    } finally {
      loading.value = false
    }
  }

  function download() {
    if (result.value) {
      saveBlob(result.value.blob, result.value.filename)
    }
  }

  return {
    files, loading, error, result, fileInput,
    onFiles, removeFile, formatSize, execute, download
  }
}
