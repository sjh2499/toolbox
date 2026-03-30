<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>⏰ 时间戳转换</h2>
    </div>
    <div class="tool-body">
      <div class="section">
        <p class="label">当前时间戳</p>
        <div class="row">
          <div class="output" @click="copy(String(nowS))" style="flex:1">秒: {{ nowS }}</div>
          <div class="output" @click="copy(String(nowMs))" style="flex:1">毫秒: {{ nowMs }}</div>
        </div>
      </div>
      <div class="section">
        <p class="label">时间戳 → 日期</p>
        <div class="row">
          <input type="text" v-model="tsInput" placeholder="输入时间戳" />
          <select v-model="tsUnit">
            <option value="s">秒</option>
            <option value="ms">毫秒</option>
          </select>
        </div>
        <button @click="tsToDate" class="btn">转换</button>
        <div v-if="tsResult" class="output" @click="copy(tsResult)">{{ tsResult }}</div>
      </div>
      <div class="section">
        <p class="label">日期 → 时间戳</p>
        <div class="row">
          <input type="datetime-local" v-model="dateInput" />
        </div>
        <button @click="dateToTs" class="btn">转换</button>
        <div v-if="dateResult" class="output" @click="copy(dateResult)">
          秒: {{ dateResult.s }} | 毫秒: {{ dateResult.ms }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
const nowS = ref(Math.floor(Date.now() / 1000)), nowMs = ref(Date.now())
const timer = setInterval(() => { nowS.value = Math.floor(Date.now() / 1000); nowMs.value = Date.now() }, 1000)
onUnmounted(() => clearInterval(timer))

const tsInput = ref(''), tsUnit = ref('s'), tsResult = ref('')
const dateInput = ref(''), dateResult = ref(null)

function tsToDate() {
  let v = parseInt(tsInput.value)
  if (isNaN(v)) { tsResult.value = '无效时间戳'; return }
  if (tsUnit.value === 's') v *= 1000
  tsResult.value = new Date(v).toLocaleString('zh-CN', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
}
function dateToTs() {
  if (!dateInput.value) return
  const d = new Date(dateInput.value)
  dateResult.value = { s: Math.floor(d.getTime() / 1000), ms: d.getTime() }
}
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>
@import './tool-common.css';
.section { margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f0f0f0; }
.section:last-child { border-bottom: none; }
</style>
