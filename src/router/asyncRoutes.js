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

export default [
  
]