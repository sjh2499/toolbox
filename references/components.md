# components.md — 组件库

Pikesun Design System 组件库，共 40 个组件，分为 8 个大类。每个组件包含名称、描述、HTML 结构和 CSS 样式。

CSS 变量基准：

```css
:root {
  --primary: #0071E3;
  --accent: #FF9500;
  --pop: #FF3B30;
  --cream: #fefcf6;
  --ink: #1A1A2E;
  --ink-light: #4A4A5A;
  --ink-faint: #8A8A9A;
}
```

---

## Typography（排版类，6 个）

### 1. Hero Title

页面主标题，最大字号，Fraunces 字体，用于首屏核心信息。

```html
<h1 class="hero-title">让创意发生</h1>
```

```css
.hero-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 700;
  color: var(--ink);
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin-bottom: 20px;
}
```

### 2. Section Title

区域标题，用于每个 Section 的顶部，中等大小。

```html
<h2 class="section-title">我们的服务</h2>
```

```css
.section-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(26px, 4vw, 40px);
  font-weight: 600;
  color: var(--ink);
  line-height: 1.25;
  margin-bottom: 12px;
}
```

### 3. Card Title

卡片内标题，用于组件卡片内部，精简有力。

```html
<h3 class="card-title">智能分析引擎</h3>
```

```css
.card-title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.35;
  margin-bottom: 6px;
}
```

### 4. Body Text

正文字体，使用衬线体 Noto Serif SC，高行距确保阅读舒适。

```html
<p class="body-text">这是一段正文内容，用于描述产品功能和使用场景。</p>
```

```css
.body-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 17px;
  font-weight: 400;
  color: var(--ink-light);
  line-height: 1.8;
  margin-bottom: 1em;
}
```

### 5. Caption

辅助说明文字，小字号，用于图片说明、标签、注释。

```html
<span class="caption">* 数据截至 2026 年 7 月</span>
```

```css
.caption {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: var(--ink-faint);
  line-height: 1.5;
}
```

### 6. Accent Mark

强调标记，用于高亮关键词或数字单位。Caveat 手写体增加个性。

```html
<span class="accent-mark">Pro</span>
```

```css
.accent-mark {
  font-family: 'Caveat', cursive;
  font-size: 1.2em;
  color: var(--accent);
  display: inline;
}
```

---

## Buttons（按钮类，5 个）

### 7. Primary Button

主操作按钮，Primary 蓝底白字，圆角 10px。

```html
<button class="btn-primary">立即开始</button>
```

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background: var(--primary);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
}

.btn-primary:hover {
  background: #005bb5;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 113, 227, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: none;
}
```

### 8. Secondary Button

次级按钮，浅灰背景，用于非主要操作。

```html
<button class="btn-secondary">了解更多</button>
```

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
  background: rgba(26, 26, 46, 0.06);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background: rgba(26, 26, 46, 0.10);
}
```

### 9. Outline Button

描边按钮，透明背景 + 1.5px 边框，适合在图片或暗色背景上使用。

```html
<button class="btn-outline">查看详情</button>
```

```css
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 27px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: var(--primary);
  background: transparent;
  border: 1.5px solid var(--primary);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.btn-outline:hover {
  background: var(--primary);
  color: #ffffff;
}
```

### 10. Icon Button

纯图标按钮，正方形，用于工具栏或操作栏。

```html
<button class="btn-icon" aria-label="搜索">
  <svg><!-- 搜索图标 --></svg>
</button>
```

```css
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  border-radius: 8px;
  color: var(--ink-light);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.btn-icon:hover {
  background: rgba(26, 26, 46, 0.06);
  color: var(--ink);
}

.btn-icon svg {
  width: 20px;
  height: 20px;
}
```

### 11. CTA Large

大型行动号召按钮，用于 Landing 页 Hero 和底部 CTA。

```html
<a href="#" class="cta-large">免费试用</a>
```

