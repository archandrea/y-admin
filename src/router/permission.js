import store from '@/store'
import router from './index.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [] // no redirect whitelist

let flag = false

router.beforeEach(async (to, from, next) => {
  // console.log('route-to', to)
  // console.log('route-from', from)
  NProgress.start()

  // 鉴权流程
  if (!flag) {
    await store.dispatch('user/setPermission')
    flag = true
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
  // console.log('route-done')
})