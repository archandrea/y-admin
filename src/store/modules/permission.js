import { constantRoutes } from '@/router'
import { formatRoutes } from '@/utils/formatter.js'

export default {
  namespaced: true,
  state: () => ({
    routes: [],
    additionRoutes: [],
    routesLoaded: false,
  }),
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.additionRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    LOADED_DONE: (state) => {
      state.routesLoaded = true
    },
  },
  actions: {
    generateRoutes({ commit, dispatch }, routes) {
      const additionRoutes = formatRoutes(routes)
      commit('SET_ROUTES', additionRoutes)
    },
  },
}