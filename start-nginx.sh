#!/bin/sh
# 设置默认端口为 8080（如果 PORT 环境变量未设置）
export PORT=${PORT:-8080}
# 替换 nginx 配置文件中的 PORT 占位符
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
# 启动 nginx
exec nginx -g 'daemon off;'

