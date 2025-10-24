#!/bin/bash
trap 'echo "[$(date "+%F %T")] 🛑 捕获退出信号，清理 lx_core 与 node..."; \
      pkill -f -9 lx_core
      pkill -f -9 node
      exit 0' SIGINT SIGTERM EXIT

CORE_SCRIPT="/root/lx_core.sh"
LOG_FILE="/var/log/lx_core.log"
INTERVAL=60          # 检查间隔（秒）
MAX_IDLE_MIN=10      # 超过几分钟没输出就重启
RESTART_DELAY=5

mkdir -p /var/log

start_core() {
    echo "[$(date '+%F %T')] ▶️ 启动 $CORE_SCRIPT..."
    pkill -f -9 lx_core
    pkill -f -9 node
    if [ -t 1 ]; then
        bash -c "bash '$CORE_SCRIPT' 2>&1 | tee -a '$LOG_FILE'" &
    else
        setsid bash -c "bash '$CORE_SCRIPT' >> '$LOG_FILE' 2>&1" &
    fi
    CORE_PID=$!
    echo "$CORE_PID" > /tmp/lx_core.pid
}

restart_core() {
    echo "[$(date '+%F %T')] ⚠️ 检测到 $CORE_SCRIPT 卡死或无输出，正在重启..."
    pkill -f -9 lx_core
    pkill -f -9 node
    sleep "$RESTART_DELAY"
    start_core
}

start_core

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
