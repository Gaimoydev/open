#!/bin/bash

urls=(
    "https://greatcoinbtc.com/"
    "https://getyoursback.org/"
    "https://xo-coins.com/"
    "https://chargebackmoney.biz/"
    "https://trustcorps.net/"
    "https://scam-tracker.net/"
    "https://refundf.com"
    "https://www.riobe.online/"
    "https://fraudrecoveryexperts.com/"
    "https://cryptorescueteam.us/"
    "https://ifwglobal.com/"
    "https://thekronlawfirm.com/"
    "https://www.barrister-lawyer.com/"
    "https://stoltmannlaw.com/"
    "https://secure.tandhconsult.com/"
    "https://www.cyberexaminer.org/"
    "https://keayalwa.com/"
)

log_dir="logs"
mkdir -p "$log_dir"

while true; do
    for url in "${urls[@]}"; do
        log_file="${log_dir}/${url//[^a-zA-Z0-9]/_}.log"
        echo "[$(date +'%Y-%m-%d %H:%M:%S')] 启动任务: node bcf.js $url 120 20 32 proxy1.txt" | tee -a "$log_file"
        node cf.js "$url" 120 20 32 proxy1.txt >> "$log_file" 2>&1
        echo "[$(date +'%Y-%m-%d %H:%M:%S')] 任务完成，立即开始下一个..." | tee -a "$log_file"
    done
done
