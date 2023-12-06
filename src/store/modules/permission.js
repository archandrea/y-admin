import { constantRoutes } from '@/router'

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
      commit('SET_ROUTES', routes)
    },
  },
}