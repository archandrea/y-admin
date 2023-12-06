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
    redirect: '/dashboard',
    component: () => import('@/layout'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard'),
        meta: { title: '首页', icon: 'home-line', tagIcon: 'home-fill', affix: true }
      },
    ]
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
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/not-found'),
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

Router.prototype.openTemporaryPage = (parent, option) => {
  let { path, name, hidden, meta, component, query, casheAs } = option

  if (parent) {
    router.addRoute(parent, {
      path,
      name,
      hidden,
      meta,
      casheAs,
      component,
    })
  } else {
    router.addRoute({
      path,
      name,
      hidden,
      meta,
      casheAs,
      component,
    })
  }

  router.push({ name, query })
}

export default router