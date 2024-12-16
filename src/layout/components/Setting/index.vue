<template>
  <div :class="`${namespace}-setting ${namespace}-container--tight no-padding`">
    <div :class="`${namespace}-bar`">
      <span>主题色</span>
      <theme-picker
        style="height: 26px"
        @change="themeChange" />
    </div>
    <div :class="`${namespace}-bar`">
      <span>是否开启Header</span>
      <el-switch
        v-model="showTopBar"
        active-color="#52C41A"
        :active-value="true"
        :inactive-value="false">
      </el-switch>
    </div>
    <div :class="`${namespace}-bar`">
      <span>是否开启Menu</span>
      <el-switch
        v-model="showAsideBar"
        active-color="#52C41A"
        :active-value="true"
        :inactive-value="false">
      </el-switch>
    </div>
    <div :class="`${namespace}-bar`">
      <span>是否开启TagBar</span>
      <el-switch
        v-model="showTagBar"
        active-color="#52C41A"
        :active-value="true"
        :inactive-value="false">
      </el-switch>
    </div>
    <div :class="`${namespace}-bar`">
      <span>切换权限</span>
      <el-switch
        v-model="permission"
        active-color="#52C41A"
        :active-value="true"
        :inactive-value="false">
      </el-switch>
    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
export default {
  components: {
    ThemePicker,
  },
  data() {
    return {
      permission: true,
    }
  },
  computed: {
    namespace() {
      return this.$store.state.setting.namespace
    },
    showTopBar: {
      get() {
        return this.$store.state.setting.showTopBar
      },
      set() {
        this.$store.dispatch('setting/changeSetting', { showTopBar: !this.showTopBar })
      },
    },
    showTagBar: {
      get() {
        return this.$store.state.setting.showTagBar
      },
      set() {
        this.$store.dispatch('setting/changeSetting', { showTagBar: !this.showTagBar })
      },
    },
    showAsideBar: {
      get() {
        return this.$store.state.setting.showAsideBar
      },
      set() {
        this.$store.dispatch('setting/changeSetting', { showAsideBar: !this.showAsideBar })
      },
    },
  },
  watch: {
    permission(v) {
      if (v) {
        this.$store.dispatch('permission/setPermission', ['permission-test-user', 'permission-test-admin'])
      } else {
        this.$store.dispatch('permission/setPermission', ['permission-test-user'])
      }
    },
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('setting/changeSetting', {
        themeColor: val,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.#{$namespace}-setting {
  > .#{$namespace}-bar {
    justify-content: flex-start;

    span {
      margin-left: 16px;
    }

    &.#{$namespace}-bar {
      margin-top: 24px;
    }
  }
}
</style>
