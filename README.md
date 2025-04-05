curl -fsSL https://github.com/Gaimoydev/open/raw/main/master.sh -o master.sh && chmod +x master.sh && ./master.sh --es-dir /home/es

curl -fsSL https://github.com/Gaimoydev/open/raw/main/move.sh -o move.sh && chmod +x move.sh && ./move.sh ip pwd

cdnfly页面404解决+登录美化: curl -fsSL https://github.com/Gaimoydev/open/raw/main/fixed.sh -o fixed.sh && chmod +x fixed.sh && ./fixed.sh


支付跳转页面(防404): http://域名/src/views/account/balance/return.html

<p>重启进程<br />
<p>主控重启<br />

```bash
supervisorctl -c /opt/cdnfly/master/conf/supervisord.conf restart all
```

<p>节点重启<br />

```bash
supervisorctl -c /opt/cdnfly/agent/conf/supervisord.conf restart all
```
## 如何初始化elasticsearch

```bash
cd /tmp;
wget http://us.centos.bz/cdnfly/int_es.sh -O int_es.sh;
chmod +x int_es.sh;
./int_es.sh /home/es;
```
## 备份数据库

```bash
cd /root;
curl http://us.centos.bz/cdnfly/backup_master.sh -o backup_master.sh;
chmod +x backup_master.sh;
./backup_master.sh;
```
这时候将在目录/root下，打包生成cdn.sql.gz文件，请把这个文件传输到新主控的/root/目录下，可以使用scp命令，命令如下：

```bash
cd /root
scp cdn.sql.gz   root@新主控IP:/root/
```

## 恢复数据库

```bash
cd /root;
curl http://us.centos.bz/cdnfly/restore_master.sh -o restore_master.sh;
chmod +x restore_master.sh;
./restore_master.sh;
```
