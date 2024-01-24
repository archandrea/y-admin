export default {
  data() {
    return {
    }
  },
  computed: {
  },
  filters: {
  },
  methods: {
    // 调整页容量
    handleSizeChange(size) {
      this.formData.pageSize = size
      this.fetchData()
    },
    // 翻页
    handlePageChange(page) {
      this.formData.pageIndex = page
      this.fetchData()
    },
    // 防止查询后当前页超出总页数
    handleExceed(cur, total) {
      if (cur === 1 && total === 0) {
        return false
      }
      if (total < cur || total === 0) {
        this.formData.pageIndex = 1
        this.fetchData()
      }
    },
    // 重置滚动条
    resetScroll(el, selector) {
      if (selector && el.querySelector(selector)) {
        el = el.querySelector(selector)
      }
      el.scrollTop = 0
      el.scrollLeft = 0
    },
  },
}