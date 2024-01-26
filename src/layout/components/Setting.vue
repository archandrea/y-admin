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
        @change="toggleHeader"
        active-color="#52C41A"
        :active-value="true"
        :inactive-value="false">
      </el-switch>
    </div>
    <div :class="`${namespace}-bar`">
      <span>是否开启Menu</span>
      <el-switch
        v-model="showAsideBar"
        @change="toggleMenu"
        active-color="#52C41A"
        :active-value="true"
        :inactive-value="false">
      </el-switch>
    </div>
    <div :class="`${namespace}-bar`">
      <span>是否开启TagBar</span>
      <el-switch
        v-model="showTagBar"
        @change="toggleTagBar"
        active-color="#52C41A"
        :active-value="true"
        :inactive-value="false">
      </el-switch>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'theme-picker': () => import('@/components/ThemePicker'),
  },
  data() {
    return {}
  },
  computed: {
    namespace() {
      return this.$store.state.setting.namespace
    },
    showTopBar() {
      return this.$store.state.setting.showTopBar
    },
    showTagBar() {
      return this.$store.state.setting.showTagBar
    },
    showAsideBar() {
      return this.$store.state.setting.showAsideBar
    },
  },
  watch: {},
  methods: {
    themeChange(val) {
      this.$store.dispatch('setting/changeSetting', {
        themeColor: val,
      })
    },
    toggleHeader() {
      this.$store.dispatch('setting/changeSetting', { showTopBar: !this.showTopBar })
    },
    toggleMenu() {
      this.$store.dispatch('setting/changeSetting', { showAsideBar: !this.showAsideBar })
    },
    toggleTagBar() {
      this.$store.dispatch('setting/changeSetting', { showTagBar: !this.showTagBar })
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
