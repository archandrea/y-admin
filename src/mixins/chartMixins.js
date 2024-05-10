import { debounce } from '@/utils'

const documentWidth = document.documentElement.clientWidth

// echarts专用mixin
export default {
  data() {
    return {
      chart: null,
      documentWidth,
    }
  },
  watch: {
    data() {
      if (this.chart) {
        this.chart.setOption(this.option, true)
      }
    },
  },
  created() {
    this.resizeHandler = debounce(() => this.chartResize(), 500)
    window.addEventListener('resize', this.resizeHandler)
    this.$nextTick(() => {
      this.getChart()
    })
  },
  updated() {
    this.$nextTick(() => {
      if (!this.data || this.data?.length === 0) {
        this.destroyChart()
      } else if (!this.chart) {
        this.getChart()
      }
    })
  },
  beforeDestroy() {
    this.destroyChart()
  },
  methods: {
    getChart() {
      if (!this.$refs['chart-container']) {
        return false
      }
      if (this.chart) this.chart.dispose()
      let chart = this.$echarts.init(this.$refs['chart-container'])
      this.chart = chart
      chart.setOption(this.option, true)
      this.$nextTick(this.resizeHandler)
    },
    destroyChart() {
      this.$nextTick(() => {
        if (this.chart) {
          this.chart.dispose()
          this.chart = null
        }

        window.removeEventListener('resize', this.resizeHandler)
      })
    },
    chartResize() {
      this.documentWidth = document.documentElement.clientWidth
      if (this.chart) {
        this.chart.resize()
      }
    },
    nowSize(val, initWidth = 1920) {
      let documentWidth = this.documentWidth || 1920
      return val * (documentWidth / initWidth);
    },
  },
}
