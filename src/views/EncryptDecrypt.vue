<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🔐 加密解密</h2>
    </div>
    <div class="tool-body">
      <div class="flex" style="margin-bottom:12px">
        <span class="chip" :class="{active:mode==='encrypt'}" @click="mode='encrypt'">加密</span>
        <span class="chip" :class="{active:mode==='decrypt'}" @click="mode='decrypt'">解密</span>
      </div>
      <div class="flex" style="margin-bottom:12px">
        <span class="chip" :class="{active:algo==='base64'}" @click="algo='base64'">Base64</span>
        <span class="chip" :class="{active:algo==='aes'}" @click="algo='aes'">AES</span>
        <span class="chip" :class="{active:algo==='des'}" @click="algo='des'">DES</span>
        <span class="chip" :class="{active:algo==='rc4'}" @click="algo='rc4'">RC4</span>
        <span class="chip" :class="{active:algo==='rabbit'}" @click="algo='rabbit'">Rabbit</span>
      </div>
      <textarea v-model="input" :placeholder="mode==='encrypt'?'输入要加密的内容':'输入要解密的内容'" rows="4"></textarea>
      <input v-if="algo!=='base64'" type="text" v-model="key" placeholder="输入密钥" />
      <button @click="run" class="btn">{{ mode==='encrypt'?'加密':'解密' }}</button>
      <div class="output" @click="copy(output)">{{ output }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CryptoJS from 'crypto-js'

const mode = ref('encrypt')
const algo = ref('base64')
const input = ref('')
const key = ref('')
const output = ref('')

function run() {
  try {
    if (algo.value === 'base64') {
      const utf8ToB64 = (s) => btoa(Array.from(new TextEncoder().encode(s), b => String.fromCharCode(b)).join(''))
      const b64ToUtf8 = (s) => new TextDecoder().decode(new Uint8Array([...atob(s)].map(c => c.charCodeAt(0))))
      output.value = mode.value === 'encrypt' ? utf8ToB64(input.value) : b64ToUtf8(input.value)
      return
    }
    if (!key.value) { output.value = '请输入密钥'; return }
    const methods = { aes: CryptoJS.AES, des: CryptoJS.DES, rc4: CryptoJS.RC4, rabbit: CryptoJS.Rabbit }
    const m = methods[algo.value]
    output.value = mode.value === 'encrypt'
      ? m.encrypt(input.value, key.value).toString()
      : m.decrypt(input.value, key.value).toString(CryptoJS.enc.Utf8)
  } catch (e) { output.value = '错误: ' + e.message }
}
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>@import './tool-common.css';</style>
