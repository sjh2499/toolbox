# Brand DNA — 力太阳品牌基因

---

## 🎨 IP固定三色

| 色名 | 色值 | 用途 |
|------|------|------|
| 蓝 | `#0071E3` | 主色调、标题、超链接、按钮、重点标记 |
| 橙 | `#FF9500` | 强调、装饰、badges、高亮、CTA辅助 |
| 红 | `#FF3B30` | 点缀、危险操作、重要提醒、CTA |

三色比例原则：主色60% · 强调色30% · 点缀色10%（点缀色永远是点缀，不做主色）

---

## 🔤 字体基因

### 核心原则
- **标题用衬线，正文用无衬线** — 混搭产生节奏
- **中英文搭配** — 英文做装饰/标签，中文承载内容
- **字号对比** — 大的要很大，小的要真的小

### 推荐字体池

| 场景 | 推荐 | 备注 |
|------|------|------|
| 英文装饰/标题 | `Fraunces` | 有品质的衬线体 |
| 英文手写/轻松 | `Caveat` | 标注、注释 |
| 中文标题 | `Noto Serif SC` (900) | 衬线体标题 |
| 中文正文 | `Noto Sans SC` + 系统栈 | 跨平台无衬线 |

### 字号系统（fluid sizing）
- Hero大标题: `clamp(1.8rem, 5vw, 2.6rem)`
- Section标题: `clamp(1.2rem, 2.5vw, 1.6rem)`
- 卡片标题: `1.1rem`
- 正文: `16px`
- 辅助文字: `0.78rem ~ 0.85rem`

---

## ✨ 气质关键词

设计出来的东西应该让人觉得：

- **简洁干练** — 不堆砌装饰，每样东西都有用
- **功能优先** — 交互清晰，操作流畅
- **有温度** — 暖色底、软阴影、圆角适度
- **个人品牌感** — 一看就知道是"力太阳"的
- **不像模板** — 拒绝千篇一律的 Landing Page 感

---

## 🎨 配色扩展原则

当三色不够用时：

- 背景永远偏暖：`#fefcf6`（主背景）、`#faf6eb`（深奶）
- 文字永远非纯黑：用 `#1A1A2E`（墨色）
- 次要文字：`#4A4A5A`、`#8A8A9A`
- 绝不用纯黑 `#000` 或纯白 `#fff`
- 卡片白：`#fff` 浮于暖底之上
- 绿色（辅助）：`#34C759` — 成功/完成状态
- 紫色（辅助）：`#AF52DE` — 特殊功能板块

---

## 🚫 通用禁忌清单

| 类型 | 禁止 |
|------|------|
| 配色 | 蓝紫渐变、cyan、neon、纯黑白、多色渐变背景 |
| 字体 | Inter/Roboto/Arial等overused字体 |
| 布局 | 所有section居中、千篇一律卡片网格 |
| 动效 | bounce/elastic、animate width/height、无限循环动画 |
| 装饰 | glassmorphism、圆角矩形+阴影千篇一律、渐变文字、AI光效 |
| 整体 | 看起来像AI生成的通用模板、generic Landing Page模板感 |
| 默认样式 | HTML默认blockquote、默认border-left引用块、无样式ul/ol列表、默认table |

---

## 📐 通用间距原则

- Section之间: `clamp(60px, 10vh, 100px)`
- 内容块之间: `clamp(32px, 5vw, 80px)`
- 卡片内padding: `clamp(24px, 3vw, 36px)`
- 元素间gap: `clamp(16px, 2vw, 24px)`
- 全部用 `clamp()` 做fluid sizing
- `max-width: 1200px` + `margin: 0 auto` 约束内容宽度

---

## 📱 响应式通用规则

- 断点: 750px（三栏→两栏）、480px（两栏→单栏）
- 移动端是"重新排列"不是"缩小"
- 尊重 `prefers-reduced-motion`
- 移动端不隐藏内容 — adapt不amputate

---

## 🔍 细节规范

- **选中文本高亮**: `::selection { background: var(--accent); color: var(--ink); }`
- **链接悬停**: 用主色底色块，不用变色
- **按钮**: 主色填充、圆角 8~12px、font-weight 600
- **卡片**: 白底、圆角 16px、shadow 轻柔

---

*This is the foundation. Every scene file builds on top of this.*
