#!/bin/bash
# ------------------- lx_config.sh -------------------
# 交互式生成任务命令并替换 lx.sh 中原有 day_commands 和 night_commands

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

# ------------------- 精确替换 lx.sh 中命令数组 -------------------
# day_commands
start_line=$(grep -n '^day_commands=(' "$LX_SH_FILE" | cut -d: -f1)
end_line=$(grep -n '^)' "$LX_SH_FILE" | grep -A1 "$start_line" | head -n1 | cut -d: -f1)
sed -i "${start_line},${end_line}d" "$LX_SH_FILE"

# 在原位置插入新 day_commands
{
    echo "day_commands=("
    for c in "${day_commands[@]}"; do
        echo "    \"$c\""
    done
    echo ")"
} | sed "${start_line}i\\" "$LX_SH_FILE"

# night_commands
start_line=$(grep -n '^night_commands=(' "$LX_SH_FILE" | cut -d: -f1)
end_line=$(grep -n '^)' "$LX_SH_FILE" | grep -A1 "$start_line" | head -n1 | cut -d: -f1)
sed -i "${start_line},${end_line}d" "$LX_SH_FILE"

# 在原位置插入新 night_commands
{
    echo "night_commands=("
    for c in "${night_commands[@]}"; do
        echo "    \"$c\""
    done
    echo ")"
} | sed "${start_line}i\\" "$LX_SH_FILE"

echo "✅ lx.sh 已在原位置替换 day_commands 和 night_commands 完成！"
