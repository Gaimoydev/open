#!/bin/bash
# ------------------- lx_config.sh -------------------
# 用法：
#   ./lx_config.sh --day     # 只更新白天任务
#   ./lx_config.sh --night   # 只更新夜间任务
#   ./lx_config.sh --all     # 同时更新白天与夜间（默认）

LX_SH_FILE="./lx_core.sh"
MODE="all"

# 解析命令行参数
case "$1" in
  --day) MODE="day" ;;
  --night) MODE="night" ;;
  --all|"") MODE="all" ;;
  *)
    echo "❌ 无效参数: $1"
    echo "用法: $0 [--day | --night | --all]"
    exit 1
    ;;
esac

if [ ! -f "$LX_SH_FILE" ]; then
    echo "⚠️ 未找到 $LX_SH_FILE，请确认 lx.sh 在同一目录下"
    exit 1
fi

# 根据参数选择要录入的部分
if [ "$MODE" = "all" ] || [ "$MODE" = "day" ]; then
    echo "⚙️ 开始录入白天任务命令，每行一个，输入 ok 完成："
    day_commands=()
    while true; do
        read -r cmd
        [ "$cmd" = "ok" ] && break
        [ -n "$cmd" ] && day_commands+=("$cmd")
    done
fi

if [ "$MODE" = "all" ] || [ "$MODE" = "night" ]; then
    echo "⚙️ 开始录入夜间任务命令，每行一个，输入 ok 完成："
    night_commands=()
    while true; do
        read -r cmd
        [ "$cmd" = "ok" ] && break
        [ -n "$cmd" ] && night_commands+=("$cmd")
    done
fi

tmp_file=$(mktemp)

# 根据选择生成相应部分
if [ "$MODE" = "all" ] || [ "$MODE" = "day" ]; then
    echo "day_commands=(" >> "$tmp_file"
    for c in "${day_commands[@]}"; do
        echo "    \"$c\"" >> "$tmp_file"
    done
    echo ")" >> "$tmp_file"
    echo "" >> "$tmp_file"
fi

if [ "$MODE" = "all" ] || [ "$MODE" = "night" ]; then
    echo "night_commands=(" >> "$tmp_file"
    for c in "${night_commands[@]}"; do
        echo "    \"$c\"" >> "$tmp_file"
    done
    echo ")" >> "$tmp_file"
    echo "" >> "$tmp_file"
fi

start_line=$(grep -n '^# ------------------- 任务批次 -------------------' "$LX_SH_FILE" | cut -d: -f1)
if [ -z "$start_line" ]; then
    echo "⚠️ lx.sh 中未找到 '# ------------------- 任务批次 -------------------'"
    rm "$tmp_file"
    exit 1
fi

# 删除旧任务块（按选择删除）
if [ "$MODE" = "all" ] || [ "$MODE" = "day" ]; then
    sed -i '/^day_commands=/,/^)/d' "$LX_SH_FILE"
fi
if [ "$MODE" = "all" ] || [ "$MODE" = "night" ]; then
    sed -i '/^night_commands=/,/^)/d' "$LX_SH_FILE"
fi

# 插入新的任务块
sed -i "${start_line}r $tmp_file" "$LX_SH_FILE"

rm "$tmp_file"

echo "✅ lx.sh 中的任务已成功更新（模式: $MODE）！"
