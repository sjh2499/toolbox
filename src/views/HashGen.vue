<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>#️⃣ 哈希生成</h2>
    </div>
    <div class="tool-body">
      <textarea v-model="input" placeholder="输入要计算哈希的文本…" rows="4"></textarea>
      <div class="output" @click="copy(md5)">MD5: {{ md5 }}</div>
      <div class="output" @click="copy(sha1)">SHA1: {{ sha1 }}</div>
      <div class="output" @click="copy(sha256)">SHA256: {{ sha256 }}</div>
      <div class="output" @click="copy(sha512)">SHA512: {{ sha512 }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CryptoJS from 'crypto-js'
const input = ref('')
const md5 = computed(() => input.value ? CryptoJS.MD5(input.value).toString() : '')
const sha1 = computed(() => input.value ? CryptoJS.SHA1(input.value).toString() : '')
const sha256 = computed(() => input.value ? CryptoJS.SHA256(input.value).toString() : '')
const sha512 = computed(() => input.value ? CryptoJS.SHA512(input.value).toString() : '')
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>@import './tool-common.css';</style>