```css
.cta-large {
  display: inline-block;
  padding: 16px 48px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  background: var(--primary);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.cta-large:hover {
  background: #005bb5;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 113, 227, 0.35);
}

.cta-large:active {
  transform: translateY(0);
}
```

---

## Cards（卡片类，5 个）

### 12. Basic Card

基础卡片，白底 + 阴影 + 圆角，最通用的卡片容器。

```html
<div class="card">
  <div class="card__body">
    <h3 class="card__title">标题</h3>
    <p class="card__text">卡片内容描述文字。</p>
  </div>
</div>
```

```css
.card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(26, 26, 46, 0.06);
  transition: box-shadow 0.2s, transform 0.2s;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(26, 26, 46, 0.10);
  transform: translateY(-2px);
}

.card__title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 8px;
}

.card__text {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-light);
}
```

### 13. Feature Card

功能卡片，带图标 + 标题 + 描述，用于产品功能介绍。

```html
<div class="feature-card">
  <div class="feature-card__icon">&#9673;</div>
  <h3 class="feature-card__title">高速渲染</h3>
  <p class="feature-card__text">毫秒级响应速度，流畅体验。</p>
</div>
```

```css
.feature-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px 28px;
  box-shadow: 0 1px 3px rgba(26, 26, 46, 0.06);
  transition: box-shadow 0.2s, transform 0.2s;
}

.feature-card:hover {
  box-shadow: 0 12px 32px rgba(26, 26, 46, 0.10);
  transform: translateY(-3px);
}

.feature-card__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: rgba(0, 113, 227, 0.08);
  color: var(--primary);
  border-radius: 12px;
  margin-bottom: 16px;
}

.feature-card__title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 8px;
}

.feature-card__text {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-light);
}
```

### 14. Stat Card

数据统计卡片，大数字 + 标签，用于数据展示。

```html
<div class="stat-card">
  <span class="stat-card__number">99.9<span class="stat-card__unit">%</span></span>
  <span class="stat-card__label">服务可用率</span>
</div>
```

```css
.stat-card {
  text-align: center;
  padding: 32px 24px;
}

.stat-card__number {
  font-family: 'Fraunces', serif;
  font-size: clamp(40px, 7vw, 64px);
  font-weight: 700;
  color: var(--primary);
  line-height: 1.1;
  display: block;
}

.stat-card__unit {
  font-size: 0.5em;
  color: var(--accent);
}

.stat-card__label {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  color: var(--ink-faint);
  margin-top: 8px;
  display: block;
}
```

### 15. Link Card

可点击的整体链接卡片，用于导航到其他页面。

```html
<a href="#" class="link-card">
  <span class="link-card__title">开发者文档</span>
  <span class="link-card__arrow">&rarr;</span>
</a>
```

```css
.link-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 24px;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(26, 26, 46, 0.06);
  transition: box-shadow 0.2s, transform 0.2s;
}

.link-card:hover {
  box-shadow: 0 6px 20px rgba(26, 26, 46, 0.10);
  transform: translateX(4px);
}

.link-card__title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: var(--ink);
}

.link-card__arrow {
  font-size: 18px;
  color: var(--primary);
  transition: transform 0.2s;
}

.link-card:hover .link-card__arrow {
  transform: translateX(4px);
}
```

### 16. Profile Card

个人/团队介绍卡片，头像 + 姓名 + 角色 + 简介。

```html
<div class="profile-card">
  <img class="profile-card__avatar" src="avatar.jpg" alt="头像" />
  <h4 class="profile-card__name">张三</h4>
  <span class="profile-card__role">产品设计师</span>
  <p class="profile-card__bio">10 年设计经验，专注企业级产品体验。</p>
</div>
```

```css
.profile-card {
  text-align: center;
  padding: 32px 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(26, 26, 46, 0.06);
}

.profile-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
}

.profile-card__name {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 4px;
}

.profile-card__role {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 13px;
  color: var(--primary);
  display: block;
  margin-bottom: 12px;
}

.profile-card__bio {
  font-family: 'Noto Serif SC', serif;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-light);
}
```

---

## Navigation（导航类，4 个）

### 17. Sticky Header

