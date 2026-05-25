<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>📋 Base64 编解码</h2>
    </div>
    <div class="tool-body">
      <textarea v-model="input" placeholder="输入文本…" rows="4"></textarea>
      <div class="flex" style="margin-bottom:12px">
        <button @click="encode" class="btn">编码</button>
        <button @click="decode" class="btn secondary">解码</button>
      </div>
      <div class="output" @click="copy(output)">{{ output }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const input = ref(''), output = ref('')

function encode() {
  const bytes = new TextEncoder().encode(input.value)
  const binStr = Array.from(bytes, b => String.fromCharCode(b)).join('')
  output.value = btoa(binStr)
}
function decode() {
  try {
    const binStr = atob(input.value)
    const bytes = new Uint8Array([...binStr].map(c => c.charCodeAt(0)))
    output.value = new TextDecoder().decode(bytes)
  } catch { output.value = '解码失败：不是有效的 Base64' }
}
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>@import './tool-common.css';</style>
