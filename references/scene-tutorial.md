# scene-tutorial.md — 教程型页面场景规范

## Core Principles

教程型页面服务于文档、指南、博客教程、知识库等内容密集型场景。设计围绕三个核心原则：

1. **Clear Information Hierarchy（清晰的信息层级）** — 读者必须能一眼识别：这是什么，分几步，每步要做什么。
2. **Step-by-Step Flow（逐步推进流）** — 内容按逻辑顺序展开，每一步有明确起点和终点。
3. **Readable（高度可读）** — 字体、行距、段距、对比度全部为长时间阅读优化。

---

## Layout Structure

```
┌──────────────────────────────────────────┐
│  Hero: 标题 + 简介 + 元信息（作者/日期/标签） │
├──────────────────────────────────────────┤
│  Table of Contents (TOC)                  │
├──────────────────────────────────────────┤
│  Section 1 — 正文内容                      │
│    ├─ 正文段落                             │
│    ├─ Callout Box（提示框）                 │
│    ├─ Code Block（代码块）                  │
│    └─ Image + Caption（配图）              │
├──────────────────────────────────────────┤
│  Section 2 — 正文内容                      │
├──────────────────────────────────────────┤
│  ...                                      │
├──────────────────────────────────────────┤
│  Summary / Key Takeaways                  │
├──────────────────────────────────────────┤
│  Prev / Next Navigation                   │
├──────────────────────────────────────────┤
│  Footer                                    │
└──────────────────────────────────────────┘
```

- 内容区使用 `max-width: 720px`，聚焦阅读。
- Hero 区简洁，不抢占正文注意力。
- TOC 在 Hero 下方，帮助读者快速定位。

---

## Typography Rules for Tutorials

教程页面正文排版规则：

| 元素 | 字号 | 行高 | 字重 | 字体 |
|------|------|------|------|------|
| 文章标题 (H1) | 36-42px | 1.25 | 700 | Fraunces |
| 章节标题 (H2) | 26-30px | 1.3 | 600 | Fraunces |
| 小节标题 (H3) | 20-24px | 1.4 | 600 | Noto Sans SC |
| 小标题 (H4) | 18px | 1.5 | 600 | Noto Sans SC |
| 正文 | 17px | 1.8 | 400 | Noto Serif SC |
| 辅助文字 | 14px | 1.6 | 400 | Noto Sans SC |
| 代码 | 14px | 1.6 | 400 | monospace |
| 图片说明 | 13px | 1.5 | 400 | Noto Sans SC |

关键规则：
- **正文必须使用衬线体** Noto Serif SC，行高 1.8，最小字号 17px —— 这是长文阅读的黄金组合。
- **标题使用 Fraunces / Noto Sans SC** 形成与正文的节奏对比。
- **正文段落宽度不超过 680px**，防止行长过长导致换行困难。
- **段落间距**使用 `margin-bottom: 1.2em`，不是空行。

```css
.tutorial-body {
  font-family: 'Noto Serif SC', serif;
  font-size: 17px;
  line-height: 1.8;
  color: var(--ink);
}

.tutorial-body p {
  margin-bottom: 1.2em;
}

.tutorial-body h2 {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--ink);
  margin-top: 2em;
  margin-bottom: 0.6em;
}

.tutorial-body h3 {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--ink);
  margin-top: 1.8em;
  margin-bottom: 0.5em;
}
```

---

## Table of Contents Component

```css
.toc {
  background: #ffffff;
  border: 1px solid rgba(26, 26, 46, 0.08);
  border-radius: 12px;
  padding: 28px 32px;
  margin-bottom: 40px;
}

.toc__title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.toc__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc__item {
  padding: 6px 0;
}

.toc__item a {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 15px;
  color: var(--ink-light);
  text-decoration: none;
  transition: color 0.2s;
  display: flex;
  align-items: baseline;
}

.toc__item a:hover {
  color: var(--primary);
}

.toc__item--level2 {
  padding-left: 20px;
}
```

- TOC 自动生成，H2 一级，H3 二级缩进。
- 点击跳转到对应锚点，平滑滚动。

---

## Step Indicator / Numbered List Styling

```css
.step-list {
  list-style: none;
  padding: 0;
  counter-reset: step;
}

.step-list__item {
  counter-increment: step;
  position: relative;
  padding-left: 56px;
  margin-bottom: 32px;
}

.step-list__item::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 2px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fraunces', serif;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  background: var(--primary);
  border-radius: 50%;
}

.step-list__item--done::before {
  background: #34C759;
  content: "✓";
  font-size: 16px;
}

.step-list__title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 4px;
}

.step-list__text {
  font-family: 'Noto Serif SC', serif;
  font-size: 16px;
  line-height: 1.75;
  color: var(--ink-light);
}
```

