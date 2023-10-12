import path from 'path-browserify'

/**
 * @description: 将路由对象/数组中的component（如果为路径string）替换为懒加载component对象
 * @param {*} routes
 * @return {*} routes
 * @author: xz
 */
export function formatRoutes(routes) {
  if (!routes) {
    return false
  }
  if (Array.isArray(routes) && routes.length !== 0) {
    return routes.map(route => formatRoutes(route))
  } else if (typeof routes === 'object' && Object.prototype.hasOwnProperty.call(routes, 'component')) {
    if (typeof routes.component === 'string') {
      routes.component = loadComponent(routes.component)
    }
    if (routes.children && routes.children?.length !== 0) {
      routes.children = formatRoutes(routes.children)
    }
    return routes
  } else {
    return routes
  }
}

// 路由懒加载
export const loadComponent = (path) => {
  return () => import(`@/${path}`)
}

export function formatDate(date) {
  if (!date) {
    return false
  }
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month}-${day}`
}

export function formatUrl(url) {
  if (url) {
    return path.join(process.env.VUE_APP_BASE_API, url)
  } else {
    return ''
  }
}