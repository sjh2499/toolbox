<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🔢 进制转换</h2>
    </div>
    <div class="tool-body">
      <div class="row">
        <input type="text" v-model="input" placeholder="输入数字" @input="onInput" />
        <select v-model="base" @change="onInput">
          <option :value="2">二进制</option>
          <option :value="8">八进制</option>
          <option :value="10">十进制</option>
          <option :value="16">十六进制</option>
        </select>
      </div>
      <div class="output" @click="copy(bin)">二进制: {{ bin }}</div>
      <div class="output" @click="copy(oct)">八进制: {{ oct }}</div>
      <div class="output" @click="copy(dec)">十进制: {{ dec }}</div>
      <div class="output" @click="copy(hex)">十六进制: {{ hex }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const input = ref('')
const base = ref(10)
const bin = ref(''), oct = ref(''), dec = ref(''), hex = ref('')

function onInput() {
  const n = parseInt(input.value, base.value)
  if (isNaN(n) || input.value === '') { bin.value = oct.value = dec.value = hex.value = ''; return }
  bin.value = n.toString(2)
  oct.value = n.toString(8)
  dec.value = n.toString(10)
  hex.value = n.toString(16).toUpperCase()
}
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>@import './tool-common.css';</style>
