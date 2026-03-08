---
title: '玩转 HanClaw 系列 —— 安装'
description: '从零开始安装 HanClaw（OpenClaw），配置 Skills、定时任务、MCP 服务，打造你的 AI 私人助手。'
date: 2026-03-08
tags: ['HanClaw', '教程', 'AI']
slide: true
---

> HanClaw 是我基于 [OpenClaw](https://github.com/anthropics/opencode) 搭建的 AI 私人助手。它能帮我做每日新闻摘要、股票分析、代码审查、音乐生成，甚至写博客——没错，这篇文章就是它帮我写的。

## 什么是 HanClaw？

一只会写代码的小龙虾 🦞。

本质上，它是一个运行在服务器上的 AI Agent 平台。你可以把它理解为一个**永不下线的 AI 助手**，通过 QQ、飞书等消息平台与你交互，同时在后台默默地执行定时任务：抓新闻、做分析、跑备份。

它的核心能力来自 **Skills（技能）**—— 一组可插拔的 Markdown 文件，定义了 Agent 在特定场景下的行为。

## 安装

### 前置要求

- Linux 服务器（推荐 Ubuntu/Debian/OpenCloudOS）
- Node.js 20+
- pnpm（推荐）或 npm

### 第一步：安装 OpenClaw

```bash
pnpm add -g openclaw@latest
```

### 第二步：运行引导向导

```bash
openclaw onboard
```

引导向导会问你一系列问题，帮你完成初始化：

- 创建工作区目录 `~/.openclaw/workspace/`
- 生成核心配置文件 `openclaw.json`
- 设置 AI 模型（支持多种模型提供商）
- 配置消息渠道（QQ Bot、飞书等）

完成后，工作区里会自动创建这些文件：

| 文件 | 用途 |
|------|------|
| `AGENTS.md` | Agent 行为规范 |
| `SOUL.md` | Agent 人格与风格 |
| `MEMORY.md` | 长期记忆 |
| `USER.md` | 用户信息 |

### 第三步：安装守护进程

```bash
openclaw onboard --install-daemon
```

这会创建一个 systemd 用户服务 `openclaw-gateway.service`，让 HanClaw 开机自启、永不掉线。

### 第四步：启动网关

```bash
openclaw gateway start
```

到这里，你的 HanClaw 就已经跑起来了。默认监听端口 `18789`。

## 配置 AI 模型

HanClaw 支持多种模型提供商，在 `openclaw.json` 中配置：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "arkcode/ark-code-latest"
      }
    }
  }
}
```

我目前用的配置：

| 用途 | 模型 |
|------|------|
| 主模型 | 火山引擎 ARK |
| 图片识别 | Claude Opus 4.6 |
| ACP 代码执行 | Claude Opus 4.6 |

## Skills：技能系统

这是 HanClaw 最有趣的部分。每个 Skill 就是一个包含 `SKILL.md` 的文件夹，定义了 Agent 在特定任务中该怎么做。

### 安装技能

```bash
# 通过 skillhub 安装
skillhub install <skill-name>

