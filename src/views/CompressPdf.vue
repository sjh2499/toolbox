<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🗜️ 压缩 PDF</h2>
    </div>
    <div class="tool-body">
      <p class="label">选择 PDF 文件，减小文件大小</p>
      <input type="file" accept=".pdf" @change="onFiles" ref="fileInput" />
      <div v-if="files.length" class="file-list">
        <div v-for="(f, i) in files" :key="i" class="file-item">
          <span>{{ f.name }} ({{ formatSize(f.size) }})</span>
          <span class="remove" @click="removeFile(i)">✕</span>
        </div>
      </div>
      <div class="row">
        <label class="label">压缩级别:</label>
        <select v-model="level">
          <option value="recommended">推荐</option>
          <option value="low">低压缩（高质量）</option>
          <option value="extreme">高压缩（低质量）</option>
        </select>
      </div>
      <button @click="execute({ compression_level: level })" class="btn" :disabled="loading || !files.length">
        {{ loading ? '压缩中...' : '压缩 PDF' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <div v-if="result" class="result">
        <p>✅ 压缩完成</p>
        <button @click="download" class="btn secondary">下载压缩后的 PDF</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePdfTool } from '../composables/usePdfTool.js'
const { files, loading, error, result, fileInput, onFiles, removeFile, formatSize, execute, download } = usePdfTool({ tool: 'compress', outputExt: 'pdf' })
const level = ref('recommended')
</script>

<style scoped>
@import './tool-common.css';
.file-list { margin: 12px 0; }
.file-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #f5f5f7; border-radius: 8px; margin-bottom: 6px; font-size: 13px; }
.remove { color: #ff3b30; cursor: pointer; font-size: 16px; }
.error { color: #ff3b30; margin-top: 12px; font-size: 13px; }
</style>
