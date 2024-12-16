import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace

Router.prototype.push = function push(location, resolve, reject) {
  return originalPush.call(this, location).catch((e) => { console.log(e) })
}
Router.prototype.replace = function replace(location, resolve, reject) {
  return originalReplace.call(this, location).catch((e) => { console.log(e) })
}


export const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    hidden: true,
    component: () => import('@/layout'),
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/login')
  },
  {
    path: '/redirect',
    component: () => import('@/layout'),
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/built-in/redirect')
      }
    ]
  },
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/built-in/not-found'),
    meta: { title: 'not-found' }
  },
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router