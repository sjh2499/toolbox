<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🔗 URL 编解码</h2>
    </div>
    <div class="tool-body">
      <textarea v-model="input" placeholder="输入 URL 或编码后的字符串…" rows="4"></textarea>
      <div class="flex" style="margin-bottom:12px">
        <button @click="encode" class="btn">编码</button>
        <button @click="decode" class="btn secondary">解码</button>
      </div>
      <div class="output" @click="copy(output)">{{ output }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const input = ref(''), output = ref('')

function encode() { output.value = encodeURIComponent(input.value) }
function decode() { try { output.value = decodeURIComponent(input.value) } catch { output.value = '解码失败' } }
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>@import './tool-common.css';</style>
