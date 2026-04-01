<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>📑 合并 PDF</h2>
    </div>
    <div class="tool-body">
      <p class="label">选择多个 PDF 文件，合并为一个文件</p>
      <input type="file" accept=".pdf" multiple @change="onFiles" ref="fileInput" />
      <div v-if="files.length" class="file-list">
        <div v-for="(f, i) in files" :key="i" class="file-item">
          <span>{{ i + 1 }}. {{ f.name }} ({{ formatSize(f.size) }})</span>
          <span class="remove" @click="removeFile(i)">✕</span>
        </div>
      </div>
      <button @click="execute()" class="btn" :disabled="loading || files.length < 2">
        {{ loading ? '合并中...' : '合并 PDF' }}
      </button>
      <p v-if="files.length === 1" class="label" style="color:#ff9500">请至少选择 2 个文件</p>
      <p v-if="error" class="error">{{ error }}</p>
      <div v-if="result" class="result">
        <p>✅ 合并完成</p>
        <button @click="download" class="btn secondary">下载合并后的 PDF</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePdfTool } from '../composables/usePdfTool.js'
const { files, loading, error, result, fileInput, onFiles, removeFile, formatSize, execute, download } = usePdfTool({ tool: 'merge', outputExt: 'pdf' })
</script>

<style scoped>
@import './tool-common.css';
.file-list { margin: 12px 0; }
.file-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #f5f5f7; border-radius: 8px; margin-bottom: 6px; font-size: 13px; }
.remove { color: #ff3b30; cursor: pointer; font-size: 16px; }
.error { color: #ff3b30; margin-top: 12px; font-size: 13px; }
</style>
