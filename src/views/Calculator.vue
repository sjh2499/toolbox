<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🧮 计算器</h2>
    </div>
    <div class="tool-body calc">
      <div class="display">{{ display || '0' }}</div>
      <div class="buttons">
        <button v-for="b in buttons" :key="b" :class="btnClass(b)" @click="press(b)">{{ b }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const display = ref(''), expr = ref('')
const buttons = ['C','(',')','÷','7','8','9','×','4','5','6','−','1','2','3','+','0','.','⌫','=']

function btnClass(b) {
  if ('÷×−+='.includes(b)) return 'op'
  if (b === 'C') return 'clr'
  return ''
}
function press(b) {
  if (b === 'C') { display.value = ''; return }
  if (b === '⌫') { display.value = display.value.slice(0, -1); return }
  if (b === '=') {
    try {
      const e = display.value.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-')
      display.value = String(eval(e))
    } catch { display.value = 'Error' }
    return
  }
  display.value += b
}
</script>

<style scoped>
@import './tool-common.css';
.calc { padding: 16px; }
.display { font-size: 36px; text-align: right; padding: 16px; font-variant-numeric: tabular-nums; min-height: 60px; overflow: hidden; }
.buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.buttons button { padding: 18px; font-size: 20px; border: none; border-radius: 10px; background: #f5f5f7; font-weight: 500; transition: background .15s; }
.buttons button:hover { background: #e5e5ea; }
.buttons button.op { background: #0071e3; color: #fff; }
.buttons button.op:hover { background: #0077ed; }
.buttons button.clr { background: #ff3b30; color: #fff; }
</style>
