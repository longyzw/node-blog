# node 博客

### 安装依赖
`npm install`

### 启动项目
`npm run dev`

### 项目打包
`npm run pro`

## 项目结构说明
```
blog-node/
|--|
|--bin/
|----www.js -> 创建服务和端口监听
|--|
|--src/
|----|
|----config/ （mysql连接配置）
|------db.js -> mysql连接配置文件
|----|
|----controller/ （处理逻辑判断和数据查询）
|------blog.js -> 文章模块的数据查询和判断
|------user.js -> 用户模块的数据查询和判断
|----|
|----model/ （处理返回格式）
|------resModel.js -> 返回格式处理
|----|
|----router/ （精确路由匹配）
|------blog.js -> 文章模块路由匹配
|------user.js -> 用户模块路由匹配
|--|
|--app.js -> 处理返回格式、接受参数和路由匹配
|--|
```