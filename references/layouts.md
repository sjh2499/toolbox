# layouts.md — 布局模式参考

Pikesun Design System 预定义 12 种布局模式。每种模式包含名称、描述、CSS 代码片段、适用场景。

---

## 1. Hero Centered — 大标题居中

全宽 Hero 区域，大标题 + 副标题 + CTA 按钮全部居中，垂直方向也在视口居中。

```css
.hero-centered {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 80vh;
  padding: 80px 24px;
  background: var(--cream);
}

.hero-centered__inner {
  max-width: 720px;
}

.hero-centered__title {
  font-family: 'Fraunces', serif;
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 700;
  color: var(--ink);
  line-height: 1.15;
  margin-bottom: 20px;
}

.hero-centered__subtitle {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--ink-light);
  line-height: 1.6;
  margin-bottom: 32px;
}
```

**适用**：产品首页、品牌 Landing、活动主视觉。

---

## 2. Split 50/50 — 左右等分

文字和图片各占 50%，内容垂直居中。

```css
.split-50 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 40px;
}

@media (max-width: 768px) {
  .split-50 {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

**适用**：功能介绍、产品展示、"文字左图右"场景。

---

## 3. Split 60/40 — 宽窄双栏

文字占 60%，图片占 40%。适合文字较多的介绍场景。

```css
.split-60-40 {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 60px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 40px;
}

@media (max-width: 768px) {
  .split-60-40 {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

**适用**：详细功能介绍、案例展示、About 页面。

---

## 4. Three Column Grid — 三列网格

三等分列，用于并列展示同等重要的信息。

```css
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 900px) {
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }
}
```

**适用**：功能列表、服务展示、产品特性、定价卡片。

---

## 5. Two Column Grid — 两列网格

两等分列，用于对比、并列展示。

```css
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
```

**适用**：对比表格、双卡片、前后对比、选型指南。

---

## 6. Alternating Rows — 交替行（Z 字形）

奇数行文字左图片右，偶数行图片左文字右，形成"之"字形视觉流。

```css
.alt-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 40px;
}

.alt-row:nth-child(even) .alt-row__text {
  order: 2;
}

.alt-row:nth-child(even) .alt-row__image {
  order: 1;
}

@media (max-width: 768px) {
  .alt-row {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 48px 24px;
  }
  .alt-row:nth-child(even) .alt-row__text,
  .alt-row:nth-child(even) .alt-row__image {
    order: 0;
  }
}
```

**适用**：长篇 Landing、故事叙述、多步骤展示。

---

## 7. Full Width Banner — 全宽横幅

突破内容区限制，占满整个视口宽度。适合做视觉断句或强调。

```css
.banner-full {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding: 80px 0;
  background: var(--primary);
  text-align: center;
}

.banner-full__text {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px;
  font-family: 'Fraunces', serif;
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
}
```

**适用**：大字宣言、品牌 Slogan、中间 CTA 插入。

---

## 8. Card Grid Masonry — 瀑布流卡片

不等高卡片自动填充，形成错落有致的视觉效果。

```css
.grid-masonry {
  column-count: 3;
  column-gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.grid-masonry__item {
  break-inside: avoid;
  margin-bottom: 20px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(26, 26, 46, 0.06);
}

@media (max-width: 900px) {
  .grid-masonry {
    column-count: 2;
  }
}

@media (max-width: 600px) {
  .grid-masonry {
    column-count: 1;
  }
}
```

**适用**：作品集、图片墙、博客列表、灵感板。

---

## 9. Sticky Sidebar — 固定侧边栏

左侧导航固定，右侧内容滚动。适合文档和知识库。

```css
.sticky-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.sticky-layout__sidebar {
  position: sticky;
  top: 80px;
  align-self: start;
}

.sticky-layout__content {
  max-width: 720px;
}

@media (max-width: 900px) {
  .sticky-layout {
    grid-template-columns: 1fr;
  }
  .sticky-layout__sidebar {
    position: static;
  }
}
```

**适用**：文档站点、知识库、设置页、帮助中心。

---

## 10. Timeline Vertical — 垂直时间线

按时间顺序排列的步骤或历史记录，左侧竖线连接各节点。

```css
.timeline {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
  padding: 0 40px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 56px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(26, 26, 46, 0.1);
}

.timeline__item {
  position: relative;
  padding-left: 96px;
  margin-bottom: 48px;
}

.timeline__dot {
  position: absolute;
  left: 46px;
  top: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary);
  border: 4px solid var(--cream);
  box-shadow: 0 0 0 2px var(--primary);
}

.timeline__date {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 13px;
  color: var(--ink-faint);
  margin-bottom: 4px;
}

.timeline__title {
  font-family: 'Fraunces', serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 8px;
}

.timeline__text {
  font-family: 'Noto Serif SC', serif;
  font-size: 15px;
  line-height: 1.7;
  color: var(--ink-light);
}
```

**适用**：发展历程、版本历史、操作步骤、项目路线图。

---

## 11. Bento Grid — 便当盒网格

不同尺寸卡片拼成有机布局，类似 Apple 官网风格。大卡片和小卡片混合排列。

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.bento-grid__item {
  background: #ffffff;
  border-radius: 20px;
  padding: 28px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(26, 26, 46, 0.06);
  transition: box-shadow 0.3s;
}

.bento-grid__item:hover {
  box-shadow: 0 8px 30px rgba(26, 26, 46, 0.10);
}

/* 尺寸变体 */
.bento-grid__item--2col { grid-column: span 2; }
.bento-grid__item--2row { grid-row: span 2; }
.bento-grid__item--2x2 { grid-column: span 2; grid-row: span 2; }

@media (max-width: 900px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 180px;
  }
}

@media (max-width: 600px) {
  .bento-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .bento-grid__item--2col,
  .bento-grid__item--2row,
  .bento-grid__item--2x2 {
    grid-column: span 1;
    grid-row: span 1;
  }
}
```

**适用**：产品亮点、功能集合、生态系统展示、门户首页。

---

## 12. Single Column Narrow — 单列窄栏

最窄的单栏布局（max-width: 680px），聚焦于纯阅读体验。

```css
.single-narrow {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 24px;
}

.single-narrow h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
  margin-bottom: 16px;
}

