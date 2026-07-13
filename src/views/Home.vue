<template>
  <div class="home">
    <header class="header">
      <h1>力太阳工具箱</h1>
      <p class="subtitle">一套在线实用工具集合，涵盖编码、加密、转换、生成等常用功能</p>
      <div class="search-box">
        <input v-model="keyword" placeholder="搜索工具…" />
      </div>
    </header>
    <div class="grid">
      <div
        v-for="t in filtered"
        :key="t.id"
        class="card"
        @click="openTool(t)"
      >
        <span class="icon">{{ t.icon }}</span>
        <span class="name">{{ t.name }}</span>
        <span class="desc">{{ t.desc }}</span>
      </div>
    </div>
    <p v-if="!filtered.length" class="empty">没有找到匹配的工具</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { tools } from '../tools'

const router = useRouter()
const keyword = ref('')
const filtered = computed(() => {
  if (!keyword.value) return tools
  const kw = keyword.value.toLowerCase()
  return tools.filter(t =>
    t.name.toLowerCase().includes(kw) ||
    t.desc.toLowerCase().includes(kw) ||
    t.id.includes(kw)
  )
})

function openTool(t) {
  router.push(`/tool/${t.id}`)
}
</script>

<style scoped>
.home { max-width: 960px; margin: 0 auto; padding: 40px 20px; }
.header { text-align: center; margin-bottom: 40px; }
.header h1 { font-size: 28px; font-weight: 700; margin-bottom: 6px; }
.subtitle { color: #86868b; font-size: 14px; margin-bottom: 20px; }
.search-box input {
  width: 100%; max-width: 400px; padding: 10px 16px;
  border: 1px solid #d2d2d7; border-radius: 10px;
  font-size: 15px; outline: none; background: #fff;
  transition: border-color .2s;
}
.search-box input:focus { border-color: #0071e3; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}
.card {
  display: flex; flex-direction: column; align-items: center;
  padding: 20px 12px; background: #fff; border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  transition: transform .15s, box-shadow .15s;
}
.card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.1); }
.icon { font-size: 32px; margin-bottom: 8px; }
.name { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.desc { font-size: 11px; color: #86868b; text-align: center; line-height: 1.3; }
.empty { text-align: center; color: #86868b; margin-top: 40px; }
</style>
