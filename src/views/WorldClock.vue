<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🌍 世界时钟</h2>
    </div>
    <div class="tool-body">
      <div v-for="z in zones" :key="z.id" class="clock-item">
        <div class="zone-label">{{ z.label }}</div>
        <div class="zone-time">{{ getTime(z.tz) }}</div>
        <div class="zone-date">{{ getDate(z.tz) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
const now = ref(new Date())
const timer = setInterval(() => now.value = new Date(), 1000)
onUnmounted(() => clearInterval(timer))

const zones = [
  { id: 'local', label: '本地时间', tz: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { id: 'utc', label: 'UTC', tz: 'UTC' },
  { id: 'ny', label: '纽约 🇺🇸', tz: 'America/New_York' },
  { id: 'la', label: '洛杉矶 🇺🇸', tz: 'America/Los_Angeles' },
  { id: 'lon', label: '伦敦 🇬🇧', tz: 'Europe/London' },
  { id: 'paris', label: '巴黎 🇫🇷', tz: 'Europe/Paris' },
  { id: 'tky', label: '东京 🇯🇵', tz: 'Asia/Tokyo' },
  { id: 'syd', label: '悉尼 🇦🇺', tz: 'Australia/Sydney' },
  { id: 'dxb', label: '迪拜 🇦🇪', tz: 'Asia/Dubai' },
  { id: 'sgp', label: '新加坡 🇸🇬', tz: 'Asia/Singapore' },
]

function getTime(tz) { return now.value.toLocaleTimeString('zh-CN', { timeZone: tz, hour12: false }) }
function getDate(tz) { return now.value.toLocaleDateString('zh-CN', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' }) }
</script>

<style scoped>
@import './tool-common.css';
.clock-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #f0f0f0; }
.clock-item:last-child { border-bottom: none; }
.zone-label { font-size: 14px; color: #1d1d1f; min-width: 120px; }
.zone-time { font-size: 24px; font-weight: 700; font-variant-numeric: tabular-nums; }
.zone-date { font-size: 12px; color: #86868b; min-width: 80px; text-align: right; }
</style>