固定顶部导航栏，毛玻璃效果，含 Logo 和导航链接。

```html
<header class="sticky-header">
  <a href="/" class="sticky-header__logo">Pikesun</a>
  <nav class="sticky-header__nav">
    <a href="#">产品</a>
    <a href="#">关于</a>
    <a href="#">联系</a>
  </nav>
</header>
```

```css
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  background: rgba(254, 252, 246, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(26, 26, 46, 0.08);
}

.sticky-header__logo {
  font-family: 'Fraunces', serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
  text-decoration: none;
}

.sticky-header__nav {
  display: flex;
  gap: 24px;
}

.sticky-header__nav a {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-light);
  text-decoration: none;
  transition: color 0.2s;
}

.sticky-header__nav a:hover {
  color: var(--primary);
}
```

### 18. Tab Bar

选项卡切换栏，底部边框指示器。

```html
<nav class="tab-bar">
  <button class="tab-bar__item tab-bar__item--active">概览</button>
  <button class="tab-bar__item">分析</button>
  <button class="tab-bar__item">设置</button>
</nav>
```

```css
.tab-bar {
  display: flex;
  border-bottom: 2px solid rgba(26, 26, 46, 0.08);
}

.tab-bar__item {
  padding: 12px 20px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-faint);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

.tab-bar__item:hover {
  color: var(--ink-light);
}

.tab-bar__item--active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}
```

### 19. Breadcrumb

面包屑导航，层级路径展示。

```html
<nav class="breadcrumb" aria-label="面包屑">
  <a href="/" class="breadcrumb__link">首页</a>
  <span class="breadcrumb__sep">/</span>
  <a href="/docs" class="breadcrumb__link">文档</a>
  <span class="breadcrumb__sep">/</span>
  <span class="breadcrumb__current">快速开始</span>
</nav>
```

```css
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
}

.breadcrumb__link {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 13px;
  color: var(--ink-faint);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb__link:hover {
  color: var(--primary);
}

.breadcrumb__sep {
  font-size: 13px;
  color: rgba(26, 26, 46, 0.2);
}

.breadcrumb__current {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 13px;
  color: var(--ink-light);
  font-weight: 500;
}
```

### 20. Footer

页脚，多列链接 + 版权信息。

```html
<footer class="footer">
  <div class="footer__grid">
    <div class="footer__col">
      <h4 class="footer__heading">产品</h4>
      <a href="#">功能</a><a href="#">定价</a><a href="#">更新</a>
    </div>
    <div class="footer__col">
      <h4 class="footer__heading">资源</h4>
      <a href="#">文档</a><a href="#">API</a><a href="#">社区</a>
    </div>
    <div class="footer__col">
      <h4 class="footer__heading">公司</h4>
      <a href="#">关于</a><a href="#">博客</a><a href="#">招聘</a>
    </div>
  </div>
  <div class="footer__bottom">
    <span>&copy; 2026 Pikesun. All rights reserved.</span>
  </div>
</footer>
```

```css
.footer {
  background: var(--cream);
  border-top: 1px solid rgba(26, 26, 46, 0.08);
  padding: 60px 0 32px;
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__heading {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 4px;
}

.footer__col a {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  color: var(--ink-faint);
  text-decoration: none;
  transition: color 0.2s;
}

.footer__col a:hover {
  color: var(--primary);
}

.footer__bottom {
  max-width: 960px;
  margin: 40px auto 0;
  padding: 20px 24px 0;
  border-top: 1px solid rgba(26, 26, 46, 0.08);
  text-align: center;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 13px;
  color: var(--ink-faint);
}
```

---

## Layout（布局类，4 个）

### 21. Container

页面内容容器，居中对齐，限定最大宽度。

```html
<div class="container">...</div>
```

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
```

### 22. Section

通用页面段落，带上下内边距。

```html
<section class="section">...</section>
```

```css
.section {
  padding: 80px 0;
}

