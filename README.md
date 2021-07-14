# vue-ts-demo

从零构建vue2 项目，实现基本的登录退出功能, 和后台数据的增删改查

主要技术栈使用: vue2 vuex vue-router element  typescript scss

其他技术使用: axios echarts moment seniverse(和风天气) 阿里图标

查看 [后台项目](https://github.com/5neverstop/node-koa)



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```



### upload 

scp -r ./dist.rar root@vue.beiyunjiang.top:/mnt/code/vue-new.rar

ssh root@vue.beiyunjiang.top

cd /mnt/code
tar -czf updateLog/vue-$(date +%Y%m%d%H%M%S).tar.gz vue
rm -rf vue
mv vue-new ./vue/
rm -rf  vue-new*

## rar
rar x vue-new.rar ./vue-new/
