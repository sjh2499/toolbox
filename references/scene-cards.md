# scene-cards.md — 图文卡片场景规范

## Core Principles

图文卡片场景服务于社交媒体图片、海报、信息图、小红书/朋友圈/Instagram 卡片等独立图形内容。
设计围绕四个核心原则：

1. **Phone-Readable（手机可读）** — 卡片在手机屏幕上（~375px 宽）必须清晰可读，不需要缩放。
2. **Big Text（大字）** — 字号远大于网页正文，最小正文 18px，标题可达 48px+。
3. **3:4 Ratio（3:4 比例）** — 标准卡片比例 3:4（宽:高），适合手机全屏预览和主流平台。
4. **Self-Contained（自包含）** — 每张卡片是独立的信息单元，脱离上下文也能传达完整意思。

---

## Card Dimensions

标准卡片尺寸：

| 类型 | 尺寸 | 用途 |
|------|------|------|
| 标准卡片 | 600 × 800px | 通用，适合大部分平台 |
| 方形卡片 | 800 × 800px | Instagram 风格 |
| 宽幅卡片 | 900 × 600px | 横向信息展示 |
| 长图卡片 | 600 × 1200px | 信息密度高的长内容 |
| 故事卡片 | 1080 × 1920px | 竖屏全屏故事 |

柔性 3:4 卡片（推荐为默认）：

```css
.card-3x4 {
  width: 600px;
  height: 800px;
  /* 或使用 aspect-ratio */
  aspect-ratio: 3 / 4;
  max-width: 100%;
}
```

- 导出时锁定尺寸，不依赖浏览器 `aspect-ratio`（部分平台不兼容）。
- 始终保持 2x 导出（1200 × 1600px），保证 Retina 清晰度。

---

## Typography Rules for Cards

卡片排版与网页有根本不同 —— 一切要更大：

| 元素 | 字号范围 | 行高 | 字重 | 字体 |
|------|----------|------|------|------|
| 大字标题 | 42-60px | 1.1 | 700 | Fraunces |
| 中等标题 | 28-38px | 1.2 | 600 | Fraunces / Noto Sans SC |
| 小标题 | 20-26px | 1.3 | 600 | Noto Sans SC |
| 正文 | 18-22px | 1.5 | 400 | Noto Serif SC / Noto Sans SC |
| 辅助文字 | 14-16px | 1.5 | 400 | Noto Sans SC |
| 英文装饰字 | 14-20px | 1.3 | 400 | Caveat / Fraunces |
| 数据数字 | 64-96px | 1.0 | 700 | Fraunces |

**绝对底线**：卡片内任何可见文字不小于 14px（物理像素），正文不小于 18px。

```css
.card-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(36px, 8vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.card-body {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(16px, 4vw, 20px);
  line-height: 1.6;
  color: var(--ink-light);
}

.card-caption {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink-faint);
  letter-spacing: 0.02em;
}

.card-accent-english {
  font-family: 'Caveat', cursive;
  font-size: 20px;
  color: var(--accent);
  line-height: 1.3;
}
```

---

## Card Types

### 1. Title Card（标题卡片）
大标题 + 副标题 + 装饰元素。用于引言、观点表达。
- 标题占卡片 40-50% 面积。
- 装饰元素：色块、线条、引号。

### 2. Quote Card（引用卡片）
居中引用文字 + 出处。深色或浅色背景。
- 引文字号 28-36px，Fraunces italic。
- 作者信息 16px，底部居中。

### 3. List Card（列表卡片）
标题 + 3-5 条要点，编号或项目符号。
- 每条项目符号用 Primary 蓝色圆点。
- 序号用 Fraunces 大数字。

### 4. Stat Card（数据卡片）
超大数字 + 简短标签。
- 数字 72-96px，Fraunces。
- 标签 14-16px，全部大写。
- 可加 Caveat 手写注解。

### 5. Image Card（图片卡片）
大幅图片 + 底部文字覆盖。
- 图片占卡片 65-75% 面积。
- 文字区有半透明渐变遮罩。

### 6. CTA Card（行动号召卡片）
简短文案 + 大按钮或二维码。
- 按钮风格使用 Primary 蓝色。
- 白色背景为主，高对比。

---

## Color Rules for Cards

