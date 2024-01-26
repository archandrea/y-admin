import store from '@/store'
import router from './index.js'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [] // no redirect whitelist

// 设置权限/角色
await store.dispatch('permission/setPermission', ['permission-test-user', 'permission-test-admin'])
// 挂载权限菜单


// 获取菜单的第一个有name不hidden的页面
// let asyncRoutes = store.getters.permissionRoutes.slice(constantRoutes.length)
// let firstMenu

// for (let i = 0; i < asyncRoutes.length; i++) {
//   let route = asyncRoutes[i]
//   if (!route.hidden) {
//     if (route.name) {
//       firstMenu = route
//       break
//     } else if (route.children && route.children.length > 0) {
//       for (let j = 0; j < route.children.length; j++) {
//         let childRoute = route.children[j]
//         if (!childRoute.hidden && childRoute.name) {
//           firstMenu = childRoute
//           break
//         }
//       }
//       if (firstMenu) {
//         break
//       }
//     }
//   }
// }

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  console.log('route-start', to, from)

  // 在'#/'根路由没有首页的情况，导航到菜单的第一个路由
  // if (to.path === '/' && firstMenu) {
  //   router.push(firstMenu)
  // }

  next()
})

router.afterEach(() => {
  NProgress.done()
  // console.log('route-done')
})