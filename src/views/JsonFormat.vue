<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>{ } JSON 格式化</h2>
    </div>
    <div class="tool-body">
      <textarea v-model="input" placeholder="粘贴 JSON 字符串…" rows="8"></textarea>
      <div class="flex" style="margin-bottom:12px">
        <button @click="format" class="btn">格式化</button>
        <button @click="compress" class="btn secondary">压缩</button>
        <button @click="sort" class="btn secondary">排序键</button>
        <button @click="copy(output)" class="btn secondary">复制</button>
      </div>
      <div class="output" style="white-space:pre-wrap;min-height:120px">{{ output }}</div>
      <p v-if="error" style="color:#ff3b30;margin-top:8px;font-size:13px">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const input = ref(''), output = ref(''), error = ref('')

function parse() {
  try { error.value = ''; const d = JSON.parse(input.value); return { ok: true, data: d } }
  catch (e) { error.value = e.message; return { ok: false, data: null } }
}
function format() { const r = parse(); if (r.ok) output.value = JSON.stringify(r.data, null, 2) }
function compress() { const r = parse(); if (r.ok) output.value = JSON.stringify(r.data) }
function sort() { const r = parse(); if (r.ok) output.value = JSON.stringify(sortKeys(r.data), null, 2) }
function sortKeys(obj) {
  if (Array.isArray(obj)) return obj.map(sortKeys)
  if (obj && typeof obj === 'object') return Object.keys(obj).sort().reduce((o, k) => { o[k] = sortKeys(obj[k]); return o }, {})
  return obj
}
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>@import './tool-common.css';</style>
