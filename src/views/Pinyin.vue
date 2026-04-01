<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🀄 汉字转拼音</h2>
    </div>
    <div class="tool-body">
      <textarea v-model="input" placeholder="输入中文…" rows="4"></textarea>
      <div class="flex" style="margin-bottom:12px">
        <label><input type="checkbox" v-model="withTone" /> 带声调</label>
      </div>
      <button @click="convert" class="btn">转换</button>
      <div class="output" @click="copy(output)">{{ output }}</div>
      <p class="label" style="margin-top:8px">注：基于 pinyin-pro，多音字取常见读音</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { pinyin } from 'pinyin-pro'

const input = ref('')
const output = ref('')
const withTone = ref(true)

function convert() {
  if (!input.value) { output.value = ''; return }
  try {
    const toneType = withTone.value ? 'symbol' : 'none'
    output.value = pinyin(input.value, { toneType, type: 'string' })
  } catch (e) {
    output.value = '转换出错：' + e.message
  }
}

function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>@import './tool-common.css';</style>
