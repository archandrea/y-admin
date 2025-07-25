<template>
  <div
    id="tree-card-page"
    class="y-page y-container no-padding">
    <aside-bar
      ref="asideBar"
      @set-current="setCurrent($event)"></aside-bar>
    <base-card class="right-panel y-container no-padding">
      <div class="y-container no-padding">
        <div class="y-header">
          <h2 class="y-title">部门人员列表</h2>
          <el-button
            type="danger"
            plain
            size="small"
            @click="handleDelete(null)">
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
        <div>
          <el-form
            ref="searchForm"
            :inline="true"
            :model="searchForm"
            :rules="rules">
            <el-form-item
              label="关键字"
              prop="keyword">
              <el-input
                v-model="searchForm.keyword"
                style="width: 220px"
                clearable
                placeholder="请输入关键字进行搜索"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="fetchData"
                type="primary"
                size="small">
                <i class="el-icon-search"></i>
                搜索
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <empty-wrapper
        class="y-container--tight"
        :toggle="!list || list.length === 0"
        v-loading="loading">
        <div class="y-card-wrapper y-container--tight no-padding">
          <Card
            v-for="(item, index) in list"
            :key="index"
            :data="item"
            @delete="handleDelete(item)"
            @edit="handleOperation(item)"></Card>
        </div>
      </empty-wrapper>
      <div class="y-footer">
        <pagination
          :current-page.sync="formData.pageNum"
          :page-size.sync="formData.pageSize"
          :total="total"
          @page="fetchData"></pagination>
      </div>
    </base-card>
    <!-- 添加 Drawer 组件 -->
    <drawer
      :visible.sync="drawerVisible"
      :user-id="drawerData?.userId"
      @success="fetchData" />
  </div>
</template>

<script>
import Drawer from './components/Drawer'
import AsideBar from './components/AsideBar'
import Card from './components/Card'

export default {
  name: 'TreeCardPage',
  components: {
    Drawer,
    AsideBar,
    Card,
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
    setCurrent(id) {
      this.searchForm.deptId = id
      this.fetchData()
    },
  },
}
</script>

<style lang="scss" scoped>
#tree-card-page {
  @include flex-row;
  background-color: transparent;

  > .aside-bar {
    @include card;
    margin-right: 16px;
  }

  .right-panel {
    @import '@/assets/styles/modules/card-page.scss';
    background-color: transparent;

    .el-form {
      padding: 16px 8px 0 24px;
    }

    .y-card-wrapper {
      @include card-wrapper(null, 900px); // padding, width, height（default: auto）
    }
  }
}
</style>
