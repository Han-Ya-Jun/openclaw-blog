# AGENTS.md — openclaw-blog 操作指南

## 项目概览

HanClaw Blog 是基于 [Astro](https://astro.build) 的静态博客，部署在 GitHub Pages。

| 项 | 值 |
|---|---|
| 仓库 | `Han-Ya-Jun/openclaw-blog` |
| 线上地址 | `https://hanyajun.com/openclaw-blog/` |
| base 路径 | `/openclaw-blog` |
| 包管理器 | pnpm（通过 nvm 加载：`. "$HOME/.nvm/nvm.sh"`）|
| 部署方式 | push 到 `main` → GitHub Actions 自动构建部署 |

## 目录结构

```
src/
├── content/blog/       # 博客文章（Markdown）
├── content/config.ts   # 内容集合 schema 定义
├── layouts/
│   ├── Base.astro      # 全局布局（header、footer、主题切换）
│   └── Post.astro      # 文章布局（TOC 侧边栏、Giscus 评论）
├── pages/
│   ├── index.astro     # 首页（最新 20 篇文章列表）
│   └── blog/
│       ├── index.astro       # 博客列表页（按年分组）
│       └── [...slug].astro   # 文章详情页
├── styles/global.css   # 全局样式
└── components/         # 组件（目前为空，按需添加）
slides/                 # Slidev 演示源文件
public/                 # 静态资源（favicon 等）
scripts/build-slides.mjs # Slidev 构建脚本
```

## 写文章

### 创建文件

在 `src/content/blog/` 下创建 `.md` 文件，文件名即为 URL slug。

示例：`src/content/blog/my-post.md` → 访问路径 `/openclaw-blog/blog/my-post/`

### Frontmatter 格式

```yaml
---
title: '文章标题'           # 必填，string
description: '简短描述'     # 可选，string，显示在文章列表
date: 2026-03-08            # 必填，日期格式 YYYY-MM-DD
tags: ['标签1', '标签2']    # 可选，string[]，默认 []
draft: false                # 可选，boolean，默认 false，true 则不会出现在列表
slide: false                # 可选，boolean，默认 false，true 则显示「▶ 演示模式」按钮
---
```

### 内容规范

- 使用标准 Markdown 语法
- 标题层级从 `## h2` 开始（h1 由布局自动渲染文章标题）
- 支持 GFM 表格、代码高亮（Shiki，主题：github-light / github-dark）
- 支持内联 HTML
- 文章末尾自动渲染 Giscus 评论区
- 右侧自动生成 TOC 目录（基于 h2 / h3，宽屏 >960px 显示）

### 嵌入音乐

直接在 Markdown 中使用 HTML `<audio>` 标签：

```html
<audio controls src="https://hanyajun.com/static-pages/shenzhen-dream.mp3" style="width:100%; margin: 1em 0;"></audio>
```

如果音频文件放在本项目 `public/audio/` 下：

```html
<audio controls src="/openclaw-blog/audio/filename.mp3" style="width:100%; margin: 1em 0;"></audio>
```

注意：`src` 路径需包含 base 路径 `/openclaw-blog`（仅限 public 目录内的资源）。

### 添加 Slidev 演示

1. 文章 frontmatter 设置 `slide: true`
2. 创建 `slides/<slug>/slides.md`（slug 与文章文件名一致）
3. Slidev 文件格式参考 `slides/hanclaw-install/slides.md`
4. 构建时 `scripts/build-slides.mjs` 会自动处理
5. 文章页顶部会自动出现「▶ 演示模式」按钮，链接到 `/openclaw-blog/slides/<slug>/`

## 构建与部署

### 本地构建

```bash
# 加载 nvm
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

cd /root/openclaw-blog
pnpm build          # 构建 Astro 站点到 dist/
```

### 部署

推送到 `main` 分支即触发 GitHub Actions 自动部署：

```bash
git add .
git commit -m "描述"
git push
```

CI 流程：`pnpm install` → `pnpm build`（Astro）→ 安装 Slidev → `node scripts/build-slides.mjs`（演示文稿）→ 部署到 GitHub Pages。

## 样式要点

- 暗黑 / 亮色双模式，通过 `html.dark` 类切换
- 主题色（小龙虾红）：亮色 `#dc2626`，暗色 `#ef4444`
- CSS 变量定义在 `src/styles/global.css`（`--c-bg`、`--c-text`、`--c-accent` 等）
- 字体：正文 `Noto Sans SC`，标题 `Instrument Serif`，代码 `JetBrains Mono`
- 内容最大宽度 `720px`

## 静态资源

外部托管的静态文件（如 MP3）在另一个仓库：

| 项 | 值 |
|---|---|
| 仓库 | `Han-Ya-Jun/static-pages`（`gh-pages` 分支）|
| 本地路径 | `/root/.openclaw/workspace/static-pages/` |
| 线上地址 | `https://hanyajun.com/static-pages/` |

大文件（音频、视频等）放 `static-pages` 仓库，博客中通过完整 URL 引用。

## 注意事项

- 文件名用英文短横线连接（如 `zhui-meng.md`），不要用中文或空格
- `date` 字段影响排序，新文章在前
- `draft: true` 的文章不会出现在列表页和首页，但仍可通过直接 URL 访问
- 所有 `public/` 下的资源引用路径需加 `/openclaw-blog` 前缀
- Giscus 评论基于 pathname 映射，slug 变更会导致评论丢失
