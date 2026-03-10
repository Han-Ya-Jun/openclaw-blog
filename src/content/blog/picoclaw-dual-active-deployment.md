---
title: 'OpenClaw + PicoClaw 双活架构实战：从零搭建高可用 AI 助手'
description: '记录 PicoClaw 完整部署过程，包括模型配置、API 兼容性踩坑、双向运维能力建设，实现 OpenClaw 双活架构。'
date: 2026-03-10
tags: ['OpenClaw', 'PicoClaw', 'AI', '运维', '双活架构']
draft: false
---

## 背景

OpenClaw 作为主力 AI 助手运行在 18789 端口，承载了大量业务逻辑。为了提高系统可用性和运维灵活性，今天部署了 PicoClaw 作为轻量级备用助手，运行在 18790 端口。

PicoClaw 是 Go 实现的轻量 AI Gateway，相比 Node.js 版的 OpenClaw，它启动更快、内存占用更小，非常适合作为运维专用助手。

## 架构设计

### 双活模式

| 服务 | 端口 | 管理方式 | 用途 |
|------|------|----------|------|
| OpenClaw Gateway | 18789 | systemd user 服务 | 主 AI 助手（Node.js） |
| PicoClaw Gateway | 18790 | systemd 系统服务 | 轻量 AI 助手（Go，运维专用） |

### 双向运维能力

- OpenClaw 持有 `picoclaw-ops` skill → 可以诊断和管理 PicoClaw
- PicoClaw 持有 `openclaw-ops` skill → 可以诊断和管理 OpenClaw

这样任何一方出问题，另一方都能介入修复。

## 部署流程

### 1. 安装 PicoClaw

```bash
# 下载并安装 PicoClaw v0.2.1
# 假设已有二进制文件
sudo cp picoclaw /usr/local/bin/
sudo chmod +x /usr/local/bin/picoclaw

# 初始化配置和工作区
picoclaw onboard
```

执行 `onboard` 后会生成：
- `/root/.picoclaw/config.json` — 主配置文件
- `/root/.picoclaw/workspace/` — 工作目录

### 2. 创建 systemd 服务

创建 `/etc/systemd/system/picoclaw.service`：

```ini
[Unit]
Description=PicoClaw AI Assistant Gateway
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/.picoclaw
ExecStart=/usr/local/bin/picoclaw gateway
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启用并启动服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable picoclaw
sudo systemctl start picoclaw
```

### 3. 配置 QQ Bot

在 PicoClaw 的 `config.json` 中配置 QQ Bot：

```json
{
  "channels": {
    "qq": {
      "enabled": true,
      "app_id": "102923388",
      "client_secret": "YOUR_SECRET",
      "is_sandbox": false
    }
  }
}
```

重启服务后，PicoClaw 会自动连接 QQ Bot WebSocket。

### 4. 模型配置（对齐 OpenClaw）

从 OpenClaw 的 `openclaw.json` 读取 provider 配置，在 PicoClaw 中配置相同的模型列表：

```json
{
  "model_list": [
    {
      "model_name": "claude-opus-4-6",
      "litellm_params": {
        "model": "anthropic/claude-opus-4-6",
        "api_base": "https://xchai.xyz/v1",
        "api_key": "sk-xxx"
      }
    },
    {
      "model_name": "deepseek-v3.2",
      "litellm_params": {
        "model": "openai/deepseek-v3.2",
        "api_base": "https://api.lkeap.cloud.tencent.com/v1",
        "api_key": "sk-xxx"
      }
    },
    {
      "model_name": "ark-code-latest",
      "litellm_params": {
        "model": "anthropic/ark-code-latest",
        "api_base": "https://ark.cn-beijing.volces.com/api/coding/v1",
        "api_key": "xxx"
      }
    }
  ],
  "default_model": "claude-opus-4-6"
}
```

## 踩坑记录

### 坑 1：xchai 返回 HTML

**现象**：调用 xchai 代理的 Anthropic API 时返回 HTML 页面，而不是 JSON。

**原因**：`api_base` 配置为 `https://xchai.xyz`，缺少 `/v1` 后缀。

**解决**：改为 `https://xchai.xyz/v1`。

### 坑 2：端口 18790 被占用

**现象**：systemd 启动 PicoClaw 失败，提示端口已被占用。

**原因**：之前手动启动过 `picoclaw gateway`，进程残留。

**解决**：
```bash
# 找到占用端口的进程
lsof -i :18790
# 杀掉进程
kill <PID>
# 重启 systemd 服务
sudo systemctl restart picoclaw
```

### 坑 3：Anthropic 代理间歇性空回复

**现象**：xchai 代理偶尔返回 `content_chars=0` 空回复。

