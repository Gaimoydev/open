#!/bin/bash
set -euo pipefail

# ===== 源配置 =====
# 全球
URLS_GLOBAL=(
  "https://proxyapi.sswc.cfd/api.php?key=ay4t9b1w0s"
  "https://proxy.scdn.io/text.php"
  "https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/protocols/http/data.txt"
  "https://raw.githubusercontent.com/ClearProxy/checked-proxy-list/refs/heads/main/http/raw/all.txt"
)

# 中国
URLS_CN=(
  "https://proxyapi.sswc.cfd/api.php?key=ay4t9b1w0s&geo=cn"
)

PROXY_TEST_THREADS=5000

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') - $*"; }

normalize_list() {
  sed -E '
    s#^[[:space:]]*(https?|socks5?|socks4)://##I
    s/[[:space:]]+$//
  ' \
  | tr ' \t,' '\n' \
  | grep -v '^[[:space:]]*$' \
  | grep -E '^[^[:space:]]+:[0-9]{2,5}$' || true
}

test_proxy() {
  local proxy="$1"
  local host port

  host="${proxy%:*}"
  port="${proxy##*:}"

  if timeout 5 bash -c ">/dev/tcp/$host/$port" 2>/dev/null; then
    echo "$proxy"
  fi
}
export -f test_proxy


filter_alive_proxies() {
  local in_file="$1"
  local out_file="$2"

  log "开始测试代理存活（并发 $PROXY_TEST_THREADS）..."

  filter_bad_ip_ranges < "$in_file" \
    | xargs -n 1 -P "$PROXY_TEST_THREADS" -I {} \
        bash -c 'test_proxy "$@"' _ {} \
    | sort -u \
    | shuf > "$out_file"

  log "存活代理数量：$(wc -l < "$out_file")"
}


fetch_and_append() {
  local url="$1"
  local out_tmp="$2"
  local tmp
  tmp="$(mktemp)"

  if curl -sS --connect-timeout 5 --max-time 10 --retry 2 --retry-delay 1 "$url" -o "$tmp"; then
    normalize_list <"$tmp" >>"$out_tmp" || true
    log "获取成功：$url"
  else
    log "获取失败：$url"
  fi
  rm -f "$tmp"
}

is_bad_ip() {
  local ip="$1"

  case "$ip" in
    0.*|10.*|127.*|169.254.*|172.1[6-9].*|172.2[0-9].*|172.3[0-1].*|192.168.*)
      return 0 ;;
    100.6[4-9].*|100.[7-9][0-9].*|100.1[0-1][0-9].*|100.12[0-7].*)
      return 0 ;;
    198.18.*|198.19.*)
      return 0 ;;
    224.*|23[0-9].*|24[0-9].*|25[0-5].*)
      return 0 ;;
  esac

  return 1
}

filter_bad_ip_ranges() {
  while read -r line; do
    ip="${line%:*}"
    if ! is_bad_ip "$ip"; then
      echo "$line"
    fi
  done
}

merge_sources() {
  local -n urls_ref=$1
  local out_file="$2"
  local do_shuffle="${3:-0}"
  local tmp_all tmp_sorted tmp_final

  tmp_all="$(mktemp)"
  tmp_sorted="$(mktemp)"
  tmp_final="$(mktemp)"

  for u in "${urls_ref[@]}"; do
    fetch_and_append "$u" "$tmp_all"
  done

  local count_before count_after

  count_before=$(wc -l < "$tmp_all" || echo 0)

  sort -u "$tmp_all" > "$tmp_sorted"

  count_after=$(wc -l < "$tmp_sorted" || echo 0)

  log "$out_file 去重前数量: $count_before, 去重后数量: $count_after"


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

  mv -f "$tmp_final" "$out_file"

  rm -f "$tmp_all" "$tmp_sorted"
}

update_proxy_list() {

  log "开始更新全球代理..."
  merge_sources URLS_GLOBAL "proxy_raw.txt" 1
  filter_alive_proxies "proxy_raw.txt" "proxy.txt"
  cp -f proxy.txt proxy1.txt
  rm -f proxy_raw.txt
  log "全球代理完成 -> proxy.txt / proxy1.txt"

  log "开始更新国内代理..."
  merge_sources URLS_CN "cn_raw.txt" 0
  filter_alive_proxies "cn_raw.txt" "cn.txt"
  rm -f cn_raw.txt
  log "国内代理完成 -> cn.txt"

}

# ===== 主循环 =====
update_proxy_list
while true; do
  sleep 300
  update_proxy_list
done
