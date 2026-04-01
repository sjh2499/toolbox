<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>✂️ 拆分 PDF</h2>
    </div>
    <div class="tool-body">
      <p class="label">选择 PDF 文件，按页拆分</p>
      <input type="file" accept=".pdf" @change="onFiles" ref="fileInput" />
      <div v-if="files.length" class="file-list">
        <div v-for="(f, i) in files" :key="i" class="file-item">
          <span>{{ f.name }} ({{ formatSize(f.size) }})</span>
          <span class="remove" @click="removeFile(i)">✕</span>
        </div>
      </div>
      <div class="row">
        <label class="label">拆分模式:</label>
        <select v-model="mode">
          <option value="ranges">按范围提取</option>
          <option value="fixed">按固定页数</option>
        </select>
      </div>
      <div v-if="mode === 'ranges'" class="row">
        <input type="text" v-model="ranges" placeholder="页码范围，如: 1-3,5,7-10" />
      </div>
      <div v-if="mode === 'fixed'" class="row">
        <input type="number" v-model.number="fixedPages" placeholder="每份页数" min="1" style="width:120px" />
      </div>
      <button @click="doSplit" class="btn" :disabled="loading || !files.length">
        {{ loading ? '拆分中...' : '拆分 PDF' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <div v-if="result" class="result">
        <p>✅ 拆分完成</p>
        <button @click="download" class="btn secondary">下载拆分文件</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePdfTool } from '../composables/usePdfTool.js'
const { files, loading, error, result, fileInput, onFiles, removeFile, formatSize, execute, download } = usePdfTool({ tool: 'split', outputExt: 'zip' })

const mode = ref('ranges')
const ranges = ref('')
const fixedPages = ref(1)

function doSplit() {
  const params = { mode: mode.value }
  if (mode.value === 'ranges' && ranges.value) {
    params.ranges = ranges.value
  }
  if (mode.value === 'fixed') {
    params.fixed_pages = fixedPages.value
  }
  execute(params)
}
</script>

<style scoped>
@import './tool-common.css';
.file-list { margin: 12px 0; }
.file-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #f5f5f7; border-radius: 8px; margin-bottom: 6px; font-size: 13px; }
.remove { color: #ff3b30; cursor: pointer; font-size: 16px; }
.error { color: #ff3b30; margin-top: 12px; font-size: 13px; }
</style>
