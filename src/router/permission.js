import store from '@/store'
import router from './index.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [] // no redirect whitelist

await store.dispatch('user/setPermission')

// 获取菜单的第一个页面
// let firstRoute
// let firstMenu = store.getters.permissionRoutes[constantRoutes.length]
// if (firstMenu) {
//   firstRoute = firstMenu?.children ? firstMenu?.children[0] : firstMenu
// }

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  console.log('route-start', to, from)

  // 在'#/'根路由没有首页的情况，导航到菜单的第一个路由
  // if (to.path === '/' && firstRoute) {
  //   router.push(firstRoute)
  // }

  next()
})

router.afterEach(() => {
  NProgress.done()
  // console.log('route-done')
})