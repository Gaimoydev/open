#!/bin/bash
# ------------------- lx_config.sh -------------------
# 交互式生成任务命令并写回 lx.sh

LX_SH_FILE="./lx.sh"

if [ ! -f "$LX_SH_FILE" ]; then
    echo "⚠️ 未找到 $LX_SH_FILE，请确认 lx.sh 在同一目录下"
    exit 1
fi

echo "⚙️ 开始录入白天任务命令，每行一个，输入 ok 完成："
day_commands=()
while true; do
    read -r cmd
    [ "$cmd" = "ok" ] && break
    [ -n "$cmd" ] && day_commands+=("$cmd")
done

echo "⚙️ 开始录入夜间任务命令，每行一个，输入 ok 完成："
night_commands=()
while true; do
    read -r cmd
    [ "$cmd" = "ok" ] && break
    [ -n "$cmd" ] && night_commands+=("$cmd")
done

# ------------------- 写回 lx.sh -------------------
# 先删除原 lx.sh 中 day_commands 与 night_commands 部分
sed -i '/^day_commands=/,/^)/d' "$LX_SH_FILE"
sed -i '/^night_commands=/,/^)/d' "$LX_SH_FILE"

# 插入新命令数组
{
    echo ""
    echo "# ------------------- 自动更新任务命令 -------------------"
    echo "day_commands=("
    for c in "${day_commands[@]}"; do
        echo "    \"$c\""
    done
    echo ")"
    echo ""
    echo "night_commands=("
    for c in "${night_commands[@]}"; do
        echo "    \"$c\""
    done
    echo ")"
    echo ""
} >> "$LX_SH_FILE"

echo "✅ lx.sh 已更新完成！"