# 或直接克隆到 skills 目录
cd ~/.openclaw/workspace/skills/
git clone <repo-url>
```

> **安全提示**：安装任何技能前，建议先用 `skill-vetter` 做安全检查。它会审查技能的来源、权限需求和潜在风险。

### 我在用的技能

经过几个月的折腾，我的 HanClaw 目前装了 **40+ 个技能**，这里挑几个有意思的：

#### 📊 量化分析类
- **stock-analysis-lianghua-integrated** — 基于长桥 OpenAPI 的股票分析，支持实时行情、K 线图、多因子评分
- **backtest-expert** — 量化回测

#### 🔍 搜索类
- **exa-web-search-free** — Exa 免费搜索，无需 API Key
- **ddg-web-search** — DuckDuckGo 搜索
- **aliyun-web-search** — 阿里云夸克搜索

#### 📰 新闻与信息
- **rss-ai-reader** — RSS 抓取 + LLM 智能摘要 + 多渠道推送
- **ai-news-collectors** — AI 新闻聚合
- **cls-news-scraper** — 财联社新闻爬虫

#### 🛠️ 工具类
- **cron-backup** — 定时备份（本地 + 腾讯云 COS）
- **workspace-cleaner** — 工作区清理
- **tencentcloud-cos-skill** — 腾讯云对象存储
- **tencentcloud-lighthouse-skill** — 腾讯云轻量服务器管理

#### 🎵 创意类
- **mmMusicMaker** — AI 音乐生成
- **clawdchat** — 虾聊（聊天增强）

#### 💻 开发类
- **code-review-expert** — 代码审查
- **git** / **github** — Git 和 GitHub 操作
- **devops** — 运维自动化

## MCP 服务配置

HanClaw 通过 MCP（Model Context Protocol）连接外部服务：

```bash
# 添加 Exa 搜索
mcporter config add exa https://mcp.exa.ai/mcp

# 长桥 OpenAPI（需要编译安装）
# 路径：/usr/local/bin/longport-mcp
```

环境变量配置在 systemd 服务文件中：

```bash
LONGPORT_APP_KEY=xxx
LONGPORT_APP_SECRET=xxx
LONGPORT_ACCESS_TOKEN=xxx
```

## 定时任务

HanClaw 的定时任务系统是内置的，在 `cron/jobs.json` 中配置：

| 任务 | 时间 | 说明 |
|------|------|------|
| 早报 | 每天 09:00 | AI + 金融新闻摘要 |
| 午报 | 每天 12:00 | 午间快讯 |
| 晚报 | 每天 19:00 | 晚间总结 |
| 股票日报 | 工作日 08:30 | 基于长桥 API |

另外还有系统级 crontab：

| 时间 | 任务 |
|------|------|
| 02:00 | 本地备份 |
| 02:30 | 腾讯云 COS 同步 |
| 03:00 | 清理 30 天前旧备份 |
| 12:00 | 记忆整理 |
| 每周日 04:00 | 工作区清理 |

## 记忆系统

这是 HanClaw 最让我觉得「有灵魂」的部分。它有三层记忆：

1. **会话记忆** — 当前对话的上下文，自动压缩
2. **每日日志** — `memory/YYYY-MM-DD.md`，记录每天的工作
3. **长期记忆** — `MEMORY.md`，重要决策和偏好

记忆条目有分类前缀：
- `DEC` — 决策（比如"用 Go 重写量化系统"）
- `PREF` — 偏好（比如"新闻宁可不写不能写错"）
- `FACT` — 事实（比如"用户在深圳龙华"）
- `POLICY` — 规则（比如"禁止修改 openclaw.json"）

每天 12:00 会自动整理记忆，每天 02:00 备份到本地，02:30 同步到腾讯云。

## 踩过的坑

### DuckDuckGo 验证码
DuckDuckGo 搜索经常触发验证码，解决方案：改用 Exa 免费搜索。

### 不要用 exec 运行 claude 命令
通过 `exec` 运行 claude 相关命令会超时被 SIGTERM 杀掉，这是个死循环。解决方案：写进 MEMORY.md 作为 POLICY，永远不犯第二次。

### 关键配置文件保护
`openclaw.json`、`cron/jobs.json`、`acpx/config.json` 这三个文件被 `chattr +i` 设为不可修改，防止 Agent 误操作。这是血的教训换来的规则。

## 下一步

安装完成后，你可以：

- 📱 配置 QQ Bot 或飞书，通过手机和 HanClaw 对话
- 📊 装上量化分析技能，让它每天给你发股票日报
- 📰 配置 RSS 源，自动抓取和摘要你关心的新闻
- ✍️ 让它帮你写博客（就像这篇文章一样）

---

*这篇文章由 HanClaw 🦞 辅助生成，主人审核。*
