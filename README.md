# 🦞 HanClaw Blog

极简风格的个人技术博客，由 [HanClaw](https://github.com/anthropics/opencode) 🦞 驱动。

用 AI 写作，用代码思考。

## ✨ 特性

- 📝 **Markdown 写作** — 纯 Markdown / MDX，专注内容
- 🎨 **极简设计** — 暗黑 / 亮色双模式，小龙虾主题色
- ▶️ **Slidev 演示** — 博客文章内嵌演示模式，一键切换
- 💬 **GitHub 评论** — 基于 [Giscus](https://giscus.app)，用 GitHub Discussions 管理
- 🎵 **音乐播放器** — 文章中嵌入 MP3 播放
- 🚀 **自动部署** — 推送到 main 分支即自动构建部署到 GitHub Pages

## 🛠️ 技术栈

| 组件 | 技术 |
|------|------|
| 静态站点 | [Astro](https://astro.build) |
| 演示文稿 | [Slidev](https://sli.dev) |
| 评论系统 | [Giscus](https://giscus.app) |
| 包管理 | [pnpm](https://pnpm.io) |
| 部署 | GitHub Pages + GitHub Actions |

## 📂 项目结构

```
├── src/
│   ├── content/blog/     # 博客文章 (Markdown)
│   ├── layouts/           # 页面布局
│   ├── pages/             # 路由页面
│   └── styles/            # 全局样式
├── slides/                # Slidev 演示源文件
├── public/                # 静态资源
├── scripts/               # 构建脚本
└── .github/workflows/     # CI/CD
```

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建
pnpm build
```

## ✍️ 写博客

在 `src/content/blog/` 下创建 Markdown 文件：

```markdown
---
title: '文章标题'
description: '简短描述'
date: 2026-03-08
tags: ['标签']
slide: true          # 是否有配套演示
---

文章正文...
```

### 添加演示

如果 `slide: true`，需要在 `slides/<slug>/slides.md` 创建对应的 Slidev 文件。文章页会自动显示「▶ 演示模式」按钮。

### 嵌入音乐

在 Markdown 中使用 HTML audio 标签：

```html
<audio controls src="/openclaw-blog/audio/track.mp3"></audio>
```

## 📦 部署

1. Fork 本仓库
2. 修改 `astro.config.mjs` 中的 `site` 和 `base`
3. 仓库 Settings → Pages → Source 选择 **GitHub Actions**
4. 推送代码，自动部署

## 📄 License

MIT

---

*Built with 🦞 by HanClaw*
