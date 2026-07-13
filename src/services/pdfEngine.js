/**
 * Client-side PDF processing engine using pdf-lib + pdfjs-dist + JSZip
 * No external API key required — all operations run in the browser.
 */
import { PDFDocument } from 'pdf-lib'
import * as pdfjsLib from 'pdfjs-dist'
import JSZip from 'jszip'

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

// ── helpers ──

async function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

function arrayBufferToBlob(buffer, mime = 'application/pdf') {
  return new Blob([buffer], { type: mime })
}

async function renderPageToJpeg(pdfDoc, pageNum, quality = 0.9) {
  const page = await pdfDoc.getPage(pageNum)
  const viewport = page.getViewport({ scale: 2.0 })
  const canvas = document.createElement('canvas')
  canvas.width = viewport.width
  canvas.height = viewport.height
  const ctx = canvas.getContext('2d')
  await page.render({ canvasContext: ctx, viewport }).promise
  return new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', quality))
}

// ── public API ──

export async function mergePdf(files) {
  const merged = await PDFDocument.create()
  for (const file of files) {
    const buf = await readAsArrayBuffer(file)
    const src = await PDFDocument.load(buf, { ignoreEncryption: true })
    const pages = await merged.copyPages(src, src.getPageIndices())
    pages.forEach(p => merged.addPage(p))
  }
  return arrayBufferToBlob(await merged.save({ useObjectStreams: true }))
}

export async function splitPdf(files, params = {}) {
  const buf = await readAsArrayBuffer(files[0])
  const src = await PDFDocument.load(buf, { ignoreEncryption: true })
  const total = src.getPageCount()

  let pageNums = []
  if (params.mode === 'fixed') {
    const perChunk = Math.max(1, parseInt(params.fixed_pages) || 1)
    const end = Math.min(perChunk, total)
    for (let i = 0; i < end; i++) pageNums.push(i)
  } else {
    const rangeStr = params.ranges || `1-${total}`
    const parts = rangeStr.split(',').map(s => s.trim()).filter(Boolean)
    for (const part of parts) {
      if (part.includes('-')) {
        const [a, b] = part.split('-').map(Number)
        for (let i = Math.max(1, a) - 1; i < Math.min(total, b); i++) pageNums.push(i)
      } else {
        const n = parseInt(part)
        if (n >= 1 && n <= total) pageNums.push(n - 1)
      }
    }
  }

  if (!pageNums.length) throw new Error('没有匹配的页面')

  const out = await PDFDocument.create()
  const pages = await out.copyPages(src, [...new Set(pageNums)])
  pages.forEach(p => out.addPage(p))
  return arrayBufferToBlob(await out.save({ useObjectStreams: true }))
}

export async function compressPdf(files, params = {}) {
  const buf = await readAsArrayBuffer(files[0])
  const src = await PDFDocument.load(buf, { ignoreEncryption: true })
  return arrayBufferToBlob(await src.save({ useObjectStreams: true }))
}

export async function pdfToJpg(files) {
  const buf = await readAsArrayBuffer(files[0])
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise
  const zip = new JSZip()
  const ext = 'jpg'

  for (let i = 1; i <= pdf.numPages; i++) {
    const blob = await renderPageToJpeg(pdf, i, 0.9)
    zip.file(`page_${String(i).padStart(3, '0')}.${ext}`, blob)
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' })
  return zipBlob
}

export async function jpgToPdf(files) {
  const doc = await PDFDocument.create()
  for (const file of files) {
    const buf = await readAsArrayBuffer(file)
    let img
    if (file.type === 'image/jpeg' || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')) {
      img = await doc.embedJpg(buf)
    } else {
      img = await doc.embedPng(buf)
    }
    const page = doc.addPage([img.width, img.height])
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
  }
  return arrayBufferToBlob(await doc.save({ useObjectStreams: true }))
}

// ── Web Crypto helpers (AES-GCM file-level encryption) ──

async function deriveKey(password, salt) {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
  )
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}

export async function protectPdf(files, params = {}) {
  const password = params.password || ''
  if (!password) throw new Error('请设置密码')

  const buf = await readAsArrayBuffer(files[0])
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(password, salt)

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    buf
  )

  const payload = {
    salt: arrayBufferToBase64(salt),
    iv: arrayBufferToBase64(iv),
    data: arrayBufferToBase64(encrypted),
    filename: files[0].name
  }

  const html = `<!doctype html>
<html lang="zh-CN">
<head><meta charset="UTF-8"><title>PDF 解密</title>
<style>body{font-family:-apple-system,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f5f5f7;margin:0}.box{background:#fff;padding:32px;border-radius:14px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,.1);max-width:400px}h2{margin:0 0 8px}input{width:100%;padding:10px;margin:16px 0;border:1px solid #d2d2d7;border-radius:8px;font-size:14px}button{padding:10px 24px;background:#0071e3;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer}.err{color:#ff3b30;margin-top:8px;font-size:13px}</style></head>
<body><div class="box"><h2>🔒 加密 PDF</h2><p style="color:#86868b">输入密码以解密: ${payload.filename}</p><input type="password" id="pw" placeholder="输入密码"><button onclick="decrypt()">解密并下载</button><p class="err" id="err"></p></div>
<script>
async function decrypt(){const e=document.getElementById('err');e.textContent='';const pw=document.getElementById('pw').value;if(!pw){e.textContent='请输入密码';return}
try{const payload=${JSON.stringify(payload)};
const enc=new TextEncoder();const salt=new Uint8Array([...atob(payload.salt)].map(c=>c.charCodeAt(0)));const iv=new Uint8Array([...atob(payload.iv)].map(c=>c.charCodeAt(0)));const encData=new Uint8Array([...atob(payload.data)].map(c=>c.charCodeAt(0)));
const km=await crypto.subtle.importKey('raw',enc.encode(pw),'PBKDF2',false,['deriveKey']);
const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:100000,hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['decrypt']);
const dec=await crypto.subtle.decrypt({name:'AES-GCM',iv},key,encData);
const blob=new Blob([dec],{type:'application/pdf'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=payload.filename;a.click();URL.revokeObjectURL(url)}
catch(ex){e.textContent='密码错误或文件损坏'}}
</script></body></html>`

  return new Blob([html], { type: 'text/html' })
}

export async function unlockPdf(files, params = {}) {
  const password = params.password || ''
  if (!password) throw new Error('请输入密码')
  const buf = await readAsArrayBuffer(files[0])
  try {
    const pdf = await pdfjsLib.getDocument({ data: buf, password }).promise
    const newDoc = await PDFDocument.create()
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale: 2.0 })
      const canvas = document.createElement('canvas')
      canvas.width = viewport.width
      canvas.height = viewport.height
      const ctx = canvas.getContext('2d')
      await page.render({ canvasContext: ctx, viewport }).promise
      const imgBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
      const imgBuf = await imgBlob.arrayBuffer()
      const img = await newDoc.embedPng(imgBuf)
      const newPage = newDoc.addPage([img.width, img.height])
      newPage.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
    }
    return arrayBufferToBlob(await newDoc.save({ useObjectStreams: true }))
  } catch (e) {
    throw new Error('密码错误，或文件不是加密 PDF')
  }
}

export async function pdfToWord(files) {
  const buf = await readAsArrayBuffer(files[0])
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise
  const texts = []

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items.map(item => item.str).join(' ')
    texts.push(`[第 ${i} 页]\n${pageText}\n`)
  }

  const fullText = texts.join('\n')
  const bom = '﻿'
  return new Blob([bom + fullText], { type: 'application/msword;charset=utf-8' })
}
