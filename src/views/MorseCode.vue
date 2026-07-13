<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>📡 摩尔斯电码</h2>
    </div>
    <div class="tool-body">
      <div class="flex" style="margin-bottom:12px">
        <span class="chip" :class="{active:mode==='encode'}" @click="mode='encode'">编码</span>
        <span class="chip" :class="{active:mode==='decode'}" @click="mode='decode'">解码</span>
      </div>
      <textarea v-model="input" :placeholder="mode==='encode'?'输入文本…':'输入摩尔斯电码…'" rows="4"></textarea>
      <button @click="run" class="btn">{{ mode==='encode'?'编码':'解码' }}</button>
      <div class="output" @click="copy(output)" style="white-space:pre-wrap">{{ output }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const mode = ref('encode'), input = ref(''), output = ref('')

const map = {A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..','0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.','.':'.-.-.-',',':'--..--','?':'..--..',"'":'.----.','!':'-.-.--','/':'-...-.','(':'-.--.',')':'-.--.-','&':'.-...',':':'---...',';':'-.-.-.','=':'-...-','+':'.-.-.','-':'-....-','_':'..--.-','"':'.-..-.','@':'.--.-.',' ':'/'}
const reverseMap = Object.fromEntries(Object.entries(map).map(([k,v]) => [v,k]))

function run() {
  if (mode.value === 'encode') {
    output.value = input.value.toUpperCase().split('').map(c => map[c] || '?').join(' ')
  } else {
    output.value = input.value.trim().split(/\s+/).map(c => reverseMap[c] || (c === '/' ? ' ' : '?')).join('')
  }
}
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>@import './tool-common.css';</style>
