import path from 'path-browserify'

/**
 * @description 将路由配置对象转换为实际的路由对象，处理组件的懒加载
 * @param {Array|Object} routes - 路由配置对象或数组
 * @returns {Array|Object|boolean} 处理后的路由配置
 * @example
 * const routes = [{
 *   path: '/dashboard',
 *   component: 'views/dashboard/index',
 *   children: [...]
 * }]
 * const formattedRoutes = formatRoutes(routes)
 */
export function formatRoutes(routes) {
  if (!routes) {
    return false
  }
  // 处理路由数组
  if (Array.isArray(routes) && routes.length !== 0) {
    return routes.map(route => formatRoutes(route))
  } else if (typeof routes === 'object') {
    // 处理内部链接类型的路由
    if (routes?.meta?.target === 'inner') {
      routes.component = 'views/built-in/inner-link'
      routes.meta.link = routes.path // 保存原始路径
      routes.path = '/' + routes.name // 重写路由路径
    }
    
    // 将组件字符串路径转换为实际的组件
    if (typeof routes.component === 'string') {
      let compStr = routes.component
      // 处理特殊的router-view组件
      if (compStr === 'router-view') {
        compStr = 'views/built-in/view'
      }
      routes.component = loadComponent(compStr)
    }
    
    // 递归处理子路由
    if (routes.children && routes.children?.length !== 0) {
      routes.children = formatRoutes(routes.children)
    }
    return routes
  } else {
    return routes
  }
}

/**
 * @description 根据用户权限过滤路由配置
 * @param {Array|Object} routes - 需要过滤的路由配置
 * @param {Array<string>} permissions - 用户拥有的权限标识数组
 * @returns {Array|Object|boolean} 过滤后的路由配置
 * @example
 * const filteredRoutes = filterPermissionRoutes(routes, ['admin', 'editor'])
 */
export function filterPermissionRoutes(routes, permissions) {
  if (!routes) {
    return false
  }
  if (Array.isArray(routes) && routes.length !== 0) {
    // 过滤需要权限验证的路由
    routes = routes.filter(route => 
      Object.prototype.hasOwnProperty.call(route, 'permissionTag') 
        ? permissions.includes(route.permissionTag) 
        : true
    )

    // 递归处理子路由的权限
    return routes.map(route => {
      if (route.children && route.children?.length !== 0) {
        route.children = filterPermissionRoutes(route.children, permissions)
      }
      return route
    })
  } else {
    return routes
  }
}

/**
 * @description 路由组件懒加载函数
 * @param {string} path - 组件路径
 * @returns {Function} 组件加载函数
 * @example
 * const component = loadComponent('views/dashboard/index')
 */
export const loadComponent = (path) => {
  // 开发环境使用require直接加载，生产环境使用import懒加载
  if (process.env.NODE_ENV === 'development') {
    return require(`@/${path}`).default
  }
  return () => import(`@/${path}`)
}