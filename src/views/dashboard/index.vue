<template>
  <div
    id="dashboard"
    class="y-page flex-row">
    <div class="y-dashboard_left flex">
      <y-card class="flex">
        <div class="y-bar">
          <h4 class="y-title">发送数据量</h4>
          <el-button-group>
            <el-button
              :class="['btn-switch', isActive === idx ? 'is-active' : '', 'mini']"
              size="small"
              v-for="(btn, idx) in ['本月', '上月', '自定义']"
              @click="isActive = idx"
              plain
              >{{ btn }}</el-button
            >
          </el-button-group>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            size="small"
            :picker-options="pickerOptions"
            :disabled="isActive !== 2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </y-card>
      <div class="y-dashboard_left_bottom flex-row">
        <y-card class="flex">
          <div class="y-bar">
            <h4 class="y-title">发送量类型占比分析</h4>
          </div>
        </y-card>
        <y-card class="flex">
          <div class="y-bar">
            <h4 class="y-title">发送量类型分析</h4>
          </div>
        </y-card>
      </div>
    </div>
    <div class="y-dashboard_right flex">
      <y-card class="flex">
        <div class="y-bar">
          <h4 class="y-title">最近编辑</h4>
          <router-link
            to="/function/template-manage"
            class="btn-more"
            >更多<i class="el-icon-d-arrow-right"></i
          ></router-link>
        </div>
      </y-card>
      <y-card class="flex">
        <div class="y-bar">
          <h4 class="y-title">已群发消息</h4>
          <router-link
            to="/manage/msg-history"
            class="btn-more"
            >更多<i class="el-icon-d-arrow-right"></i
          ></router-link>
        </div>
      </y-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      // 日期选择
      isActive: 0,
      // 自定义日期
      selfDefinedDateRange: [],
      pickerOptions: {
        // 禁止选中今日之后的日期
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
    }
  },
  computed: {
    dateRange: {
      get() {
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const firstDayOfMonth = new Date(`${year}-${month}-1`)
        // 本月
        if (this.isActive === 0) {
          return [firstDayOfMonth, today]
        }
        // 上月
        else if (this.isActive === 1) {
          const lastDayOfLastMonth = new Date(firstDayOfMonth.setDate(-1))
          const firstDayOfLastMonth = new Date(`${year}-${((month + 10) % 12) + 1}-1`)
          return [firstDayOfLastMonth, lastDayOfLastMonth]
        }
        // 自定义
        else if (this.isActive === 2) {
          return this.selfDefinedDateRange
        }
        // 未知
        else {
          return []
        }
      },
      set(val) {
        this.selfDefinedDateRange = val
      },
    },
  },
  watch: {
    dateRange: {
      handler(dateRange) {
        if (dateRange.length !== 0) {
          this.fetchData()
        }
      },
    },
    deep: true,
    immediate: true,
  },
  created() {
    this.fetchData()
    this.$store.dispatch('setting/changeSetting', { showTopBar: false })
  },
  activated() {
    console.log('activated')
    this.$store.dispatch('setting/changeSetting', { showTopBar: false })
  },
  deactivated() {
    console.log('deactivated')
    this.$store.dispatch('setting/resetSetting')
  },
  methods: {
    async fetchData() {
      // const [err, res] = await fetchData()
      // if (res) {
      //   // ...
      // }
    },
  },
}
</script>

<style lang="scss">
#dashboard {
  // 首页布局
  .y-dashboard_left {
    margin-right: 8px;
    width: 70%;

    & > div:nth-child(1) {
      margin-bottom: 16px;
      height: 60%;
    }

    .y-dashboard_left_bottom {
      height: calc(40% - 16px);

      & > div:nth-child(1) {
        margin-right: 16px;
        width: 35%;
      }

      & > div:nth-child(2) {
        width: calc(65% - 16px);
      }
    }
  }

  .y-dashboard_right {
    width: calc(30% - 16px);

    & > div:nth-child(1) {
      margin-bottom: 16px;
      height: 40%;
    }

    & > div:nth-child(2) {
      height: calc(60% - 16px);
    }
  }

  // 细节样式
  .btn-more {
    white-space: nowrap;
    color: $txtColor;
    cursor: pointer;

    i {
      margin-left: 4px;
    }

    &:hover {
      color: $themeColor;
    }
  }

  .btn-switch {
    border: 1px solid $themeColor;

    &:hover {
      border-color: transparentize($themeColor, 0.25);
    }
  }
}
</style>
