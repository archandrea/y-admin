import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('SvgIcon', SvgIcon)

const modules = require.context('./svg', false, /\.svg$/)
modules.keys().map(modules)