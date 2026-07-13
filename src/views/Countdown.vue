<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>⏳ 倒计时</h2>
    </div>
    <div class="tool-body">
      <div class="row">
        <input type="text" v-model="label" placeholder="倒计时名称（可选）" />
      </div>
      <div class="row">
        <input type="number" v-model.number="mins" placeholder="分钟" style="width:100px" />
        <input type="number" v-model.number="secs" placeholder="秒" style="width:100px" />
      </div>
      <div class="flex" style="margin-bottom:16px">
        <button @click="start" class="btn" :disabled="running">开始</button>
        <button @click="pause" class="btn secondary" :disabled="!running">暂停</button>
        <button @click="reset" class="btn danger">重置</button>
      </div>
      <div class="display">{{ display }}</div>
      <p v-if="finished" class="done">⏰ 时间到！{{ label }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
const label = ref(''), mins = ref(5), secs = ref(0)
const remaining = ref(0), running = ref(false), finished = ref(false)
let timer = null

const display = computed(() => {
  const s = Math.max(0, remaining.value)
  const m = Math.floor(s / 60), ss = s % 60
  return `${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`
})

function start() {
  if (running.value) return
  if (remaining.value <= 0) {
    const m = Math.max(0, mins.value || 0)
    const s = Math.max(0, secs.value || 0)
    remaining.value = m * 60 + s
  }
  if (remaining.value <= 0) { finished.value = true; return }
  finished.value = false; running.value = true
  timer = setInterval(() => { remaining.value--; if (remaining.value <= 0) { clearInterval(timer); running.value = false; finished.value = true } }, 1000)
}
function pause() { clearInterval(timer); running.value = false }
function reset() { clearInterval(timer); running.value = false; finished.value = false; remaining.value = 0 }
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
@import './tool-common.css';
.display { font-size: 64px; font-weight: 700; text-align: center; font-variant-numeric: tabular-nums; color: #1d1d1f; }
.done { text-align: center; color: #ff3b30; font-size: 18px; margin-top: 16px; font-weight: 600; }
</style>
