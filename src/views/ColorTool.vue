<template>
  <div class="tool-page">
    <div class="tool-header">
      <router-link to="/" class="back">← 返回</router-link>
      <h2>🎨 颜色工具</h2>
    </div>
    <div class="tool-body">
      <div class="color-preview" :style="{ background: hex }"></div>
      <div class="row">
        <label class="label">HEX</label>
        <input type="text" v-model="hex" @input="fromHex" placeholder="#0071e3" />
      </div>
      <div class="row">
        <label class="label">RGB</label>
        <input type="text" v-model="rgbStr" @input="fromRgb" placeholder="rgb(0, 113, 227)" />
      </div>
      <div class="row">
        <label class="label">HSL</label>
        <input type="text" v-model="hslStr" @input="fromHsl" placeholder="hsl(210, 100%, 45%)" />
      </div>
      <div class="flex" style="margin-top:12px">
        <div class="output" @click="copy(hex)" style="flex:1">HEX: {{ hex }}</div>
        <div class="output" @click="copy(rgbStr)" style="flex:1">RGB: {{ rgbStr }}</div>
        <div class="output" @click="copy(hslStr)" style="flex:1">HSL: {{ hslStr }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const hex = ref('#0071e3')
const rgbStr = ref('rgb(0, 113, 227)')
const hslStr = ref('hsl(210, 100%, 45%)')

function hexToRgb(h) {
  h = h.replace('#', '')
  if (h.length === 3) h = h.split('').map(c => c + c).join('')
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]
}
function rgbToHex(r,g,b) { return '#' + [r,g,b].map(c => c.toString(16).padStart(2,'0')).join('') }
function rgbToHsl(r,g,b) {
  r/=255; g/=255; b/=255
  const max=Math.max(r,g,b), min=Math.min(r,g,b), d=max-min
  let h=0, s=0, l=(max+min)/2
  if(d){ s=l>.5?d/(2-max-min):d/(max-min); switch(max){ case r:h=((g-b)/d+(g<b?6:0))/6;break; case g:h=((b-r)/d+2)/6;break; case b:h=((r-g)/d+4)/6;break; } }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)]
}
function hslToRgb(h,s,l) {
  h/=360; s/=100; l/=100
  let r,g,b
  if(!s) r=g=b=l
  else { const q=l<.5?l*(1+s):l+s-l*s, p=2*l-q; const hue2rgb=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p}; r=hue2rgb(p,q,h+1/3); g=hue2rgb(p,q,h); b=hue2rgb(p,q,h-1/3) }
  return [Math.round(r*255), Math.round(g*255), Math.round(b*255)]
}

function fromHex() {
  try { const [r,g,b]=hexToRgb(hex.value); rgbStr.value=`rgb(${r}, ${g}, ${b})`; const [h,s,l]=rgbToHsl(r,g,b); hslStr.value=`hsl(${h}, ${s}%, ${l}%)` } catch {}
}
function fromRgb() {
  const m = rgbStr.value.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if(m){ const r=+m[1],g=+m[2],b=+m[3]; hex.value=rgbToHex(r,g,b); const [h,s,l]=rgbToHsl(r,g,b); hslStr.value=`hsl(${h}, ${s}%, ${l}%)` }
}
function fromHsl() {
  const m = hslStr.value.match(/(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/)
  if(m){ const [r,g,b]=hslToRgb(+m[1],+m[2],+m[3]); hex.value=rgbToHex(r,g,b); rgbStr.value=`rgb(${r}, ${g}, ${b})` }
}
function copy(t) { if(t) navigator.clipboard?.writeText(t) }
</script>

<style scoped>
@import './tool-common.css';
.color-preview { width: 100%; height: 80px; border-radius: 10px; margin-bottom: 16px; border: 1px solid #d2d2d7; }
</style>