.single-narrow p {
  font-family: 'Noto Serif SC', serif;
  font-size: 17px;
  line-height: 1.8;
  color: var(--ink-light);
  margin-bottom: 1.2em;
}
```

**适用**：博客文章、通知公告、隐私政策、长篇文档。

---

## Layout Selection Guide

| 需求 | 推荐布局 |
|------|----------|
| 产品首页 | #1 Hero Centered + #6 Alternating Rows |
| 功能介绍 | #3 Split 60/40 + #4 Three Column Grid |
| 案例展示 | #8 Card Grid Masonry |
| 文档/教程 | #9 Sticky Sidebar + #12 Single Column Narrow |
| 活动 Landing | #1 Hero Centered + #7 Full Width Banner + #6 Alternating Rows |
| 关于我们 | #2 Split 50/50 + #10 Timeline Vertical |
| 定价页面 | #4 Three Column Grid + #2 Split 50/50 |
| 作品集 | #8 Card Grid Masonry + #11 Bento Grid |
| 数据报告 | #5 Two Column Grid + #7 Full Width Banner |
| 知识库 | #9 Sticky Sidebar + #12 Single Column Narrow |

---

## Quick Reference

| 模式 | 列数 | 最大宽度 | 响应式断点 |
|------|------|----------|------------|
| Hero Centered | 1 | 720px | 始终居中 |
| Split 50/50 | 2 | 1200px | 768px → 单列 |
| Split 60/40 | 2 | 1200px | 768px → 单列 |
| Three Column Grid | 3 | 1200px | 900px → 2, 600px → 1 |
| Two Column Grid | 2 | 1200px | 768px → 单列 |
| Alternating Rows | 2 | 1200px | 768px → 单列 |
| Full Width Banner | 1 | 100vw | 始终全宽 |
| Card Grid Masonry | 3 | 1200px | 900px → 2, 600px → 1 |
| Sticky Sidebar | 2 | 1200px | 900px → 单列 |
| Timeline Vertical | 1 | 720px | 始终窄栏 |
| Bento Grid | 4 | 1200px | 900px → 2, 600px → 1 |
| Single Column Narrow | 1 | 680px | 始终窄栏 |
