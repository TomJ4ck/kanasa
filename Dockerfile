# 构建阶段
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制项目文件
COPY . .

# 构建应用
RUN npm run build

# 运行阶段 - 使用 nginx 服务静态文件
FROM nginx:alpine

# 安装 envsubst（用于替换环境变量）
RUN apk add --no-cache gettext

# 复制构建产物到 nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置模板（使用 PORT 占位符）
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# 复制启动脚本
COPY start-nginx.sh /start-nginx.sh
RUN chmod +x /start-nginx.sh

# 暴露端口（Cloud Run 会通过环境变量 PORT 动态分配）
EXPOSE 8080

# 使用启动脚本启动 nginx
CMD ["/start-nginx.sh"]