@media (max-width: 768px) {
  .section {
    padding: 48px 0;
  }
}
```

### 23. Grid

自适应网格系统，最小列宽 260px。

```html
<div class="grid">
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
  <div class="grid__item">...</div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
```

### 24. Flex Row

弹性行容器，用于水平排列子元素。

```html
<div class="flex-row">
  <div>...</div>
  <div>...</div>
</div>
```

```css
.flex-row {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}
```

---

## Content（内容类，6 个）

### 25. Callout Box

提示框，四种类型：info / warning / tip / danger。

```html
<div class="callout callout--info">
  <strong class="callout__title">提示</strong>
  <p>这是一条补充说明信息。</p>
</div>
```

```css
.callout {
  padding: 16px 20px;
  border-radius: 8px;
  border-left: 4px solid;
  margin: 24px 0;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 15px;
  line-height: 1.7;
  color: var(--ink);
}

.callout--info {
  background: rgba(0, 113, 227, 0.06);
  border-left-color: var(--primary);
}

.callout--warning {
  background: rgba(255, 149, 0, 0.08);
  border-left-color: var(--accent);
}

.callout--tip {
  background: rgba(52, 199, 89, 0.08);
  border-left-color: #34C759;
}

.callout--danger {
  background: rgba(255, 59, 48, 0.08);
  border-left-color: var(--pop);
}

.callout__title {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}

.callout--info .callout__title { color: var(--primary); }
.callout--warning .callout__title { color: var(--accent); }
.callout--tip .callout__title { color: #34C759; }
.callout--danger .callout__title { color: var(--pop); }
```

### 26. Code Block

代码展示块，深色背景，语法高亮预留。

```html
<pre class="code-block"><code>const app = new Pikesun({
  theme: 'light',
  lang: 'zh-CN'
});</code></pre>
```

```css
.code-block {
  background: var(--ink);
  color: #e0e0e0;
  padding: 24px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 24px 0;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
}
```

### 27. Blockquote

引用块，左竖线 + 斜体文字。

```html
<blockquote class="blockquote">
  <p>设计不只是它看起来怎么样，而是它如何工作。</p>
  <cite class="blockquote__cite">— 史蒂夫·乔布斯</cite>
</blockquote>
```

```css
.blockquote {
  border-left: 4px solid var(--accent);
  padding: 16px 24px;
  margin: 24px 0;
  background: rgba(255, 149, 0, 0.04);
  border-radius: 0 8px 8px 0;
}

.blockquote p {
  font-family: 'Fraunces', serif;
  font-size: 18px;
  font-style: italic;
  line-height: 1.6;
  color: var(--ink);
  margin-bottom: 8px;
}

.blockquote__cite {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  color: var(--ink-faint);
  font-style: normal;
}
```

### 28. Numbered List

有序步骤列表，蓝色圆形序号。

```html
<ol class="numbered-list">
  <li class="numbered-list__item">
    <span class="numbered-list__title">创建账户</span>
    <span class="numbered-list__text">使用邮箱注册，30 秒完成。</span>
  </li>
</ol>
```

```css
.numbered-list {
  list-style: none;
  padding: 0;
  counter-reset: step;
}

.numbered-list__item {
  counter-increment: step;
  position: relative;
  padding-left: 48px;
  margin-bottom: 24px;
}

.numbered-list__item::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 2px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fraunces', serif;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background: var(--primary);
  border-radius: 50%;
}

.numbered-list__title {
  display: block;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 4px;
}

.numbered-list__text {
  display: block;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  color: var(--ink-light);
  line-height: 1.6;
}
```

### 29. Table

数据表格，简洁线条风格。

```html
<table class="table">
  <thead>
    <tr><th>名称</th><th>版本</th><th>状态</th></tr>
  </thead>
  <tbody>
    <tr><td>Pikesun Core</td><td>2.1.0</td><td>稳定</td></tr>
  </tbody>
</table>
```

```css
.table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
}

.table th {
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  color: var(--ink);
  border-bottom: 2px solid rgba(26, 26, 46, 0.10);
  background: rgba(26, 26, 46, 0.02);
}

