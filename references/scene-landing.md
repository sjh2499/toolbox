# scene-landing.md — Landing / 活动页场景规范

## Core Principles

Landing 页面服务于产品落地页、活动页、推广页等营销场景。设计围绕三个核心原则：

1. **Visual Impact（视觉冲击）** — 首屏必须在 3 秒内抓住注意力，建立情感连接。
2. **Alternating Panels（交替节奏）** — 通过明暗交替、图文交替创造视觉节奏，引导用户持续滚动。
3. **Strong Rhythm（强节奏感）** — 每一屏（section）都有明确的视觉重心，屏与屏之间有清晰的视觉断句。

---

## Layout Structure

```
┌──────────────────────────────────────────┐
│  Hero Section（首屏大图+标题+CTA）          │
├──────────────────────────────────────────┤
│  Section A: 浅色背景 + 文字 + 图片          │
├──────────────────────────────────────────┤
│  Section B: 暗色面板 + 功能卡片              │
├──────────────────────────────────────────┤
│  Section A': 浅色背景 + 图文（内容变体）     │
├──────────────────────────────────────────┤
│  Section C: 数据统计行                      │
├──────────────────────────────────────────┤
│  Section D: 用户引言 / 客户评价              │
├──────────────────────────────────────────┤
│  Bottom CTA Section（底部大按钮+行动号召）    │
├──────────────────────────────────────────┤
│  Footer                                    │
└──────────────────────────────────────────┘
```

- 每屏最小高度 60vh（移动端 50vh），保证视觉分量。
- 明暗交替：浅 → 深 → 浅 → 深，避免连续两屏使用同一色调。
- 首屏和尾屏必有 CTA。

---

## Section Type A: Light BG + Text + Image

经典双栏布局，浅色背景（Cream #fefcf6），左侧文字右侧图片。

```css
.section-light {
  background: var(--cream);
  padding: 100px 0;
}

.section-light__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.section-light__title {
  font-family: 'Fraunces', serif;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
  margin-bottom: 20px;
}

.section-light__text {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 17px;
  line-height: 1.75;
  color: var(--ink-light);
}

.section-light__image {
  width: 100%;
  border-radius: 16px;
}

@media (max-width: 768px) {
  .section-light__inner {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 0 24px;
  }
  .section-light {
    padding: 60px 0;
  }
}
```

- 图片和文字各占 50%。
- 移动端上下堆叠，文字在上图片在下。

---

## Section Type B: Dark Panel + Feature Cards

深色面板 `#151821`，展示 3 个功能/亮点卡片。

```css
.section-dark {
  background: #151821;
  padding: 100px 0;
}

.section-dark__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-dark__heading {
  text-align: center;
  margin-bottom: 60px;
}

.section-dark__title {
  font-family: 'Fraunces', serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
}

.section-dark__subtitle {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
}

.section-dark__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.dark-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 36px 28px;
  transition: background 0.3s;
}

.dark-card:hover {
  background: rgba(255, 255, 255, 0.10);
}

.dark-card__title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
}

.dark-card__text {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.55);
}
```

移动端卡片变为单列：
```css
@media (max-width: 768px) {
  .section-dark__cards {
    grid-template-columns: 1fr;
  }
  .section-dark {
    padding: 60px 0;
  }
}
```

---

## Section Type C: Stats Row

一行 3-4 个数据指标，数字巨大，标签精简。

```css
.section-stats {
  background: var(--cream);
  padding: 80px 0;
}

.section-stats__row {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  text-align: center;
}

.stat-item__number {
  font-family: 'Fraunces', serif;
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 700;
  color: var(--primary);
  line-height: 1.1;
}

.stat-item__label {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  color: var(--ink-faint);
  margin-top: 8px;
}

.stat-item__suffix {
  font-family: 'Caveat', cursive;
  font-size: 28px;
  color: var(--accent);
}
```

- 移动端 2 列或单列。
- 数字用 Fraunces 展示，大而有力。
- 后缀可用 Caveat 手写体增加人情味。

