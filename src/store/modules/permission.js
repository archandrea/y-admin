import router, { resetRouter, constantRoutes } from '@/router'
import { formatRoutes, filterPermissionRoutes } from '@/utils/formatter.js'
import settings from '@/setting.js'
import asyncRoutes from '@/router/asyncRoutes.js'
const { permissionRequired } = settings

export default {
  namespaced: true,
  state: () => ({
    permissionRequired,
    permissionTags: [],
    routes: [],
    additionRoutes: [],
  }),
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.additionRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_PERMISSION(state, tag) {
      if (!state.permissionTags.includes(tag)) {
        state.permissionTags.push(tag)
      }
    },
    RESET_PERMISSION(state) {
      state.permissionTags = []
    }
  },
  actions: {
    generateRoutes({ commit, dispatch }, routes) {
      commit('SET_ROUTES', routes)
    },
    setPermission({ commit, dispatch }, tags = []) {
      commit('RESET_PERMISSION')
      tags.forEach(tag => commit('SET_PERMISSION', tag))
      // 如果由服务端返回权限，则修改此处
      dispatch('setRoutes', formatRoutes(asyncRoutes))
      dispatch('tagBar/delAllViews', null, { root: true })
    },
    // 鉴权成功后调用
    setRoutes({ state, commit, dispatch }, asyncRoutes) {
      resetRouter()
      if (permissionRequired) {
        asyncRoutes = filterPermissionRoutes(asyncRoutes, state.permissionTags)
      }
      dispatch('generateRoutes', asyncRoutes)
      asyncRoutes.forEach(route => {
        router.addRoute(route)
      });
    },
  },
}