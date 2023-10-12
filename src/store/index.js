import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'

Vue.use(Vuex)

const req = require.context('./modules', true, /^.*\.js$/)

const modules = req.keys().reduce((modules, path) => {
  const moduleName = path.match(/(?<=\/)[\w-]*?(?=\.js)/)[0]
  modules[moduleName] = req(path).default
  return modules
}, {})

export default new Vuex.Store({
  getters,
  modules,
})
