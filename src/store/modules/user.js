import { login, logout, getUserInfo } from '@/api/auth'
import router, { resetRouter } from '@/router'
import { formatRoutes } from '@/utils/formatter.js'
import asyncRoutes from '@/router/asyncRoutes.js'

export default {
  namespaced: true,
  state: () => ({
    userInfo: null,
  }),
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      const [err, res] = await login(payload)
      if (err) {
        throw new Error(err)
      }
      // ...
    },
    async logout({ commit, dispatch }) {
      dispatch('cancelLoginInfo')
      dispatch('tagBar/delAllViews', null, { root: true })
      await logout()
    },
    cancelLoginInfo({ commit, dispatch }) {
      commit('SET_USERINFO', null)
      // ...
      resetRouter()
    },
    async getUserInfo({ commit, dispatch, rootGetters }) {
      const [err, res] = await getUserInfo()
      if (res) {
        commit('SET_USERINFO', res)
      }
      return [err, res]
    },
    // 鉴权成功后调用
    async setPermission({ dispatch, state }) {
      resetRouter()
      const additionRoutes = asyncRoutes
      additionRoutes = formatRoutes(additionRoutes)
      dispatch('permission/generateRoutes', additionRoutes, { root: true })
      router.addRoutes(additionRoutes)
      // additionRoutes.forEach(route => {
      //   router.addRoute(route)
      // });
    },
  },
}