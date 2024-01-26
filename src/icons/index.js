import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('SvgIcon', SvgIcon)

const modules = require.context('@/assets/icons', false, /\.svg$/)
modules.keys().forEach(modules)