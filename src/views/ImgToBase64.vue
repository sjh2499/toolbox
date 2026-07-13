<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>📸 图片转 Base64</h2>
    </div>
    <div class="tool-body">
      <div class="flex" style="margin-bottom:12px">
        <span class="chip" :class="{active:tab==='img2b64'}" @click="tab='img2b64'">图片→Base64</span>
        <span class="chip" :class="{active:tab==='b642img'}" @click="tab='b642img'">Base64→图片</span>
      </div>
      <div v-if="tab==='img2b64'">
        <input type="file" accept="image/*" @change="onFile" />
        <div class="output" @click="copy(b64)" style="word-break:break-all;max-height:200px;overflow:auto">{{ b64 ? b64.split(',')[1]?.substring(0,100)+'... ('+b64.length+' 字符)' : '' }}</div>
        <button v-if="b64" @click="copy(b64)" class="btn secondary" style="margin-top:8px">复制完整 Base64</button>
      </div>
      <div v-else>
        <textarea v-model="b64input" placeholder="粘贴 Base64 字符串…" rows="4"></textarea>
        <button @click="showImg" class="btn">显示图片</button>
        <div v-if="imgUrl" class="result"><img :src="imgUrl" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const tab = ref('img2b64'), b64 = ref(''), b64input = ref(''), imgUrl = ref('')

function onFile(e) {
  const f = e.target.files[0]; if (!f) return
  const r = new FileReader(); r.onload = () => { b64.value = r.result }; r.readAsDataURL(f)
}
function showImg() { imgUrl.value = b64input.value.startsWith('data:') ? b64input.value : 'data:image/png;base64,' + b64input.value }
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>
@import './tool-common.css';
.result img { max-width: 100%; margin-top: 12px; border-radius: 8px; }
</style>
