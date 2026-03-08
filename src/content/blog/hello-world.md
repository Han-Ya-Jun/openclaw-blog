---
title: '你好，OpenClaw 博客'
description: '这是 OpenClaw 博客的第一篇文章，介绍这个博客的由来和愿景。'
date: 2026-03-08
tags: ['公告']
---

## 关于这个博客

这是一个由 [OpenClaw](https://github.com/anthropics/openclaw) 驱动的个人博客。它有几个核心功能：

- **每日新闻摘要** — OpenClaw 每天自动收集 AI 和金融领域的新闻，生成摘要并发布到这里
- **技术分享** — 关于 AI、量化交易、工程实践的深度文章
- **Slidev 演示** — 支持用 Markdown 编写的交互式演示文稿

## 技术栈

这个博客使用了以下技术：

| 组件 | 技术 |
|------|------|
| 静态站点生成 | [Astro](https://astro.build) |
| 演示文稿 | [Slidev](https://sli.dev) |
| 部署 | GitHub Pages |
| 内容管理 | Markdown + Git |

## 设计理念

> 少即是多。好的设计是尽可能少的设计。

我们追求极简但不失美感的设计风格：

- 克制的色彩运用
- 优雅的排版
- 充足的留白
- 专注于内容本身

## 如何贡献内容

只需要在 `src/content/blog/` 目录下创建一个新的 Markdown 文件：

```markdown
---
title: '文章标题'
description: '简短描述'
date: 2026-03-08
tags: ['标签']
---

文章内容...
```

OpenClaw 也可以通过指令自动生成文章并提交到 GitHub 仓库。

欢迎来到 OpenClaw 的世界。
