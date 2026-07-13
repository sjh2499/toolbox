<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>📱 二维码生成</h2>
    </div>
    <div class="tool-body">
      <textarea v-model="text" placeholder="输入要生成二维码的内容" rows="3"></textarea>
      <button @click="generate" class="btn">生成二维码</button>
      <div v-if="qrDataUrl" class="result">
        <img :src="qrDataUrl" alt="QR Code" />
        <a :href="qrDataUrl" download="qrcode.png" class="btn secondary">下载</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QRCode from 'qrcode'

const text = ref('')
const qrDataUrl = ref('')

async function generate() {
  if (!text.value) return
  const canvas = document.createElement('canvas')
  await QRCode.toCanvas(canvas, text.value, { width: 300, margin: 2 })
  qrDataUrl.value = canvas.toDataURL('image/png')
}
</script>

<style scoped>
@import './tool-common.css';
</style>
