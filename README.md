# y-admin

一个借鉴vue-element-admin开发的后台管理系统前端框架



### 主要依赖

- vue@2.7.16
- vue/cli@5.0.8
- element-ui:@2.15.13
- sass@1.32.7
- axios@1.4.0



### 起步

```bash
# npm

# 启动
npm run serve
#打包portal
npm run build
#打包login
npm run build:login
#快速构建页面
npm run new


# pnpm(推荐)

# 启动
npm run serve
#打包portal
npm run build
#打包login
npm run build:login
#快速构建页面
npm run new
```



### 初始配置

1. .env文件
2. setting.js文件
3. package.json文件name 
4. assets/style/common/variables.module.scss系列样式前缀



### 请求封装

##### 1. 直接调$axios

```js
this.$axios(...)
```



##### 2. 使用封装接口

```js
const [err, res] = await api(params)
// 或者
api(params).then(([err, res])=>{})
```



### Route配置

TODO: 添加示例

```js
/* 
此模板用于后端返回权限菜单的情况，如果菜单鉴权在前端则component可以直接为组件

路由配置规则：

一级路由
  path: 路径
  name: 不需要
  hidden: Boolean，不显示在菜单栏
  component: 统一为layout或router-view（前者为框架，后者仅作为嵌套时的过渡）
  redirect: 自动跳转路由
  alwaysShow: 为true时，在只有一个显示子菜单的情况下，该子菜单不会提示至父级
  meta.title: 菜单栏和标签页的标题，${}语法可以获取route.params里的属性作为标题变量
  meta.icon: 菜单栏的图标（kebab-case命名，可以是element的icon，也可以是svg-icon）
  meta.affix: 固定存在于标签栏，不可删除
  meta.tagIcon: 此值存在时，该菜单标签显示为该值对应的图标

二级路由
  path: 相对一级路由的路径
  name: 必须有（PascalCase命名）
  hidden: Boolean，不显示在菜单栏
  component: 统一为'views/'下扁平管理（kebab-case命名）
  meta.title: 菜单栏和标签页的标题，${}语法可以获取route.params里的属性作为标题变量
  meta.icon: 不需要
  meta.target: 当为跳转外部链接时，不需要name，target取值可以是blank、self；
               当为内嵌iframe打开时，需要name，target取值inner
  meta.noCache: 不缓存
  meta.cacheAs: 缓存组件名（用于临时tab页面缓存）
*/
```



### 标签页操作



#### 方法


##### openTab
**description**: 打开一个临时标签页

**params**: Object<Route>

**return**: void



##### closeTab
**description**: 关闭当前标签页，导航至最后一个标签页

**params**: void

**return**: void



##### refreshTab

**description**: 刷新当前标签页，在openTab后调用可以达到打开并刷新标签页的效果

**params**: void

**return**: void



#### 调用方式

##### 1. app内调用eventBus

```js
// openTab
this.$root.$emit('openTab', params)

// closeTab
this.$root.$emit('closeTab')

// refreshTab
this.$root.$emit('refreshTab')
```



##### 2. 嵌入页面（iframe）使用

```js
// openTab
top.postMessage(
  {
    type: 'eventBus',
    handler: 'openTab',
    payload: params,
  }
)

// openTab example:
top.postMessage(
  {
    type: 'eventBus',
    handler: 'openTab',
    payload: {
      path: '/path/to/your/file.html',
      name: 'YourPage',
      meta: { title: '页面标题', target: 'inner' },
      query: { ... },
    }
  }
)
// 注意：
// meta.target
// 当为内嵌iframe打开时，需要name，meta.target取值inner
// 当为跳转外部链接时，不需要name，meta.target取值可以是blank、self
// query
// 会透传至内嵌iframe的src


// closeTab
top.postMessage({
  type: 'eventBus',
  handler: 'closeTab',
})

// refreshTab
top.postMessage({
  type: 'eventBus',
  handler: 'refreshTab',
})
```