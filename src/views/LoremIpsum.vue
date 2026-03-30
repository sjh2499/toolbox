<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>📄 Lorem Ipsum</h2>
    </div>
    <div class="tool-body">
      <div class="row">
        <label class="label">段落数</label>
        <input type="number" v-model.number="count" min="1" max="20" style="width:100px" />
      </div>
      <div class="flex" style="margin-bottom:12px">
        <span class="chip" :class="{active:type==='p'}" @click="type='p'">段落</span>
        <span class="chip" :class="{active:type==='s'}" @click="type='s'">句子</span>
        <span class="chip" :class="{active:type==='w'}" @click="type='w'">单词</span>
      </div>
      <button @click="gen" class="btn">生成</button>
      <div class="output" @click="copy(output)" style="white-space:pre-wrap;min-height:80px">{{ output }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(3), type = ref('p'), output = ref('')

const words = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum']
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)]
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

function genSentence() {
  const len = 8 + Math.floor(Math.random() * 12)
  const w = Array.from({length: len}, () => rand(words))
  return cap(w.join(' ')) + '.'
}
function genParagraph() {
  const s = 3 + Math.floor(Math.random() * 5)
  return Array.from({length: s}, genSentence).join(' ')
}
function gen() {
  if (type.value === 'w') { output.value = Array.from({length: count.value * 50}, () => rand(words)).join(' '); return }
  if (type.value === 's') { output.value = Array.from({length: count.value}, genSentence).join(' '); return }
  output.value = Array.from({length: count.value}, genParagraph).join('\n\n')
}
function copy(t) { if (t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>@import './tool-common.css';</style>
