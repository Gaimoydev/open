#!/bin/bash
# ------------------- lx_config.sh -------------------
# 交互式生成 day_commands 和 night_commands，并替换 lx.sh 中任务批次部分

LX_SH_FILE="./lx.sh"

if [ ! -f "$LX_SH_FILE" ]; then
    echo "⚠️ 未找到 $LX_SH_FILE，请确认 lx.sh 在同一目录下"
    exit 1
fi

# 1️⃣ 输入白天任务
echo "⚙️ 开始录入白天任务命令，每行一个，输入 ok 完成："
day_commands=()
while true; do
    read -r cmd
    [ "$cmd" = "ok" ] && break
    [ -n "$cmd" ] && day_commands+=("$cmd")
done

# 2️⃣ 输入夜间任务
echo "⚙️ 开始录入夜间任务命令，每行一个，输入 ok 完成："
night_commands=()
while true; do
    read -r cmd
    [ "$cmd" = "ok" ] && break
    [ -n "$cmd" ] && night_commands+=("$cmd")
done

# 3️⃣ 构建临时任务块
tmp_file=$(mktemp)
{
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
} > "$tmp_file"

# 4️⃣ 找到原任务批次起始行
start_line=$(grep -n '^# ------------------- 任务批次 -------------------' "$LX_SH_FILE" | cut -d: -f1)
if [ -z "$start_line" ]; then
    echo "⚠️ lx.sh 中未找到 '# ------------------- 任务批次 -------------------'"
    rm "$tmp_file"
    exit 1
fi

# 找到任务批次结束行（到 # ------------------- 主循环 ------------------- 或文件末尾）
end_line=$(tail -n +"$start_line" "$LX_SH_FILE" | grep -n -m1 -E '^# ------------------- 主循环 -------------------|^$' | head -n1 | cut -d: -f1)
end_line=$((start_line + end_line - 2))

# 删除所有旧 day_commands 和 night_commands
sed -i '/^day_commands=/,/^)/d' "$LX_SH_FILE"
sed -i '/^night_commands=/,/^)/d' "$LX_SH_FILE"

# 6️⃣ 在原位置插入新任务块
sed -i "${start_line}r $tmp_file" "$LX_SH_FILE"

# 7️⃣ 清理临时文件
rm "$tmp_file"

# 确保 while 循环没有被破坏，检查是否有未闭合的结构
echo "✅ lx.sh 中 day_commands 和 night_commands 已成功更新！"
