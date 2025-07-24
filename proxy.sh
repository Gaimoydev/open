#!/bin/bash
# proxy_updater.sh

URL1="https://proxiespool.wiki/proxy.txt?key=agedcgbe"
URL2="https://get-ip.thordata.net/unlimited_api?td-customer=Thor27263627&sesstype=1&number=500&servers=vn6imb5q"
URL_CN="https://proxiespool.wiki/cn.txt?key=agedcgbe"

update_proxy_list() {
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

    echo "$TIMESTAMP - 正在更新公开代理..."
    TMP1=$(mktemp)
    if curl -s "$URL1" -o "$TMP1"; then
        shuf "$TMP1" > proxy.txt
        cp proxy.txt proxy1.txt
        echo "$TIMESTAMP - 公开代理更新完成并已打乱，保存到 proxy.txt 和 proxy1.txt"
    else
        echo "$TIMESTAMP - 公开代理更新失败"
    fi
    rm -f "$TMP1"

    echo "$TIMESTAMP - 正在更新私密代理..."
    TMP2=$(mktemp)
    if curl -s "$URL2" -o "$TMP2"; then
        shuf "$TMP2" > all.txt
        echo "$TIMESTAMP - 私密代理更新完成并已打乱，保存到 all.txt"
    else
        echo "$TIMESTAMP - 私密代理更新失败"
    fi
    rm -f "$TMP2"

    echo "$TIMESTAMP - 正在下载国内代理 cn.txt..."
    if wget -q -O cn.txt "$URL_CN"; then
        echo "$TIMESTAMP - 国内代理下载完成，保存为 cn.txt"
    else
        echo "$TIMESTAMP - 国内代理下载失败"
    fi
}

update_proxy_list

while true; do
    sleep 300
    update_proxy_list
done
