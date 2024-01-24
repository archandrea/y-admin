import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/echarts.js'
import './http/axios'
import './icons'
import './assets/style/index.scss'

import './router/permission.js'

import BaseCard from './components/Card'
import scrollHorizontal from './directives/scroll-horizontal.js'

Vue.component('BaseCard', BaseCard)
Vue.directive('scroll-horizontal', scrollHorizontal)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')