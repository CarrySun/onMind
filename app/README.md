## onMind

### 服务构建

``` bash
# 依赖安装
npm install

# 服务启动
npm run dev

# 打包文件
npm run build

# 文档构建
npm run build --report

# 请求路径
http://127.0.0.1:8080/pages/homePage.html

```

### 容器化

```bash
cd deepnet-web
# 服务构建
docker build -t deepnet-web .
# 运行服务
docker run --name deepnet-web-service -d -p8000:8000 deepnet-web
# 查看服务
docker ps
# 请求路径
http://127.0.0.1:8000/depth/pages/homePage.html
```


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
