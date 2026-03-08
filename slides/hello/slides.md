---
theme: default
title: OpenClaw 介绍
info: |
  OpenClaw — AI 驱动的个人助手
class: text-center
drawings:
  persist: false
transition: slide-left
---

# OpenClaw

AI 驱动的个人助手

<div class="pt-12">
  <span class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    按空格键翻页 →
  </span>
</div>

---

# 什么是 OpenClaw？

OpenClaw 是一个 AI 驱动的个人助手平台

- 📰 **每日新闻摘要** — 自动收集 AI 和金融领域的新闻
- 📊 **量化分析** — 股票分析与回测
- 🤖 **多渠道接入** — 支持飞书、QQ 等消息平台
- ⏰ **定时任务** — 早报、午报、晚报自动推送
- 🎵 **创意生成** — 音乐、文案等创意内容

---

# 技术架构

```
┌─────────────┐     ┌──────────────┐
│   OpenClaw  │────▶│  AI Models   │
│   Core      │     │  (Claude)    │
└──────┬──────┘     └──────────────┘
       │
  ┌────┴────┐
  │         │
  ▼         ▼
┌─────┐  ┌──────┐
│ RSS │  │ 长桥  │
│ Feed│  │ API  │
└─────┘  └──────┘
```

---

# 博客系统

使用 **Astro** + **Slidev** 构建

- Markdown 写作，Git 管理
- GitHub Actions 自动部署
- 极简设计，专注内容
- 支持 Slidev 演示文稿

---
layout: center
class: text-center
---

# 谢谢

[博客](https://hanyajun.com/openclaw-blog) · [GitHub](https://github.com/Han-Ya-Jun/openclaw-blog)
