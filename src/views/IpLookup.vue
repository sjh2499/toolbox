<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🌐 IP 查询</h2>
    </div>
    <div class="tool-body">
      <div class="row">
        <input type="text" v-model="ip" placeholder="留空查询本机 IP，或输入指定 IP" />
        <button @click="lookup" class="btn">查询</button>
      </div>
      <div v-if="loading" class="output">查询中…</div>
      <div v-if="info" class="info-grid">
        <div v-for="(v,k) in info" :key="k" class="info-item">
          <span class="info-key">{{ k }}</span>
          <span class="info-val">{{ v }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const ip = ref(''), info = ref(null), loading = ref(false)

async function lookup() {
  loading.value = true; info.value = null
  try {
    const url = ip.value ? `https://ipapi.co/${ip.value}/json/` : 'https://ipapi.co/json/'
    const r = await fetch(url)
    const d = await r.json()
    info.value = {
      'IP': d.ip,
      '城市': d.city,
      '地区': d.region,
      '国家': d.country_name,
      '时区': d.timezone,
      'ISP': d.org,
      '经纬度': `${d.latitude}, ${d.longitude}`,
    }
  } catch (e) { info.value = { '错误': e.message } }
  loading.value = false
}
</script>

<style scoped>
@import './tool-common.css';
.info-grid { margin-top: 16px; }
.info-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
.info-item:last-child { border-bottom: none; }
.info-key { font-size: 13px; color: #86868b; }
.info-val { font-size: 14px; font-weight: 500; }
</style>