**原因**：可能是协议兼容性问题或代理服务不稳定。

**解决**：
1. 先换成 OpenAI 协议的模型（如 `deepseek-v3.2`），验证功能正常
2. 如果需要 Anthropic 协议，可以换其他 provider（如 ARK Code）

### 坑 4：ARK Code 前缀错误

**现象**：使用 `volcengine/ark-code-latest` 调用火山引擎 ARK Code 时报 404。

**原因**：ARK Code 的 coding 端点使用 Anthropic 协议，不是 OpenAI 协议。

**解决**：改为 `anthropic/` 前缀 + `api_base: https://ark.cn-beijing.volces.com/api/coding/v1`。

### 坑 5：PicoClaw 无法读取 OpenClaw 配置

**现象**：PicoClaw 尝试读取 `/root/.openclaw/openclaw.json` 时被拒绝。

**原因**：PicoClaw 默认只能读取自己的 workspace 内文件（安全限制）。

**解决**：在 PicoClaw `config.json` 中添加：
```json
{
  "allow_read_outside_workspace": true,
  "allow_read_paths": [
    "/root/.openclaw/",
    "/root/.openclaw/workspace/",
    "/etc/systemd/system/openclaw-gateway.service"
  ]
}
```

重启服务生效。

## 双向运维 Skill

### OpenClaw 侧：picoclaw-ops

路径：`/root/.openclaw/workspace/skills/picoclaw-ops/SKILL.md`

包含内容：
- PicoClaw 服务信息（端口、配置路径、systemd 服务名）
- 快速诊断命令（`systemctl status picoclaw`、日志查看）
- 配置结构说明
- 模型配置方法
- 常见故障排查（端口占用、API 错误、权限问题）
- 版本升级流程

### PicoClaw 侧：openclaw-ops

路径：`/root/.picoclaw/workspace/skills/openclaw-ops/SKILL.md`

包含内容：
- OpenClaw 系统架构（Gateway、量化引擎、定时任务）
- 诊断流程（服务状态、日志、配置检查）
- 常见问题修复（服务重启、端口冲突、模型切换）
- 配置管理（`openclaw.json` 结构、环境变量）
- 量化运维（supervisord 管理、策略进程监控）
- 会话日志查看

## 记忆文件建设

为了让 PicoClaw 具备持久记忆，创建了 `/root/.picoclaw/workspace/memory/MEMORY.md`，包含：

- 用户信息（handry、时区、位置）
- OpenClaw 系统概况（架构、端口、服务）
- 模型配置（当前使用的 provider 和模型）
- 诊断命令速查表
- 故障修复经验（今天踩的坑）
- 安全规则（禁止修改的文件、禁止的操作）

## 验证测试

### 1. 服务状态检查

```bash
# OpenClaw
systemctl --user status openclaw-gateway

# PicoClaw
systemctl status picoclaw

# 量化引擎
supervisorctl -c /root/.openclaw/workspace/openclaw-trade/supervisord.conf status
```

全部显示 `active (running)` 或 `RUNNING`。

### 2. 端口监听

```bash
netstat -tlnp | grep -E '18789|18790|19001'
```

输出：
```
tcp  0.0.0.0:18789  LISTEN  <pid>/node
tcp  0.0.0.0:18790  LISTEN  <pid>/picoclaw
tcp  0.0.0.0:19001  LISTEN  <pid>/supervisord
```

### 3. QQ Bot 连接

两个 Bot 都能正常收发消息，互不干扰。

### 4. 双向运维能力

- 在 OpenClaw 中询问 "PicoClaw 状态如何？" → 自动调用 `picoclaw-ops` skill，返回服务状态
- 在 PicoClaw 中询问 "OpenClaw 量化引擎运行正常吗？" → 自动调用 `openclaw-ops` skill，返回 supervisord 状态

## 总结

通过今天的部署，实现了：

1. **双活架构**：OpenClaw + PicoClaw 同时运行，互为备份
2. **双向运维**：任何一方都能诊断和修复另一方
3. **模型对齐**：两边使用相同的 LLM provider 配置
4. **记忆同步**：PicoClaw 持有 OpenClaw 的系统知识
5. **踩坑记录**：多个 API 兼容性问题已解决并文档化

下一步计划：
- 配置 PicoClaw 的定时任务（健康检查、日志清理）
- 实现两个助手之间的消息转发（互相唤醒）
- 探索 PicoClaw 的性能优势（启动速度、内存占用）

## 参考资料

- [PicoClaw GitHub](https://github.com/openclaw/picoclaw)
- [OpenClaw 文档](https://docs.openclaw.ai)
- [systemd 服务管理](https://www.freedesktop.org/software/systemd/man/systemd.service.html)
