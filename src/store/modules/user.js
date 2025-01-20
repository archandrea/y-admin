import { login, logout, getUserInfo } from '@/api/auth'
import { resetRouter } from '@/router'

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
  },
}