---

## Section Type D: Quotes / Testimonials

用户引言区域，以引用文字为主体。

```css
.section-quotes {
  background: #151821;
  padding: 80px 0;
}

.quote-card {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  padding: 48px 40px;
}

.quote-card__text {
  font-family: 'Fraunces', serif;
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 500;
  font-style: italic;
  line-height: 1.6;
  color: #ffffff;
}

.quote-card__author {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 24px;
}

.quote-card__mark {
  font-family: 'Caveat', cursive;
  font-size: 48px;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 16px;
}
```

- 引言左对齐或居中对齐，配合装饰性引号。
- 暗色背景衬托文字，制造沉静感。

---

## CTA Button Styles

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
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
}

.cta-large:hover {
  background: #005bb5;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 113, 227, 0.35);
}

.cta-large:active {
  transform: translateY(0);
}

.cta-large--outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.cta-large--outline:hover {
  background: var(--primary);
  color: #ffffff;
}

.cta-large--white {
  background: #ffffff;
  color: var(--ink);
}

.cta-large--white:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
```

- 主 CTA 永远使用 Primary 蓝。
- 暗色面板上可用白色 CTA 做次级按钮。
- CTA 文字 18px，保持醒目。

---

## Dark Panel Color Scheme

```
背景:        #151821
标题:        #ffffff
正文:        rgba(255,255,255,0.65)
次要文字:    rgba(255,255,255,0.45)
卡片背景:    rgba(255,255,255,0.06)
卡片边框:    rgba(255,255,255,0.08)
卡片悬停:    rgba(255,255,255,0.10)
分割线:      rgba(255,255,255,0.10)
Primary:     #0071E3 (不变)
Accent:      #FF9500 (不变)
CTA 按钮:    #ffffff 或 var(--primary)
```

---

## Responsive Rules

```css
/* Tablet */
@media (max-width: 1024px) {
  .section-light__inner {
    gap: 40px;
  }
  .section-stats__row {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 24px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  section {
    padding: 48px 0;
  }

  .section-light__inner,
  .section-dark__cards {
    grid-template-columns: 1fr;
  }

  .section-stats__row {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .cta-large {
    padding: 14px 36px;
    font-size: 16px;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .section-stats__row {
    grid-template-columns: 1fr;
  }
}
```

---

## Landing-Specific Taboos

1. **禁止低对比度文字** — Landing 页文字必须清晰可读，辅助文字对比度不低于 4.5:1。
2. **禁止 Hero 区域无 CTA** — 首屏必须有一个明确的行动号召按钮。
3. **禁止自动轮播** — 用户可以手动滑动，但不自动播放，避免干扰阅读节奏。
4. **禁止无意义的视差滚动** — 视差效果只在强化信息层级时使用，不为炫技。
5. **禁止假数据** — 统计数据必须有来源可查，否则不要放数字。
6. **禁止超过 3 种字体在同一屏出现** — 保持排版克制。
7. **禁止连续暗色面板** — 暗色面板必须与亮色面板交替出现，避免视觉疲劳。
8. **禁止 Hero 使用纯色背景** — 首屏必须有视觉焦点（图片、插画、或纹理）。
9. **禁止正文超过 3 行不换段** — Landing 页文字块要短，方便扫读。
10. **禁止移动端隐藏重要内容** — 桌面端展示的内容移动端必须可访问。

---

## Quick Reference

| 属性 | 值 |
|------|-----|
| Hero 最小高度 | 80vh |
| Section 最小高度 | 60vh |
| 内容最大宽度 | 1200px |
| 暗面板背景 | #151821 |
| 亮面板背景 | var(--cream) #fefcf6 |
| CTA 按钮最小字号 | 16px |
| 标题字体 | Fraunces |
| 正文字体 | Noto Sans SC |
| 装饰字体 | Caveat |
| 间距单位 | 40px / 60px / 80px / 100px |
