// css module 引入js文件的暂时解决方法，各种vue-cli的配置都不行
// 在devServer时，require()即是，在production打包时，require().default才是
const styleModule = require('@/assets/style/common/variables.module.scss')
const { themeColor, namespace } = styleModule.default || styleModule
import settings from '@/setting.js'
const { showSettings, showTagBar, showAsideBar, showTopBar } = settings

export default {
  namespaced: true,
  state: () => ({
    themeColor,
    showSettings,
    showTagBar,
    showAsideBar,
    showTopBar,
    namespace,
  }),
  mutations: {
    CHANGE_SETTING: (state, setting) => {
      for (let key in setting) {
        if (Object.prototype.hasOwnProperty.call(state, key)) {
          state[key] = setting[key]
        }
      }
    }
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    },
    resetSetting({ commit }, exclude = []) {
      const defaultSetting = {
        themeColor,
        showSettings,
        showTagBar,
        showAsideBar,
        showTopBar,
        namespace,
      }
      exclude?.length > 0 && exclude.forEach(key => delete defaultSetting[key])
      commit('CHANGE_SETTING', defaultSetting)
    }
  },
}