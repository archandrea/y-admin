import { constantRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    routes: [],
    additionRoutes: [],
  }),
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.additionRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
  },
  actions: {
    generateRoutes({ commit, dispatch }, routes) {
      commit('SET_ROUTES', routes)
    },
  },
}