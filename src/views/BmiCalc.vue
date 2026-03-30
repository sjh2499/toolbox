<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>⚖️ BMI 计算</h2>
    </div>
    <div class="tool-body">
      <div class="row">
        <label class="label">身高 (cm)</label>
        <input type="number" v-model.number="height" placeholder="170" />
      </div>
      <div class="row">
        <label class="label">体重 (kg)</label>
        <input type="number" v-model.number="weight" placeholder="65" />
      </div>
      <button @click="calc" class="btn">计算</button>
      <div v-if="bmi" class="result-card">
        <div class="bmi-value" :style="{color: color}">{{ bmi }}</div>
        <div class="bmi-label">{{ label }}</div>
        <div class="bmi-bar">
          <div class="bar-fill" :style="{width: barWidth + '%', background: color}"></div>
        </div>
        <div class="bmi-range">
          <span>偏瘦 &lt;18.5</span><span>正常 18.5-24</span><span>偏胖 24-28</span><span>肥胖 &gt;28</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const height = ref(170), weight = ref(65)
const bmi = ref(''), label = ref(''), color = ref('#0071e3'), barWidth = ref(0)

function calc() {
  if (!height.value || !weight.value) return
  const v = weight.value / ((height.value / 100) ** 2)
  bmi.value = v.toFixed(1)
  if (v < 18.5) { label.value = '偏瘦'; color.value = '#0071e3'; barWidth.value = v / 40 * 100 }
  else if (v < 24) { label.value = '正常'; color.value = '#34c759'; barWidth.value = v / 40 * 100 }
  else if (v < 28) { label.value = '偏胖'; color.value = '#ff9500'; barWidth.value = v / 40 * 100 }
  else { label.value = '肥胖'; color.value = '#ff3b30'; barWidth.value = Math.min(100, v / 40 * 100) }
}
</script>

<style scoped>
@import './tool-common.css';
.result-card { text-align: center; margin-top: 20px; }
.bmi-value { font-size: 48px; font-weight: 700; }
.bmi-label { font-size: 18px; margin: 8px 0 16px; }
.bmi-bar { height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 4px; transition: width .3s; }
.bmi-range { display: flex; justify-content: space-between; margin-top: 8px; font-size: 11px; color: #86868b; }
</style>
