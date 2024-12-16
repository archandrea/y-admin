import Vue from 'vue'
import App from './index.vue'
import '@/plugins/element'
import '@/http/axios.js'
import '@/assets/style/common/index.scss'

// icons
import SvgIcon from '@/components/SvgIcon'
Vue.component('SvgIcon', SvgIcon)
const iconModules = require.context('@/assets/icons', false, /\.svg$/)
iconModules.keys().map(iconModules)


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')