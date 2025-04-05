#!/bin/bash

# 检查参数
if [[ $# -ne 2 ]]; then
    echo "用法: $0 <主控IP> <ES密码>"
    exit 1
fi

new_master_ip="$1"
es_pwd="$2"

echo "[*] 设置主控IP为: $new_master_ip"
echo "[*] 设置ES密码为: $es_pwd"

# 替换 config.py 中的 ES_IP 和 MASTER_IP
sed -i "s/^ES_IP *=.*/ES_IP = \"$new_master_ip\"/" /opt/cdnfly/agent/conf/config.py
sed -i "s/^MASTER_IP.*/MASTER_IP = \"$new_master_ip\"/" /opt/cdnfly/agent/conf/config.py

# 替换 config.py 中的 ES_PWD
sed -i "s/^ES_PWD *=.*/ES_PWD = \"$es_pwd\"/" /opt/cdnfly/agent/conf/config.py

# 替换 filebeat.yml 中的 hosts
sed -i "s/hosts:.*/hosts: [\"$new_master_ip:9200\"]/" /opt/cdnfly/agent/conf/filebeat.yml

# 替换 nginx 的主控上报地址
sed -i "s#http://.*:88#http://$new_master_ip:88#g" \
    /usr/local/openresty/nginx/conf/listen_80.conf \
    /usr/local/openresty/nginx/conf/listen_other.conf

echo "[*] 修改完成正在重启相关组件。"

# 热重载 nginx
ps aux | grep [/]usr/local/openresty/nginx/sbin/nginx | awk '{print $2}' | xargs kill -HUP || true

# 重启相关服务
supervisorctl -c /opt/cdnfly/agent/conf/supervisord.conf restart filebeat
supervisorctl -c /opt/cdnfly/agent/conf/supervisord.conf restart agent
supervisorctl -c /opt/cdnfly/agent/conf/supervisord.conf restart task

echo "[✔] Done!"
