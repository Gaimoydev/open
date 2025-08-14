#!/bin/bash

URL1="https://proxiespool.wiki/proxy.txt?key=agedcgbe"
URL_CN="https://proxiespool.wiki/cn.txt?key=agedcgbe"
URL2="https://proxyapi.sswc.cfd/api.php?key=ay4t9b1w0s"
URL2_CN="https://proxyapi.sswc.cfd/api.php?key=ay4t9b1w0s&geo=cn"

update_proxy_list() {
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

    echo "$TIMESTAMP - 正在更新全球代理..."
    TMP_GLOBAL=$(mktemp)
    TMP_GLOBAL2=$(mktemp)
    curl -s "$URL1" -o "$TMP_GLOBAL"
    curl -s "$URL2" -o "$TMP_GLOBAL2"
    cat "$TMP_GLOBAL" "$TMP_GLOBAL2" | grep -v '^$' | shuf > proxy.txt
    cp proxy.txt proxy1.txt
    echo "$TIMESTAMP - 全球代理更新完成，已打乱并保存到 proxy.txt 和 proxy1.txt"

    rm -f "$TMP_GLOBAL" "$TMP_GLOBAL2"

    echo "$TIMESTAMP - 正在更新国内代理..."
    TMP_CN=$(mktemp)
    TMP_CN2=$(mktemp)
    curl -s "$URL_CN" -o "$TMP_CN"
    curl -s "$URL2_CN" -o "$TMP_CN2"
    cat "$TMP_CN" "$TMP_CN2" | grep -v '^$' > cn.txt
    echo "$TIMESTAMP - 国内代理更新完成，保存为 cn.txt"

    rm -f "$TMP_CN" "$TMP_CN2"
}

update_proxy_list

while true; do
    sleep 300
    update_proxy_list
done
