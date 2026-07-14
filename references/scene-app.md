# scene-app.md — App型 / 功能型页面场景规范

## Core Principles

App型页面服务于功能性产品界面：后台管理、SaaS 工具、数据面板、设置页、用户中心等。
设计围绕三个核心原则展开：

1. **Function-first（功能优先）** — 每个元素必须服务于任务完成。装饰让位于效率。
2. **Clean（干净克制）** — 视觉噪音降到最低。大量留白，克制用色，信息以最直接的方式呈现。
3. **High information density（高信息密度）** — 在不牺牲可读性的前提下，让用户在一个视口内获取尽可能多的有用信息。

---

## Layout Structure

```
┌──────────────────────────────────────────┐
│  Sticky Header (固定)                      │
├──────────────────────────────────────────┤
│                                          │
│  Content Area                             │
│  max-width: 820px (标准)                   │
│  max-width: 1200px (宽版, 数据表格等)       │
│  padding: 32px 24px                       │
│                                          │
└──────────────────────────────────────────┘
```

- 标准内容区使用 `max-width: 820px`，适合表单、详情、设置等以阅读和操作为主的页面。
- 宽版内容区使用 `max-width: 1200px`，适合数据表格、仪表盘、多列卡片等需要横向空间的页面。
- 内容区水平居中，使用 `margin: 0 auto`。

---

## Sticky Header CSS Snippet

```css
.app-header {
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

.app-header__logo {
  font-family: 'Fraunces', serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
}

.app-header__nav {
  display: flex;
  gap: 8px;
  align-items: center;
}
```

---

## Color Simplification Rules for App Pages

App 页面严格限用以下颜色，禁止引入装饰性渐变或多余色相：

| 用途 | 颜色 | CSS 变量 |
|------|------|----------|
| 页面背景 | Cream | `var(--cream)` #fefcf6 |
| 卡片/面板背景 | 纯白 | `#ffffff` |
| 主文字 | Ink | `var(--ink)` #1A1A2E |
| 次要文字 | Ink Light | `var(--ink-light)` #4A4A5A |
| 辅助文字 | Ink Faint | `var(--ink-faint)` #8A8A9A |
| 主操作/链接 | Primary | `var(--primary)` #0071E3 |
| 强调/高亮 | Accent | `var(--accent)` #FF9500 |
| 危险/删除 | Pop | `var(--pop)` #FF3B30 |
| 分割线 | `rgba(26,26,46,0.08)` | — |
| 悬停背景 | `rgba(0,113,227,0.04)` | — |

规则：
- 卡片必须白底 (`#ffffff`)，配合 `box-shadow` 而非彩色边框。
- 不在 App 页面中使用暗色面板（Dark Panel 仅限 Landing 场景）。
- 不使用渐变背景，不用装饰性图标。

---

## Card Grid

App 型卡片使用 CSS Grid 自适应排列：

```css
.app-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  padding: 0;
}
```

- 最小列宽 260px 确保卡片内容不会过度挤压。
- 间距统一 16px，紧凑但不拥挤。

---

## Card Hover Effects

```css
.app-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(26, 26, 46, 0.06);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  cursor: pointer;
}

.app-card:hover {
  box-shadow: 0 8px 24px rgba(26, 26, 46, 0.10);
  transform: translateY(-2px);
}

.app-card:active {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(26, 26, 46, 0.06);
}
```

- 悬停时轻微上浮（2px）+ 阴影加深，给用户明确的交互反馈。
- active 状态回弹，模拟物理按压感。
- 不使用彩色边框或背景色变化 —— 保持克制。

---

## Tab Bar Component

```css
.app-tabs {
  display: flex;
  gap: 0;
  border-bottom: 2px solid rgba(26, 26, 46, 0.08);
  margin-bottom: 24px;
}

.app-tabs__item {
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

.app-tabs__item:hover {
  color: var(--ink-light);
}

.app-tabs__item--active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}
```

- Tab 切换不使用背景色块，仅通过底部边框 + 文字颜色表示状态。
- 最多 5-6 个 Tab，超出时考虑下拉或折叠。

---

## Modal Component

```css
.app-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 46, 0.4);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}

.app-modal {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  max-width: 520px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(26, 26, 46, 0.15);
  animation: slideUp 0.25s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- Modal 必须有关闭按钮（右上角 X）和点击遮罩关闭。
- 移动端 Modal 宽度 90%，保留左右边距。
- 内容过长时内部滚动，不撑开页面。

---

## Input Focus Styles

```css
.app-input {
  width: 100%;
  padding: 10px 14px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  color: var(--ink);
  background: #ffffff;
  border: 1.5px solid rgba(26, 26, 46, 0.12);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.app-input::placeholder {
  color: var(--ink-faint);
}

.app-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.12);
}

.app-input--error {
  border-color: var(--pop);
}

.app-input--error:focus {
  box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.12);
}
```

- Focus 环使用 `box-shadow` 而非 `outline`，半径为 3px，颜色为 Primary 12% 透明度。
- 错误状态用 Pop 色，保持与品牌色系统一。

---

## Responsive Rules

```css
/* 平板及以下 */
@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;
    height: 52px;
  }

  .app-content {
    padding: 20px 16px;
  }

  .app-card-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .app-modal {
    padding: 24px;
    border-radius: 12px;
  }
}

/* 手机 */
@media (max-width: 480px) {
  .app-header__logo {
    font-size: 18px;
  }

  .app-tabs__item {
    padding: 10px 14px;
    font-size: 13px;
  }
}
```

- 移动端卡片变为单列。
- 间距和内边距适度收缩。
- Header 高度略减，为内容腾出空间。

---

## Taboos（禁忌）

App 型页面严格禁止以下行为：

1. **禁止装饰性文字** — 不要出现仅用于"好看"的大标题、引语、英文装饰字。
2. **禁止滚动揭示动画（scroll reveal）** — App 不是营销页，用户不需要"惊喜"，需要效率。
3. **禁止巨型标题** — App 页面标题最大 24px，不使用 Hero Title。
4. **禁止暗色面板** — 不在 App 页面使用 `#151821` 等深色背景块。
5. **禁止无关图标/插画** — 每个视觉元素都应有功能意义。
6. **禁止彩色卡片边框** — 卡片区分靠内容和排版，不靠颜色标签。
7. **禁止超过 3 级字重对比** — 保持视觉安静，不制造过多层级跳跃。
8. **禁止自动播放** — 无轮播、无自动动画、无视频自动播放。

---

## Quick Reference

| 属性 | 值 |
|------|-----|
| 背景色 | `var(--cream)` #fefcf6 |
| 卡片色 | `#ffffff` |
| 标准内容宽度 | 820px |
| 宽版内容宽度 | 1200px |
| 卡片最小列宽 | 260px |
| 卡片圆角 | 12px |
| 间距单位 | 16px / 24px / 32px |
| 正文字号 | 14-15px |
| 标题字号 | 18-24px |
| Header 高度 | 56px |
| 字体 | Noto Sans SC（正文）, Fraunces（Logo） |
