<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🎲 随机数</h2>
    </div>
    <div class="tool-body">
      <div class="row">
        <label class="label">最小值</label>
        <input type="number" v-model.number="min" />
      </div>
      <div class="row">
        <label class="label">最大值</label>
        <input type="number" v-model.number="max" />
      </div>
      <div class="row">
        <label class="label">数量</label>
        <input type="number" v-model.number="count" min="1" max="100" />
      </div>
      <div class="flex" style="margin-bottom:12px">
        <label><input type="checkbox" v-model="noRepeat" /> 不重复</label>
        <label><input type="checkbox" v-model="sorted" /> 排序</label>
      </div>
      <button @click="generate" class="btn">生成</button>
      <div class="output" @click="copy(result)">{{ result }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const min = ref(1), max = ref(100), count = ref(1)
const noRepeat = ref(false), sorted = ref(false), result = ref('')

function generate() {
  const range = max.value - min.value + 1
  if (noRepeat.value && count.value > range) { result.value = '范围不够，无法生成不重复的数'; return }
  if (noRepeat.value) {
    const nums = new Set()
    while (nums.size < count.value) {
      nums.add(Math.floor(Math.random() * range) + min.value)
    }
    let arr = [...nums]
    if (sorted.value) arr.sort((a, b) => a - b)
    result.value = arr.join(', ')
  } else {
    const arr = Array.from({length: count.value}, () => Math.floor(Math.random() * range) + min.value)
    if (sorted.value) arr.sort((a, b) => a - b)
    result.value = arr.join(', ')
  }
}
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>@import './tool-common.css';</style>
