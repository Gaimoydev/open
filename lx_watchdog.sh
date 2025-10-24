#!/bin/bash
SERVICE="lunxun"
INTERVAL=60
MAX_IDLE_MIN=10

while true; do
    last_change=$(journalctl -u $SERVICE -n 1 --no-pager --output=short-unix | awk '{print int($1)}')
    now=$(date +%s)
    diff=$(( (now - last_change) / 60 ))

    if (( diff > MAX_IDLE_MIN )); then
        echo "⚠️ $SERVICE 无日志更新超过 $MAX_IDLE_MIN 分钟，重启中..."
        systemctl restart $SERVICE
    fi

    sleep $INTERVAL
done
