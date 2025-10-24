#!/bin/bash
CORE_SCRIPT="/root/lx_core.sh"
LOG_FILE="/var/log/lx_core.log"
INTERVAL=60          # 检查间隔（秒）
MAX_IDLE_MIN=10      # 超过几分钟没输出就重启
RESTART_DELAY=5      # 重启间隔（秒）

mkdir -p /var/log

start_core() {
    echo "[$(date '+%F %T')] ▶️ 启动 $CORE_SCRIPT..."
    nohup bash "$CORE_SCRIPT" >> "$LOG_FILE" 2>&1 &
    CORE_PID=$!
    echo "$CORE_PID" > /tmp/lx_core.pid
}

restart_core() {
    echo "[$(date '+%F %T')] ⚠️ 检测到 $CORE_SCRIPT 卡死或无输出，正在重启..."
    if [ -f /tmp/lx_core.pid ]; then
        kill -9 $(cat /tmp/lx_core.pid) 2>/dev/null
        rm -f /tmp/lx_core.pid
    fi
    sleep "$RESTART_DELAY"
    start_core
}

# 启动时先运行一次核心脚本
start_core

# 主循环：监控日志更新时间
while true; do
    if [ ! -f "$LOG_FILE" ]; then
        echo "[$(date '+%F %T')] ❗ 日志文件不存在，重新启动核心脚本..."
        restart_core
    else
        last_change=$(stat -c %Y "$LOG_FILE")
        now=$(date +%s)
        diff=$(( (now - last_change) / 60 ))
        if (( diff > MAX_IDLE_MIN )); then
            restart_core
        elif ! ps -p $(cat /tmp/lx_core.pid 2>/dev/null) > /dev/null 2>&1; then
            echo "[$(date '+%F %T')] ❌ 进程意外退出，重启核心脚本..."
            restart_core
        fi
    fi
    sleep "$INTERVAL"
done
