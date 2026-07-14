# 力太阳 · 个人设计系统

一套给 AI 看的个人品牌设计系统。把审美写成操作手册，AI 每次帮你做页面时必须翻这本手册。

**限制 AI 的自由度 = 保证输出质量。**

---

## Demo

用这套系统生成的页面：

### 🧰 App 型 / 功能型 — 个人主页

功能导航、工具入口、个人仪表盘。

🔗 [在线预览](https://sjh-homepage.vercel.app)

### 📖 教程型

信息清晰、步骤明确、有节奏的单页教程。

*Coming soon*

### 🎪 Landing

视觉冲击、深浅面板交替的活动邀请页。

*Coming soon*

---

## 核心逻辑

```
SKILL.md（流程 - AI 按什么步骤干活）
    ↓
brand-dna.md + references/*（规范 - 能用什么不能用什么）
    ↓
assets/template-*.html（起点 - 从模板改，不从零写）
```

- AI 不能随便发明布局 → 只能从 layouts.md 里选
- AI 不能随便用颜色 → 只能用品牌三色 + 扩展规则
- AI 不能随便写样式 → 必须从组件库里选
- AI 做完要自检 → 对照 checklist 逐条过

---

## 文件结构

```
pikesun-design-system/
├── SKILL.md                    ← 7步工作流（大脑）
├── brand-dna.md                ← 品牌基因：颜色/字体/气质/禁忌
├── README.md                   ← 你在看的这个
├── assets/                     ← 模板骨架（起点）
│   ├── template-tutorial.html      教程页
│   ├── template-landing.html       活动页/Landing
│   ├── template-app.html           App型/功能型
│   └── template-cards.html         图文卡片
└── references/                 ← 规则和零件（知识库）
    ├── layouts.md                  布局模式
    ├── components.md               组件库
    ├── checklist.md                质量检查清单
    ├── scene-tutorial.md           教程场景规范
    ├── scene-landing.md            活动页场景规范
    ├── scene-app.md               App型场景规范
    └── scene-cards.md              图文卡片场景规范
```

---

## 7 步工作流

AI 每次做设计必须按这个顺序走：

| # | 做什么 | 为什么 |
|---|--------|--------|
| 1 | 问 5 个问题（类型/受众/几屏/素材/约束） | 不自作主张 |
| 2 | 读 brand-dna + 对应场景文件 | 先学规矩再动手 |
| 3 | 从 assets/ 复制对应模板 | 从半成品开始 |
| 4 | 从 layouts.md 选 3-5 种布局 | 每个 section 不能一样 |
| 5 | 从 components.md 选组件 | 禁止用 HTML 默认样式 |
| 6 | 对照 checklist 自检 | P0 不过就打回 |
| 7 | 交付 HTML 文件 | 浏览器打开就能看 |

---

## 品牌基因速览

### 三色

| 颜色 | 色值 | 比例 |
|------|------|------|
| 主色 | `#0071E3` | 60% |
| 强调色 | `#FF9500` | 30% |
| 点缀色 | `#FF3B30` | 10% |

### 气质关键词

简洁干练 · 功能优先 · 有温度 · 不像模板 · 一看就是力太阳的

---

## 怎么用

1. Fork 或克隆本仓库
2. （可选）打开 `brand-dna.md`，替换成你自己的品牌色
3. 把仓库链接发给你的 AI Agent，跟它说：

> 帮我读这个设计系统，以后做页面按这个规范来。

---

## License

[![CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

本仓库采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议。

- ✅ 可自由使用、修改、分享
- ✅ 必须署名：力太阳 (sjh2499)
- ❌ 禁止商用
- 🔄 修改后必须以相同协议分享
