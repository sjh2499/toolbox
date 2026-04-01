<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🖼️ PDF 转 JPG</h2>
    </div>
    <div class="tool-body">
      <p class="label">将 PDF 每页转为 JPG 图片</p>
      <input type="file" accept=".pdf" @change="onFiles" ref="fileInput" />
      <div v-if="files.length" class="file-list">
        <div v-for="(f, i) in files" :key="i" class="file-item">
          <span>{{ f.name }} ({{ formatSize(f.size) }})</span>
          <span class="remove" @click="removeFile(i)">✕</span>
        </div>
      </div>
      <button @click="execute()" class="btn" :disabled="loading || !files.length">
        {{ loading ? '转换中...' : '转换为 JPG' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <div v-if="result" class="result">
        <p>✅ 转换完成</p>
        <button @click="download" class="btn secondary">下载 JPG 图片</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePdfTool } from '../composables/usePdfTool.js'
const { files, loading, error, result, fileInput, onFiles, removeFile, formatSize, execute, download } = usePdfTool({ tool: 'pdfjpg', outputExt: 'zip' })
</script>

<style scoped>
@import './tool-common.css';
.file-list { margin: 12px 0; }
.file-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #f5f5f7; border-radius: 8px; margin-bottom: 6px; font-size: 13px; }
.remove { color: #ff3b30; cursor: pointer; font-size: 16px; }
.error { color: #ff3b30; margin-top: 12px; font-size: 13px; }
</style>
