import Vue from 'vue'
import * as echarts from 'echarts'

Object.defineProperties(Vue.prototype, {
  $echarts: {
    get() {
      return echarts;
    }
  },
});

export default echarts