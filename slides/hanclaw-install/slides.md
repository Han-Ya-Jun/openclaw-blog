---
theme: default
title: 玩转 HanClaw —— 安装
info: |
  从零搭建你的 AI 私人助手
class: text-center
transition: slide-left
---

# 🦞 玩转 HanClaw

从零搭建你的 AI 私人助手

<div class="pt-8 text-sm opacity-60">
  按空格键或方向键翻页
</div>

---

# 什么是 HanClaw？

一只会写代码的小龙虾

<div class="grid grid-cols-2 gap-8 mt-8">
<div>

### 核心能力
- 🤖 永不下线的 AI Agent
- 📱 QQ / 飞书多端接入
- ⏰ 定时任务自动执行
- 🧠 三层记忆系统

</div>
<div>

### 当前数据
- **40+** 个技能
- **4** 个定时任务
- **5** 个搜索引擎
- **3** 层记忆架构

</div>
</div>

---

# 安装四步走

```bash
# 1. 安装
pnpm add -g openclaw@latest

# 2. 引导
openclaw onboard

# 3. 守护进程
openclaw onboard --install-daemon

# 4. 启动
openclaw gateway start
```

完成！你的 HanClaw 已经上线 🎉

---

# 技能系统 Skills

可插拔的 Markdown 文件，定义 Agent 行为

<div class="grid grid-cols-3 gap-4 mt-6 text-sm">
<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded">

**📊 量化分析**
- 股票分析
- 回测系统

</div>
<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded">

**🔍 搜索**
- Exa
- DuckDuckGo
- 夸克

</div>
<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded">

**🛠️ 工具**
- 备份
- 云存储
- 运维

</div>
</div>

---

# 记忆系统

<div class="grid grid-cols-3 gap-6 mt-8">
<div class="text-center">
  <div class="text-3xl mb-2">💬</div>
  <div class="font-bold">会话记忆</div>
  <div class="text-sm opacity-60 mt-1">当前对话上下文</div>
</div>
<div class="text-center">
  <div class="text-3xl mb-2">📅</div>
  <div class="font-bold">每日日志</div>
  <div class="text-sm opacity-60 mt-1">memory/YYYY-MM-DD.md</div>
</div>
<div class="text-center">
  <div class="text-3xl mb-2">🧠</div>
  <div class="font-bold">长期记忆</div>
  <div class="text-sm opacity-60 mt-1">MEMORY.md</div>
</div>
</div>

<div class="mt-8 text-sm">

记忆分类：`DEC` 决策 · `PREF` 偏好 · `FACT` 事实 · `POLICY` 规则

</div>

---
layout: center
class: text-center
---

# 🦞 开始你的 HanClaw 之旅

```bash
pnpm add -g openclaw@latest && openclaw onboard
```

[完整教程](https://hanyajun.com/openclaw-blog/blog/hanclaw-install/) · [GitHub](https://github.com/Han-Ya-Jun/openclaw-blog)