.table td {
  padding: 12px 16px;
  color: var(--ink-light);
  border-bottom: 1px solid rgba(26, 26, 46, 0.06);
}

.table tr:hover td {
  background: rgba(0, 113, 227, 0.03);
}
```

### 30. Divider

分割线，用于视觉断句。

```html
<hr class="divider" />
```

```css
.divider {
  border: none;
  height: 1px;
  background: rgba(26, 26, 46, 0.08);
  margin: 40px 0;
}
```

---

## Interactive（交互类，5 个）

### 31. Modal

模态对话框，含遮罩层和动画。

```html
<div class="modal-overlay">
  <div class="modal">
    <button class="modal__close">&times;</button>
    <h3 class="modal__title">确认操作</h3>
    <p class="modal__text">确定要删除此项吗？此操作不可撤销。</p>
    <div class="modal__actions">
      <button class="btn-secondary">取消</button>
      <button class="btn-primary">确认</button>
    </div>
  </div>
</div>
```

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 46, 0.4);
  backdrop-filter: blur(4px);
  animation: modalFadeIn 0.2s ease;
}

.modal {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(26, 26, 46, 0.15);
  animation: modalSlideUp 0.25s ease;
}

.modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: var(--ink-faint);
  cursor: pointer;
}

.modal__title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 8px;
}

.modal__text {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-light);
  margin-bottom: 24px;
}

.modal__actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

@keyframes modalFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalSlideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 32. Tooltip

悬浮提示，小三角 + 文字。

```html
<span class="tooltip-wrapper">
  <span class="tooltip__trigger">?</span>
  <span class="tooltip__content">这是一条提示信息</span>
</span>
```

```css
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(26, 26, 46, 0.10);
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-faint);
  cursor: help;
}

.tooltip__content {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 12px;
  background: var(--ink);
  color: #ffffff;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 12px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.tooltip-wrapper:hover .tooltip__content {
  opacity: 1;
}
```

### 33. Toggle Switch

开关切换，用于设置项。

```html
<label class="toggle">
  <input type="checkbox" class="toggle__input" />
  <span class="toggle__track"></span>
  <span class="toggle__label">启用通知</span>
</label>
```

```css
.toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.toggle__input {
  display: none;
}

.toggle__track {
  position: relative;
  width: 44px;
  height: 24px;
  background: rgba(26, 26, 46, 0.15);
  border-radius: 12px;
  transition: background 0.2s;
}

.toggle__track::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: #ffffff;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.toggle__input:checked + .toggle__track {
  background: var(--primary);
}

.toggle__input:checked + .toggle__track::after {
  transform: translateX(20px);
}

.toggle__label {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  color: var(--ink);
}
```

### 34. Search Input

搜索框，带图标和清除按钮。

```html
<div class="search-input">
  <svg class="search-input__icon"><!-- 搜索图标 --></svg>
  <input type="search" class="search-input__field" placeholder="搜索..." />
</div>
```

```css
.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input__icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: var(--ink-faint);
  pointer-events: none;
}

.search-input__field {
  width: 100%;
  padding: 10px 14px 10px 40px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  color: var(--ink);
  background: #ffffff;
  border: 1.5px solid rgba(26, 26, 46, 0.12);
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input__field::placeholder {
  color: var(--ink-faint);
}

.search-input__field:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.12);
}
```

### 35. Tag / Badge

标签/徽章，用于标记分类或状态。

```html
<span class="tag">设计系统</span>
<span class="tag tag--accent">新功能</span>
<span class="tag tag--pop">紧急</span>
```

```css
.tag {
  display: inline-block;
  padding: 3px 10px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--primary);
  background: rgba(0, 113, 227, 0.08);
  border-radius: 6px;
  line-height: 1.6;
}

.tag--accent {
  color: var(--accent);
  background: rgba(255, 149, 0, 0.10);
}

.tag--pop {
  color: var(--pop);
  background: rgba(255, 59, 48, 0.08);
}
```

---

## Media（媒体类，5 个）

### 36. Avatar

用户头像，圆形 + 边框。

```html
<img class="avatar" src="user.jpg" alt="用户头像" />
```

```css
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 6px rgba(26, 26, 46, 0.10);
}

