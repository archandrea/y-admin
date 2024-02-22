<template>
  <div class="base-pagination">
    <el-pagination
      :current-page.sync="cur"
      :page-size.sync="size"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-bind="attrs">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      required: true,
      type: Number,
    },
    pageSize: {
      required: true,
      type: Number,
    },
    total: {
      required: true,
      type: Number,
    },
  },
  computed: {
    attrs() {
      return {
        // 默认
        pageSizes: [15, 30, 50, 100],
        layout: 'total, prev, pager, next, jumper, sizes',
        background: true,
        ...this.$attrs,
      }
    },
    // current-page
    cur: {
      get() {
        return this.currentPage
      },
      set(val) {
        this.$emit('update:currentPage', val)
      },
    },
    // page-size
    size: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:pageSize', val)
      },
    },
  },
  watch: {
    total(total) {
      // 防止查询后当前页超出总页数
      let totalPage = Math.ceil(total / this.size)
      if (this.cur === 1 && totalPage === 0) {
        return false
      }
      if (totalPage < this.cur || totalPage === 0) {
        this.cur = 1
        this.$emit('page', { currentPage: this.cur, pageSize: this.size })
      }
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('page', { currentPage: this.cur, pageSize: val })
    },
    handleCurrentChange(val) {
      this.$emit('page', { currentPage: val, pageSize: this.size })
    },
  },
}
</script>
