# y-admin

一个借鉴vue-element-admin开发的后台管理系统前端框架



### 主要依赖

- vue@2.6.14
- vue/cli@5.0.8
- element-ui:@2.15.13
- sass@1.26.2
- axios@1.4.0



### 起步

```bash
#dev-server启动
vue serve

#打包
vue build

#快速构建页面/组件/模块
npm run new

```


### 初始配置

1. .env文件
2. setting.js文件
3. package.json文件name 
4. assets/style/variables.module.scss系列样式前缀


### 请求封装

1. 直接调$axios

```js
this.$axios(...)
```



2. 使用封装接口

```js
const [err,res] = await api(params)
// 或者
api(params).then(([err,res])=>{})
```

TODO：
- [ ] tagBar iframe缓存