| 用途 | 颜色 | 规则 |
|------|------|------|
| 卡片背景 | Cream #fefcf6 或纯白 #ffffff | 默认浅色，不用暗色 |
| 文字主色 | Ink #1A1A2E | 保持高对比度 |
| 强调色 | Primary #0071E3 | 用于标题标记、序号 |
| 点缀色 | Accent #FF9500 | 用于装饰线条、手写字 |
| 警示 | Pop #FF3B30 | 仅用于需要警告的文字 |

**重要规则**：
- 3:4 卡片**不使用暗色面板** (`#151821`)。暗色面板仅限 Landing 页全屏 Section。
- 如需深色卡片，使用 Ink 色 (`#1A1A2E`) 作为背景，文字全部反白。
- 每张卡片最多出现 3 种颜色（不含黑白灰）。

---

## Layout Techniques

### Centered（居中布局）
```css
.card-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px;
}
```
用于：Quote Card、CTA Card、Title Card。

### Left-Aligned（左对齐布局）
```css
.card-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 48px 50px;
}
```
用于：List Card、信息展示卡片。

### Split（上下分割布局）
```css
.card-split {
  display: flex;
  flex-direction: column;
}
.card-split__top {
  flex: 3;
  /* 图片或标题区 */
}
.card-split__bottom {
  flex: 1;
  padding: 32px 40px;
  /* 文字区 */
}
```
用于：Image Card（图上文下）。

### Full-Bleed（全出血布局）
```css
.card-full-bleed {
  position: relative;
}
.card-full-bleed__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-full-bleed__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background: linear-gradient(transparent, rgba(26,26,46,0.7));
  color: #ffffff;
}
```
用于：全图背景 + 文字叠加。

---

## Export Quality Settings

| 平台 | 格式 | 分辨率 | 质量 | 色彩空间 |
|------|------|--------|------|----------|
| 小红书 | PNG | 2x (1200x1600) | 无损 | sRGB |
| 朋友圈 | JPG | 2x | 90% | sRGB |
| Instagram | JPG | 1080x1080 | 85% | sRGB |
| 网页嵌入 | WebP | 1x or 2x | 85% | sRGB |
| 印刷 | PNG/PDF | 300dpi | 无损 | CMYK |

```css
/* 导出用容器样式 */
.card-export {
  width: 600px;
  height: 800px;
  overflow: hidden;
  /* 确保所有内容在可视范围内 */
}
```

---

## Naming Convention

```
{project}-{card-type}-{sequence}-{version}.png

示例:
pikesun-quote-01-v2.png
pikesun-stat-users-03-v1.png
pikesun-title-launch-01-v1.png
campaign-cta-02-v3.png
```

规则：
- 全小写，连字符分隔。
- `project` — 项目或品牌名缩写。
- `card-type` — 卡片类型（title/quote/list/stat/image/cta）。
- `sequence` — 两位数字序号。
- `version` — v1, v2, v3...

---

## Card-Specific Checklist

导出前逐项检查：

- [ ] 最小字号 >= 14px（正文 >= 18px）
- [ ] 在 375px 宽屏幕上所有文字清晰可读
- [ ] 颜色不超过 3 种（不含黑白灰）
- [ ] 没有使用暗色面板 `#151821`
- [ ] 文字在安全区内（距边缘 >= 40px）
- [ ] 中英文混排时英文用 Caveat/Fraunces
- [ ] 卡片独立可理解，不依赖外部上下文
- [ ] 文件命名符合规范
- [ ] 导出为 2x 分辨率
- [ ] 无像素化、无模糊文字
- [ ] 3:4 比例准确（600×800 或等比）
- [ ] 二维码可扫描（如包含）

---

## Quick Reference

| 属性 | 值 |
|------|-----|
| 标准尺寸 | 600 × 800px |
| 标准比例 | 3:4 |
| 最小正文字号 | 18px |
| 最小辅助字号 | 14px |
| 最大标题字号 | 60px |
| 数据数字字号 | 64-96px |
| 安全边距 | >= 40px |
| 最大颜色数 | 3 种 + 黑白灰 |
| 暗色面板 | 禁止在卡片中使用 |
| 导出倍数 | 2x (1200x1600) |
| 格式 | PNG (无损) 或 JPG (90%) |
