import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { tools } from '../tools'

const componentMap = {
  'qr': () => import('../views/QrCode.vue'),
  'unit': () => import('../views/UnitConverter.vue'),
  'base': () => import('../views/BaseConverter.vue'),
  'color': () => import('../views/ColorTool.vue'),
  'text': () => import('../views/TextCounter.vue'),
  'encrypt': () => import('../views/EncryptDecrypt.vue'),
  'img-compress': () => import('../views/ImgCompress.vue'),
  'random': () => import('../views/RandomNum.vue'),
  'password': () => import('../views/PasswordGen.vue'),
  'countdown': () => import('../views/Countdown.vue'),
  'calc': () => import('../views/Calculator.vue'),
  'clock': () => import('../views/WorldClock.vue'),
  'bmi': () => import('../views/BmiCalc.vue'),
  'ip': () => import('../views/IpLookup.vue'),
  'json': () => import('../views/JsonFormat.vue'),
  'base64': () => import('../views/Base64Tool.vue'),
  'urlcode': () => import('../views/UrlCode.vue'),
  'hash': () => import('../views/HashGen.vue'),
  'lorem': () => import('../views/LoremIpsum.vue'),
  'regex': () => import('../views/RegexTest.vue'),
  'timestamp': () => import('../views/Timestamp.vue'),
  'morse': () => import('../views/MorseCode.vue'),
  'img-base64': () => import('../views/ImgToBase64.vue'),
  'diff': () => import('../views/TextDiff.vue'),
  'pinyin': () => import('../views/Pinyin.vue'),
}

const routes = [
  { path: '/', name: 'Home', component: Home },
  ...tools.map(t => ({
    path: `/tool/${t.id}`,
    name: t.id,
    component: componentMap[t.id],
    meta: { tool: t }
  }))
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.onError((error) => {
  console.error('Router error:', error)
})

export default router
