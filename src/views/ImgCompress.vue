<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🖼️ 图片压缩</h2>
    </div>
    <div class="tool-body">
      <input type="file" accept="image/*" @change="onFile" />
      <div class="row" style="margin-top:12px">
        <label class="label">质量: {{ quality }}%</label>
        <input type="range" v-model.number="quality" min="10" max="100" style="flex:1" />
      </div>
      <div class="row">
        <label class="label">最大宽度:</label>
        <input type="number" v-model.number="maxW" style="width:100px" placeholder="不限" />
      </div>
      <button @click="compress" class="btn" :disabled="!imgSrc">压缩</button>
      <div v-if="result" class="result">
        <p>原始: {{ origSize }} → 压缩后: {{ compSize }} (减少 {{ reduction }}%)</p>
        <img :src="result" />
        <a :href="result" download="compressed.jpg" class="btn secondary">下载</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const imgSrc = ref(''), result = ref('')
const quality = ref(70), maxW = ref(1920)
const origSize = ref(0), compSize = ref(0), reduction = ref(0)

function onFile(e) {
  const f = e.target.files[0]; if (!f) return
  origSize.value = f.size
  const r = new FileReader(); r.onload = () => imgSrc.value = r.result; r.readAsDataURL(f)
}
function compress() {
  const img = new Image(); img.onload = () => {
    const c = document.createElement('canvas')
    let w = img.width, h = img.height
    if (maxW.value && w > maxW.value) { h = h * maxW.value / w; w = maxW.value }
    c.width = w; c.height = h
    c.getContext('2d').drawImage(img, 0, 0, w, h)
    result.value = c.toDataURL('image/jpeg', quality.value / 100)
    const base64Part = result.value.includes(',') ? result.value.split(',')[1] : result.value
    compSize.value = Math.round(base64Part.length * 0.75)
    reduction.value = origSize.value ? Math.round((1 - compSize.value / origSize.value) * 100) : 0
  }; img.src = imgSrc.value
}
</script>

<style scoped>
@import './tool-common.css';
.result img { max-width: 100%; margin: 12px 0; border-radius: 8px; }
input[type="range"] { accent-color: #0071e3; }
</style>
