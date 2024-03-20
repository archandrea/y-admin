<template>
  <base-card
    id="span-table"
    class="y-page y-container--tight">
    <el-table
      :data="tableData"
      :span-method="handleSpan"
      border
      style="width: 100%">
      <el-table-column
        v-for="(value, key) in headers"
        :prop="key"
        :label="value"
        sortable>
      </el-table-column>
    </el-table>
  </base-card>
</template>

<script>
export default {
  name: 'SpanTable',
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
        },
        {
          id: '12987124',
          name: '王小虎',
          amount1: '165',
          amount2: '2.2',
          amount3: 12,
        },
        {
          id: '12987124',
          name: '王小虎2',
          amount1: '324',
          amount2: '2.2',
          amount3: 9,
        },
        {
          id: '12987124',
          name: '王小虎2',
          amount1: '621',
          amount2: '2.2',
          amount3: 17,
        },
        {
          id: '12987126',
          name: '王小虎3',
          amount1: '621',
          amount2: '2.2',
          amount3: 99,
        },
        {
          id: '12987126',
          name: '王小虎3',
          amount1: '621',
          amount2: '1',
          amount3: 99,
        },
        {
          id: '12987126',
          name: '王小虎3',
          amount1: '621',
          amount2: '1',
          amount3: 19,
        },
      ],
      headers: {
        id: 'ID',
        name: '姓名',
        amount1: '数值 1',
        amount2: '数值 2',
        amount3: '数值 3',
      },
    }
  },
  computed: {
    spanArray() {
      return Object.entries(this.headers).reduce((acc, [key], idx) => {
        if (!acc[idx]) {
          acc[idx] = []
        }

        for (let i = 0, len = this.signedData.length; i < len; i++) {
          let col = acc[idx]
          if (col[i] === 0) {
            continue
          }
          const item = this.signedData[i]
          col[i] = 1
          for (let j = i + 1; j < len; j++) {
            let item2 = this.signedData[j]
            // 如果不用判断父级，只需比较item2[key] === item[key], this.signedData换成this.tableData
            if (item2[`sid_${key}`] === item[`sid_${key}`]) {
              col[j] = 0
              col[i]++
            } else {
              i = j - 1
              break
            }
          }
        }
        return acc
      }, [])
    },
    // 判断父级用的
    // 父级如果没有合并子级不能合并
    // 当前父级计算为：算上子级本身向前3级
    signedData() {
      const headers = Object.entries(this.headers)
      return this.tableData.map((item) => {
        headers.forEach(([key, value], idx, arr) => {
          let signProp = `sid_${key}`
          for (let j = 0; j < 3 && arr[idx - j]; j++) {
            (item[signProp] && (item[signProp] += '-' + item[arr[idx - j][0]])) || (item[signProp] = item[key])
          }
        })
        return item
      })
    },
  },
  watch: {},
  created() {
    console.log(this.spanArray)
    console.log(this.signedData)
  },
  mounted() {},
  methods: {
    handleSpan(data) {
      const { row, column, rowIndex, columnIndex } = data
      const _row = this.spanArray[columnIndex][rowIndex]
      const _col = 1

      return {
        rowspan: _row,
        colspan: _col,
      }
    },
  },
}
</script>

<style lang="scss">
#span-table {
}
</style>
