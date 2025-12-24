#!/bin/bash
# proxy_updater.sh (merged + dedup + normalize + atomic write)

set -euo pipefail

# ===== 源配置 =====
# 全球
URLS_GLOBAL=(
  "https://proxyapi.sswc.cfd/api.php?key=ay4t9b1w0s"
  "https://proxy.wuhen.shop/api/proxy?key=dbcffe90314c0896&limit=-1"
)

# 中国
URLS_CN=(
  "https://proxyapi.sswc.cfd/api.php?key=ay4t9b1w0s&geo=cn"
  "https://proxy.wuhen.shop/api/proxy?key=dbcffe90314c0896&country=CN&limit=-1"
)

# ===== 通用函数 =====
log() { echo "$(date '+%Y-%m-%d %H:%M:%S') - $*"; }

# 归一化：把空格/制表/逗号分割的列表拆成一行一条，过滤空行和明显非法项
normalize_list() {
  tr ' \t,' '\n' \
  | sed 's/^[[:space:]]\+//; s/[[:space:]]\+$//' \
  | grep -v '^[[:space:]]*$' \
  | grep -E '^[^[:space:]]+:[0-9]{2,5}$' || true
}

# 下载一个 URL 并追加到临时汇总文件
fetch_and_append() {
  local url="$1"
  local out_tmp="$2"
  local tmp
  tmp="$(mktemp)"

  if curl -sS --connect-timeout 5 --max-time 10 --retry 2 --retry-delay 1 "$url" -o "$tmp"; then
    # 归一化后追加
    normalize_list <"$tmp" >>"$out_tmp" || true
    log "获取成功：$url"
  else
    log "获取失败：$url"
  fi
  rm -f "$tmp"
}

# 合并多个源 -> 去重 ->（可选打乱）-> 原子写入
merge_sources() {
  local -n urls_ref=$1   # bash 4+ nameref
  local out_file="$2"
  local do_shuffle="${3:-0}"  # 1=打乱
  local tmp_all tmp_sorted tmp_final

  tmp_all="$(mktemp)"
  tmp_sorted="$(mktemp)"
  tmp_final="$(mktemp)"

  # 抓取所有源
  for u in "${urls_ref[@]}"; do
    fetch_and_append "$u" "$tmp_all"
  done

  # 去重
  sort -u "$tmp_all" > "$tmp_sorted"

  # 如果全为空，给出提示但仍然写空文件（保持文件存在）
  if [[ ! -s "$tmp_sorted" ]]; then
    log "警告：$out_file 没有从任何源获取到数据（将写入空文件）"
    : > "$tmp_final"
  else
    if [[ "$do_shuffle" -eq 1 ]]; then
      shuf "$tmp_sorted" > "$tmp_final"
    else
      cat "$tmp_sorted" > "$tmp_final"
    fi
  fi

  # 原子覆盖
  mv -f "$tmp_final" "$out_file"

  rm -f "$tmp_all" "$tmp_sorted"
}

update_proxy_list() {
  log "开始更新全球代理..."
  merge_sources URLS_GLOBAL "proxy.txt" 1
  cp -f proxy.txt proxy1.txt
  log "全球代理完成 -> proxy.txt / proxy1.txt"

  log "开始更新国内代理..."
  merge_sources URLS_CN "cn.txt" 0
  log "国内代理完成 -> cn.txt"
}

# ===== 主循环 =====
update_proxy_list
while true; do
  sleep 300
  update_proxy_list
done
