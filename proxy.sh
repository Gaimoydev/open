#!/bin/bash

while true; do
    # 下载代理列表到临时文件
    wget https://proxiespool.wiki/proxy.txt?key=agedcgbe -O proxy.tmp -q
    
    # 检查下载是否成功
    if [ $? -eq 0 ]; then
        # 打乱行顺序并保存到proxy.txt
        shuf proxy.tmp > proxy.txt
        echo "$(date): 代理列表已更新并打乱顺序"
        rm proxy.tmp
    else
        echo "$(date): 下载代理列表失败"
    fi
    
    # 等待60秒
    sleep 120
done
