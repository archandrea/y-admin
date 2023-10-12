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
    handleSizeChange(size) {
      this.formData.pageSize = size
      this.fetchData()
    },
    handlePageChange(page) {
      this.formData.pageNumber = page
      this.fetchData()
    },
  },
}