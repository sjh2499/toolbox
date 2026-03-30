<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>📐 单位换算</h2>
    </div>
    <div class="tool-body">
      <div class="flex" style="margin-bottom:12px">
        <span v-for="c in categories" :key="c.key" class="chip" :class="{active:cat===c.key}" @click="cat=c.key">{{c.label}}</span>
      </div>
      <div class="row">
        <input type="number" v-model.number="val" placeholder="输入数值" />
        <select v-model="from">
          <option v-for="u in units" :key="u.key" :value="u.key">{{u.label}}</option>
        </select>
      </div>
      <div class="row">
        <span style="font-size:20px">↓</span>
        <select v-model="to">
          <option v-for="u in units" :key="u.key" :value="u.key">{{u.label}}</option>
        </select>
      </div>
      <div class="output" @click="copy(result)">{{ result || '结果' }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const categories = [
  { key: 'length', label: '长度' },
  { key: 'weight', label: '重量' },
  { key: 'temp', label: '温度' },
  { key: 'area', label: '面积' },
  { key: 'speed', label: '速度' },
]

const unitMap = {
  length: [
    { key: 'mm', label: '毫米', toBase: 0.001 },
    { key: 'cm', label: '厘米', toBase: 0.01 },
    { key: 'm', label: '米', toBase: 1 },
    { key: 'km', label: '千米', toBase: 1000 },
    { key: 'in', label: '英寸', toBase: 0.0254 },
    { key: 'ft', label: '英尺', toBase: 0.3048 },
    { key: 'mi', label: '英里', toBase: 1609.344 },
  ],
  weight: [
    { key: 'mg', label: '毫克', toBase: 0.000001 },
    { key: 'g', label: '克', toBase: 0.001 },
    { key: 'kg', label: '千克', toBase: 1 },
    { key: 't', label: '吨', toBase: 1000 },
    { key: 'lb', label: '磅', toBase: 0.453592 },
    { key: 'oz', label: '盎司', toBase: 0.0283495 },
  ],
  temp: [
    { key: 'c', label: '摄氏 °C' },
    { key: 'f', label: '华氏 °F' },
    { key: 'k', label: '开尔文 K' },
  ],
  area: [
    { key: 'mm2', label: '平方毫米', toBase: 0.000001 },
    { key: 'cm2', label: '平方厘米', toBase: 0.0001 },
    { key: 'm2', label: '平方米', toBase: 1 },
    { key: 'km2', label: '平方千米', toBase: 1000000 },
    { key: 'ha', label: '公顷', toBase: 10000 },
    { key: 'acre', label: '英亩', toBase: 4046.86 },
  ],
  speed: [
    { key: 'ms', label: '米/秒', toBase: 1 },
    { key: 'kmh', label: '千米/时', toBase: 0.277778 },
    { key: 'mph', label: '英里/时', toBase: 0.44704 },
    { key: 'kn', label: '节', toBase: 0.514444 },
  ],
}

const cat = ref('length')
const val = ref(1)
const units = computed(() => unitMap[cat.value])
const from = ref(unitMap.length[2].key)
const to = ref(unitMap.length[3].key)

watch(cat, (c) => {
  from.value = unitMap[c][0].key
  to.value = unitMap[c][1].key
})

function convertTemp(v, f, t) {
  let c = f === 'c' ? v : f === 'f' ? (v - 32) * 5 / 9 : v - 273.15
  return t === 'c' ? c : t === 'f' ? c * 9 / 5 + 32 : c + 273.15
}

const result = computed(() => {
  if (val.value === '' || val.value === null) return ''
  const list = unitMap[cat.value]
  const fu = list.find(u => u.key === from.value)
  const tu = list.find(u => u.key === to.value)
  if (!fu || !tu) return ''
  if (cat.value === 'temp') {
    return `${convertTemp(val.value, from.value, to.value).toFixed(4)} ${tu.label}`
  }
  const base = val.value * fu.toBase
  return `${(base / tu.toBase).toFixed(6).replace(/\.?0+$/, '')} ${tu.label}`
})

function copy(text) {
  if (text) navigator.clipboard?.writeText(text)
}
</script>

<style scoped>@import './tool-common.css';</style>
