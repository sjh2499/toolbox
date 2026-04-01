<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🔒 加密 PDF</h2>
    </div>
    <div class="tool-body">
      <p class="label">为 PDF 文件设置密码保护</p>
      <input type="file" accept=".pdf" @change="onFiles" ref="fileInput" />
      <div v-if="files.length" class="file-list">
        <div v-for="(f, i) in files" :key="i" class="file-item">
          <span>{{ f.name }} ({{ formatSize(f.size) }})</span>
          <span class="remove" @click="removeFile(i)">✕</span>
        </div>
      </div>
      <div class="row">
        <input type="text" v-model="password" placeholder="设置密码" />
      </div>
      <button @click="execute({ password })" class="btn" :disabled="loading || !files.length || !password">
        {{ loading ? '加密中...' : '加密 PDF' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <div v-if="result" class="result">
        <p>✅ 加密完成</p>
        <button @click="download" class="btn secondary">下载加密后的 PDF</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePdfTool } from '../composables/usePdfTool.js'
const { files, loading, error, result, fileInput, onFiles, removeFile, formatSize, execute, download } = usePdfTool({ tool: 'protect', outputExt: 'pdf' })
const password = ref('')
</script>

<style scoped>
@import './tool-common.css';
.file-list { margin: 12px 0; }
.file-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #f5f5f7; border-radius: 8px; margin-bottom: 6px; font-size: 13px; }
.remove { color: #ff3b30; cursor: pointer; font-size: 16px; }
.error { color: #ff3b30; margin-top: 12px; font-size: 13px; }
</style>
