import Vue from 'vue'
import Element from 'element-ui'
import '@/assets/style/element-variables.scss'

Vue.use(Element)

Vue.prototype.$message = Element.Message
Vue.prototype.$msgbox = Element.MessageBox