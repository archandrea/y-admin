import Vue from 'vue'
const path = require('path')

// http
import './http/axios'

// style
import './assets/style/index.scss'

// permission
import './router/permission.js'

// plugins
import './plugins/element.js'
import './plugins/echarts.js'

// icons
import SvgIcon from './components/SvgIcon'
Vue.component('SvgIcon', SvgIcon)

const iconModules = require.context('./assets/icons', false, /\.svg$/)
iconModules.keys().map(iconModules)

// components
import BaseCard from './components/Card'
import EmptyWrapper from './components/EmptyWrapper'

Vue.component('BaseCard', BaseCard)
Vue.component('EmptyWrapper', EmptyWrapper)

// directives
const directiveModules = require.context('./directives', false, /\.js$/)
const directives = directiveModules.keys().map((key)=>{
  const module = directiveModules(key)
  module.name = path.basename(key, '.js')
  return module
})
directives.forEach(directive => Vue.directive(directive.name, directive.default))

// filters
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})