<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>📝 文字统计</h2>
    </div>
    <div class="tool-body">
      <textarea v-model="text" placeholder="在此粘贴文字…" rows="8"></textarea>
      <div class="stats-grid">
        <div class="stat"><span class="num">{{ chars }}</span><span class="lbl">字符数</span></div>
        <div class="stat"><span class="num">{{ noSpace }}</span><span class="lbl">不含空格</span></div>
        <div class="stat"><span class="num">{{ lines }}</span><span class="lbl">行数</span></div>
        <div class="stat"><span class="num">{{ paragraphs }}</span><span class="lbl">段落</span></div>
        <div class="stat"><span class="num">{{ cnChars }}</span><span class="lbl">中文字符</span></div>
        <div class="stat"><span class="num">{{ words }}</span><span class="lbl">英文单词</span></div>
        <div class="stat"><span class="num">{{ bytes }}</span><span class="lbl">字节数(UTF-8)</span></div>
        <div class="stat"><span class="num">{{ sentences }}</span><span class="lbl">句子数</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const text = ref('')
const chars = computed(() => text.value.length)
const noSpace = computed(() => text.value.replace(/\s/g, '').length)
const lines = computed(() => text.value ? text.value.split('\n').length : 0)
const paragraphs = computed(() => text.value ? text.value.split(/\n\s*\n/).filter(Boolean).length : 0)
const cnChars = computed(() => (text.value.match(/[\u4e00-\u9fff]/g) || []).length)
const words = computed(() => (text.value.match(/[a-zA-Z]+/g) || []).length)
const bytes = computed(() => new TextEncoder().encode(text.value).length)
const sentences = computed(() => text.value ? (text.value.match(/[.。!！?？]+/g) || []).length : 0)
</script>

<style scoped>
@import './tool-common.css';
.stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; margin-top: 16px; }
.stat { background: #f5f5f7; border-radius: 10px; padding: 14px; text-align: center; }
.num { display: block; font-size: 24px; font-weight: 700; color: #0071e3; }
.lbl { font-size: 12px; color: #86868b; }
</style>
