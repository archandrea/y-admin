<template>
  <base-card
    id="list-page"
    class="y-page">
    <div class="y-container no-padding">
      <div class="y-header">
        <!-- 修改标题 -->
        <h2 class="y-title">列表页面</h2>
        <el-button
          type="primary"
          plain
          size="small">
          <i class="el-icon-download"></i>
          下载模板
        </el-button>
        <el-button
          type="primary"
          plain
          size="small">
          <svg-icon icon="exit"></svg-icon>
          导出
        </el-button>
        <el-button
          type="danger"
          plain
          size="small"
          style="margin-left: 8px">
          <svg-icon icon="remove"></svg-icon>
          批量删除
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleOperation(null)">
          <svg-icon icon="add"></svg-icon>
          添加
        </el-button>
      </div>
      <div class="y-container--tight">
        <el-form
          ref="searchForm"
          :inline="true"
          :model="searchForm"
          :rules="rules"
          size="small">
          <el-form-item
            label="关键字"
            prop="keyword">
            <el-input
              v-model="searchForm.keyword"
              clearable
              style="width: 220px"
              placeholder="请输入关键字进行搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              plain
              @click.native="resetSearch">
              <svg-icon icon="reset"></svg-icon>
              重置
            </el-button>
            <el-button
              v-debounce="fetchData"
              type="primary">
              <i class="el-icon-search"></i>
              搜索
            </el-button>
          </el-form-item>
        </el-form>
        <el-table
          ref="table"
          :data="list"
          v-loading="loading"
          stripe
          height="100%"
          fit
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55" />
          <el-table-column
            label="部门id"
            prop="deptId" />
          <el-table-column
            label="用户id"
            prop="userId" />
          <el-table-column
            label="排序号"
            prop="orderNum" />
          <el-table-column
            label="key键"
            prop="testKey" />
          <el-table-column
            label="值"
            prop="value" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-link
                @click="handleOperation(scope.row)"
                type="primary"
                :underline="false"
                >编辑</el-link
              >
              <el-link
                @click="handleDelete(scope.row)"
                type="danger"
                :underline="false"
                >删除</el-link
              >
            </template>
          </el-table-column>
          <template #empty>
            <el-empty description="暂无信息"></el-empty>
          </template>
        </el-table>
      </div>
      <div class="y-footer">
        <pagination
          :current-page.sync="formData.pageNum"
          :page-size.sync="formData.pageSize"
          :total="total"
          @page="fetchData"></pagination>
      </div>
    </div>
    <!-- 添加 Drawer 组件 -->
    <drawer
      :visible.sync="drawerVisible"
      :user-id="drawerData?.userId"
      @success="fetchData" />
  </base-card>
</template>

<script>
import Drawer from './components/Drawer'

export default {
  name: 'ListPage',
  components: {
    Drawer,
  },
  data() {
    return {
      loading: false,
      searchForm: {
        keyword: '',
        dateRange: [],
      },
      rules: {},
      formData: {
        pageNum: 1,
        pageSize: 15,
      },
      // TODO：清空列表
      list: [
        {
          deptId: 1,
          userId: 101,
          orderNum: 1,
          testKey: 'key1',
          value: '值1',
        },
        {
          deptId: 2,
          userId: 102,
          orderNum: 2,
          testKey: 'key2',
          value: '值2',
        },
        {
          deptId: 3,
          userId: 103,
          orderNum: 3,
          testKey: 'key3',
          value: '值3',
        },
        {
          deptId: 4,
          userId: 104,
          orderNum: 4,
          testKey: 'key4',
          value: '值4',
        },
        {
          deptId: 5,
          userId: 105,
          orderNum: 5,
          testKey: 'key5',
          value: '值5',
        },
      ],
      total: 0,
      drawerVisible: false,
      drawerData: null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true

      const payload = {
        ...this.searchForm,
        ...this.formData,
      }

      // const [err, res] = await getList(payload)
      // if (res) {
      //   this.list = res.data || []
      //   this.total = res.totalRow
      // }
      this.loading = false
    },
    resetSearch() {
      this.$refs.searchForm?.resetFields()
      this.formData = {
        pageSize: 15,
        pageNum: 1,
        pageType: 3,
      }
      this.fetchData()
    },
    handleOperation(row) {
      this.drawerVisible = true
      this.drawerData = row
    },
    async handleDelete(row) {
      try {
        await this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })

        this.loading = true
        // TODO: 调用删除 API
        // const [err, res] = await deleteRecord(row.id);
        this.loading = false

        this.$message({
          message: '删除成功！',
          type: 'success',
          duration: 800,
          onClose: () => {
            this.fetchData()
          },
        })
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss" scoped>
#list-page {
  @import '@/assets/styles/modules/table-page.scss';
}
</style>