- 步骤序号使用圆形 Primary 蓝色背景 + 白色数字。
- 完成状态变为绿色 + 对勾。
- 序号与正文之间有足够间距（56px padding-left）。

---

## Callout Box Types

四种提示框，每种有独特的左边框颜色和背景：

```css
.callout {
  padding: 16px 20px;
  border-radius: 8px;
  border-left: 4px solid;
  margin: 24px 0;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 15px;
  line-height: 1.7;
}

.callout--info {
  background: rgba(0, 113, 227, 0.06);
  border-left-color: var(--primary);
  color: var(--ink);
}

.callout--warning {
  background: rgba(255, 149, 0, 0.08);
  border-left-color: var(--accent);
  color: var(--ink);
}

.callout--tip {
  background: rgba(52, 199, 89, 0.08);
  border-left-color: #34C759;
  color: var(--ink);
}

.callout--danger {
  background: rgba(255, 59, 48, 0.08);
  border-left-color: var(--pop);
  color: var(--ink);
}

.callout__title {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 15px;
}

.callout--info .callout__title { color: var(--primary); }
.callout--warning .callout__title { color: var(--accent); }
.callout--tip .callout__title { color: #34C759; }
.callout--danger .callout__title { color: var(--pop); }
```

使用示例：
- **Info**（蓝色）— 补充说明、背景信息。
- **Warning**（橙色）— 注意事项、潜在问题。
- **Tip**（绿色）— 实用技巧、最佳实践。
- **Danger**（红色）— 危险操作、破坏性变更。

---

## Code Block Styling

```css
/* 内联代码 */
code:not(pre code) {
  padding: 2px 6px;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.88em;
  color: var(--pop);
  background: rgba(255, 59, 48, 0.06);
  border-radius: 4px;
}

/* 代码块 */
pre {
  background: #1A1A2E;
  color: #e0e0e0;
  padding: 24px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 24px 0;
  font-size: 14px;
  line-height: 1.6;
}

pre code {
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  color: inherit;
  background: none;
  padding: 0;
  border-radius: 0;
}

/* 代码块文件名标签 */
.code-filename {
  display: inline-block;
  padding: 4px 12px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  background: #2A2A3E;
  border-radius: 6px 6px 0 0;
  margin-bottom: -1px;
}
```

- 代码块使用深色背景 `#1A1A2E`（Ink 色），与页面形成对比。
- 内联代码使用 Pop 红标记，引起注意。
- 支持文件名标签（可选）。

---

## Image Caption Styling

```css
.figure {
  margin: 32px 0;
}

.figure img {
  width: 100%;
  border-radius: 8px;
  display: block;
}

.figure__caption {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 13px;
  color: var(--ink-faint);
  text-align: center;
  margin-top: 10px;
  line-height: 1.5;
}

.figure__caption strong {
  color: var(--ink-light);
  font-weight: 600;
}
```

- 图片说明始终居中，字号 13px。
- 图片本身有 8px 圆角。

---

## Prev / Next Navigation

教程底部的前后导航条：

```css
.tutorial-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid rgba(26, 26, 46, 0.08);
}

.tutorial-nav__link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  max-width: 45%;
}

.tutorial-nav__label {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 12px;
  color: var(--ink-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.tutorial-nav__title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: var(--primary);
  transition: color 0.2s;
}

.tutorial-nav__link:hover .tutorial-nav__title {
  color: #005bb5;
}

.tutorial-nav__link--next {
  text-align: right;
}
```

---

## Responsive Rules

```css
@media (max-width: 768px) {
  .tutorial-body {
    font-size: 16px;
    line-height: 1.75;
  }

  .tutorial-body h2 {
    font-size: 24px;
  }

  .tutorial-body h3 {
    font-size: 19px;
  }

  .toc {
    padding: 20px 24px;
  }

  pre {
    padding: 16px;
    font-size: 13px;
    border-radius: 8px;
  }

  .step-list__item {
    padding-left: 44px;
  }

  .step-list__item::before {
    width: 30px;
    height: 30px;
    font-size: 15px;
  }

  .tutorial-nav {
    flex-direction: column;
    gap: 16px;
  }

  .tutorial-nav__link {
    max-width: 100%;
  }

  .tutorial-nav__link--next {
    text-align: left;
  }
}
```

---

## Quick Reference

| 属性 | 值 |
|------|-----|
| 内容最大宽度 | 720px |
| 正文字号 | 17px |
| 正文行高 | 1.8 |
| 正文字体 | Noto Serif SC |
| 标题字体 (H1/H2) | Fraunces |
| 小标题字体 (H3/H4) | Noto Sans SC |
| 代码背景 | #1A1A2E |
| 段落间距 | 1.2em |
| 章节上间距 | 2em |
