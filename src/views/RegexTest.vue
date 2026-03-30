<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🔍 正则测试</h2>
    </div>
    <div class="tool-body">
      <div class="row">
        <input type="text" v-model="pattern" placeholder="正则表达式，如 \d+" />
        <input type="text" v-model="flags" placeholder="标志 gims" style="width:80px" />
      </div>
      <textarea v-model="text" placeholder="测试文本…" rows="5"></textarea>
      <div v-if="error" style="color:#ff3b30;font-size:13px;margin-bottom:8px">{{ error }}</div>
      <div v-if="matches.length" class="result">
        <p class="label">匹配结果 ({{ matches.length }})</p>
        <div v-for="(m,i) in matches" :key="i" class="output" @click="copy(m)">{{ m }}</div>
      </div>
      <div v-else-if="pattern && text" class="output">无匹配</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const pattern = ref(''), flags = ref('g'), text = ref(''), error = ref('')

const matches = computed(() => {
  if (!pattern.value || !text.value) return []
  try {
    error.value = ''
    const re = new RegExp(pattern.value, flags.value)
    return text.value.match(re) || []
  } catch (e) { error.value = e.message; return [] }
})
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>@import './tool-common.css';</style>
