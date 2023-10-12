export default {
  userInfo: state => state.user.userInfo,

  permissionRoutes: state => state.permission.routes,
  routesLoaded: state => state.permission.routesLoaded,

  visitedViews: state => state.tagBar.visitedViews,
  cachedViews: state => state.tagBar.cachedViews,

}