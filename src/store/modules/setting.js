import { themeColor, namespace } from '@/assets/style/variables.module.scss'
import settings from '@/setting.js'
const { showSettings, showTagBar, showAsideBar } = settings

export default {
  namespaced: true,
  state: () => ({
    themeColor,
    showSettings,
    showTagBar,
    showAsideBar,
    namespace,
  }),
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = value
      }
    }
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  },
}