.avatar--sm {
  width: 32px;
  height: 32px;
}

.avatar--lg {
  width: 72px;
  height: 72px;
}
```

### 37. Image with Caption

配图 + 说明文字，适合教程和文章。

```html
<figure class="figure">
  <img class="figure__img" src="diagram.png" alt="架构图" />
  <figcaption class="figure__caption"><strong>图 1:</strong> 系统架构示意图</figcaption>
</figure>
```

```css
.figure {
  margin: 32px 0;
}

.figure__img {
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

### 38. Icon Circle

圆形图标容器，统一尺寸和背景色。

```html
<div class="icon-circle">
  <svg><!-- 图标 --></svg>
</div>
```

```css
.icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(0, 113, 227, 0.08);
  color: var(--primary);
}

.icon-circle svg {
  width: 24px;
  height: 24px;
}

.icon-circle--accent {
  background: rgba(255, 149, 0, 0.10);
  color: var(--accent);
}

.icon-circle--lg {
  width: 64px;
  height: 64px;
}

.icon-circle--lg svg {
  width: 32px;
  height: 32px;
}
```

### 39. Hero Image

首屏大图，全宽圆角，适合 Landing 页。

```html
<img class="hero-image" src="hero.jpg" alt="产品展示" />
```

```css
.hero-image {
  width: 100%;
  max-height: 560px;
  object-fit: cover;
  border-radius: 20px;
  display: block;
}

@media (max-width: 768px) {
  .hero-image {
    border-radius: 12px;
    max-height: 320px;
  }
}
```

### 40. Logo

品牌 Logo，Fraunces 字体文字版和图片版。

```html
<!-- 文字版 -->
<span class="logo">Pikesun</span>

<!-- 图片版 -->
<img class="logo-img" src="logo.svg" alt="Pikesun" />
```

```css
.logo {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.02em;
}

.logo-img {
  height: 32px;
  width: auto;
  display: block;
}
```

---

## Component Index

| # | 名称 | 分类 | 变体 |
|---|------|------|------|
| 1 | Hero Title | Typography | — |
| 2 | Section Title | Typography | — |
| 3 | Card Title | Typography | — |
| 4 | Body Text | Typography | — |
| 5 | Caption | Typography | — |
| 6 | Accent Mark | Typography | — |
| 7 | Primary Button | Button | — |
| 8 | Secondary Button | Button | — |
| 9 | Outline Button | Button | — |
| 10 | Icon Button | Button | — |
| 11 | CTA Large | Button | — |
| 12 | Basic Card | Card | — |
| 13 | Feature Card | Card | — |
| 14 | Stat Card | Card | — |
| 15 | Link Card | Card | — |
| 16 | Profile Card | Card | — |
| 17 | Sticky Header | Navigation | — |
| 18 | Tab Bar | Navigation | — |
| 19 | Breadcrumb | Navigation | — |
| 20 | Footer | Navigation | — |
| 21 | Container | Layout | — |
| 22 | Section | Layout | — |
| 23 | Grid | Layout | — |
| 24 | Flex Row | Layout | — |
| 25 | Callout Box | Content | info/warning/tip/danger |
| 26 | Code Block | Content | — |
| 27 | Blockquote | Content | — |
| 28 | Numbered List | Content | — |
| 29 | Table | Content | — |
| 30 | Divider | Content | — |
| 31 | Modal | Interactive | — |
| 32 | Tooltip | Interactive | — |
| 33 | Toggle Switch | Interactive | — |
| 34 | Search Input | Interactive | — |
| 35 | Tag / Badge | Interactive | tag/accent/pop |
| 36 | Avatar | Media | sm/default/lg |
| 37 | Image with Caption | Media | — |
| 38 | Icon Circle | Media | default/accent/lg |
| 39 | Hero Image | Media | — |
| 40 | Logo | Media | text/img |
