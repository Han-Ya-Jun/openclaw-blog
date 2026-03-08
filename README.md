# OpenClaw Blog

极简风格的个人博客，由 [Astro](https://astro.build) 驱动，支持 [Slidev](https://sli.dev) 演示文稿。

## 快速开始

```bash
npm install
npm run dev        # 启动开发服务器
npm run build      # 构建静态站点
npm run preview    # 预览构建结果
```

## 写博客

在 `src/content/blog/` 下创建 `.md` 文件：

```markdown
---
title: '文章标题'
description: '简短描述'
date: 2026-03-08
tags: ['标签']
---

正文内容...
```

## 创建演示

1. 在 `slides/` 下创建新目录，例如 `slides/my-talk/`
2. 创建 `slides/my-talk/slides.md`（Slidev 格式）
3. 在 `src/content/slides/` 下创建对应的 JSON 元数据文件

## 部署

推送到 `main` 分支即可自动部署到 GitHub Pages（需要先在仓库设置中启用 Pages）。

### 配置步骤

1. 修改 `astro.config.mjs` 中的 `site` 为你的 GitHub Pages URL
2. 仓库 Settings → Pages → Source 选择 "GitHub Actions"
3. 推送代码，等待自动部署

## 项目结构

```
├── src/
│   ├── content/
│   │   ├── blog/          # 博客文章 (Markdown)
│   │   └── slides/        # 演示元数据 (JSON)
│   ├── layouts/           # 页面布局
│   ├── pages/             # 路由页面
│   └── styles/            # 全局样式
├── slides/                # Slidev 演示源文件
├── public/                # 静态资源
└── .github/workflows/     # GitHub Actions
```
