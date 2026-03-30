<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🔑 密码生成</h2>
    </div>
    <div class="tool-body">
      <div class="row">
        <label class="label">长度: {{ length }}</label>
        <input type="range" v-model.number="length" min="4" max="64" style="flex:1" />
      </div>
      <div class="checks">
        <label><input type="checkbox" v-model="upper" /> 大写字母 A-Z</label>
        <label><input type="checkbox" v-model="lower" /> 小写字母 a-z</label>
        <label><input type="checkbox" v-model="digits" /> 数字 0-9</label>
        <label><input type="checkbox" v-model="symbols" /> 特殊字符 !@#$</label>
      </div>
      <button @click="gen" class="btn">生成密码</button>
      <div class="output" @click="copy(pw)" style="font-size:18px;letter-spacing:2px">{{ pw }}</div>
      <div v-if="pw" class="strength" :style="{color: strengthColor}">{{ strengthText }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const length = ref(16), upper = ref(true), lower = ref(true), digits = ref(true), symbols = ref(true)
const pw = ref('')

function gen() {
  let chars = ''
  if (upper.value) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (lower.value) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (digits.value) chars += '0123456789'
  if (symbols.value) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  if (!chars) { pw.value = '请至少选一种字符'; return }
  const arr = new Uint32Array(length.value)
  crypto.getRandomValues(arr)
  pw.value = Array.from(arr, v => chars[v % chars.length]).join('')
}
const strengthText = computed(() => {
  if (!pw.value) return ''
  const s = (upper.value?1:0)+(lower.value?1:0)+(digits.value?1:0)+(symbols.value?1:0)
  if (length.value >= 16 && s >= 3) return '💪 非常强'
  if (length.value >= 12 && s >= 2) return '✅ 强'
  if (length.value >= 8) return '⚠️ 一般'
  return '❌ 弱'
})
const strengthColor = computed(() => {
  if (!pw.value) return '#86868b'
  const s = (upper.value?1:0)+(lower.value?1:0)+(digits.value?1:0)+(symbols.value?1:0)
  if (length.value >= 16 && s >= 3) return '#34c759'
  if (length.value >= 12 && s >= 2) return '#0071e3'
  if (length.value >= 8) return '#ff9500'
  return '#ff3b30'
})
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>
@import './tool-common.css';
input[type="range"] { accent-color: #0071e3; }
.checks { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.checks label { font-size: 14px; display: flex; align-items: center; gap: 8px; }
.strength { margin-top: 8px; font-size: 14px; font-weight: 600; }
</style>
