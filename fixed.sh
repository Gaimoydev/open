#!/bin/bash

set -e

echo "[*] 正在修复页面404"

echo "[*] 正在修复 balance..."
rm -f /opt/cdnfly/master/panel/src/views/account/balance
cp -r /opt/cdnfly/master/panel/src/views/finance/balance /opt/cdnfly/master/panel/src/views/account/

echo "[*] 正在修复 log..."
rm -rf /opt/cdnfly/master/panel/src/views/account/log
cp -r /opt/cdnfly/master/panel/src/views/system/log /opt/cdnfly/master/panel/src/views/account/

echo "[*] 正在修复 order..."
rm -rf /opt/cdnfly/master/panel/src/views/account/order
cp -r /opt/cdnfly/master/panel/src/views/finance/order /opt/cdnfly/master/panel/src/views/account/

echo "[*] 正在美化登录页面"

echo "[*] 正在替换 login.html..."
curl -fsSL https://raw.githubusercontent.com/Gaimoydev/open/refs/heads/main/login.html -o /opt/cdnfly/master/panel/src/views/user/login.html

echo "[*] 正在替换 reg.html..."
curl -fsSL https://raw.githubusercontent.com/Gaimoydev/open/refs/heads/main/reg.html -o /opt/cdnfly/master/panel/src/views/user/reg.html

echo "[*] 正在替换 forget.html..."
curl -fsSL https://raw.githubusercontent.com/Gaimoydev/open/refs/heads/main/forget.html -o /opt/cdnfly/master/panel/src/views/user/forget.html

echo "[✔] 全部操作完成"
