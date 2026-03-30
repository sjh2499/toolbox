<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🔀 文本对比</h2>
    </div>
    <div class="tool-body">
      <div class="diff-inputs">
        <textarea v-model="textA" placeholder="文本 A" rows="6"></textarea>
        <textarea v-model="textB" placeholder="文本 B" rows="6"></textarea>
      </div>
      <button @click="compare" class="btn">对比</button>
      <div v-if="result.length" class="diff-result">
        <div v-for="(line, i) in result" :key="i" :class="['diff-line', line.type]">
          <span class="diff-mark">{{ line.type === 'add' ? '+' : line.type === 'del' ? '-' : ' ' }}</span>
          {{ line.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const textA = ref(''), textB = ref(''), result = ref([])

function compare() {
  const a = textA.value.split('\n'), b = textB.value.split('\n')
  const max = Math.max(a.length, b.length)
  result.value = []
  for (let i = 0; i < max; i++) {
    if (i >= a.length) result.value.push({ text: b[i], type: 'add' })
    else if (i >= b.length) result.value.push({ text: a[i], type: 'del' })
    else if (a[i] === b[i]) result.value.push({ text: a[i], type: 'same' })
    else { result.value.push({ text: a[i], type: 'del' }); result.value.push({ text: b[i], type: 'add' }) }
  }
}
</script>

<style scoped>
@import './tool-common.css';
.diff-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.diff-result { margin-top: 16px; background: #f5f5f7; border-radius: 8px; padding: 12px; font-family: 'SF Mono', Menlo, monospace; font-size: 13px; }
.diff-line { padding: 2px 8px; border-radius: 3px; }
.diff-line.add { background: #d4edda; color: #155724; }
.diff-line.del { background: #f8d7da; color: #721c24; }
.diff-mark { display: inline-block; width: 16px; font-weight: 700; }
</style>
