import { debounce } from '@/utils'

const documentWidth = document.documentElement.clientWidth

// echarts专用mixin
export default {
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    data() {
      this.chart.setOption(this.option, true)
    },
  },
  created() {
    this.$nextTick(() => {
      this.getChart()
    })
  },
  beforeDestroy() {
    this.destroyChart()
  },
  methods: {
    getChart() {
      if (this.chart) this.chart.dispose()
      let chart = this.$echarts.init(this.$refs['chart-container'])
      this.chart = chart
      chart.setOption(this.option, true)

      this.resizeHandler = debounce(() => this.chartResize(), 500)
      window.addEventListener('resize', this.resizeHandler)
    },
    destroyChart() {
      this.chart.dispose()
      this.chart = null

      window.removeEventListener('resize', this.resizeHandler)
    },
    chartResize() {
      if (this.chart) this.chart.resize()
    },
    nowSize(val, initWidth = 1920) {
      return val * (documentWidth / initWidth);
    },
  },
}
