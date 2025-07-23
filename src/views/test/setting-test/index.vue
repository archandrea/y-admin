<template>
  <base-card
    id="setting-test"
    class="y-page">
    <div class="y-bar">
      <el-button
        @click.native="toggleHeader"
        class="mini"
        type="primary">
        {{ `${showTopBar ? '关闭' : '开启'}Header` }}
      </el-button>
      <el-button
        @click.native="toggleMenu"
        class="mini"
        type="primary">
        {{ `${showAsideBar ? '关闭' : '开启'}Menu` }}
      </el-button>
      <el-button
        @click.native="toggleTagBar"
        class="mini"
        type="primary">
        {{ `${showTagBar ? '关闭' : '开启'}TagBar` }}
      </el-button>
    </div>
  </base-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SettingTest',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      showSettings: (state) => state.setting.showSettings,
      showTagBar: (state) => state.setting.showTagBar,
      showAsideBar: (state) => state.setting.showAsideBar,
      showTopBar: (state) => state.setting.showTopBar,
    }),
  },
  watch: {},
  created() {},
  activated() {},
  deactivated() {
    this.$store.dispatch('setting/resetSetting')
  },
  mounted() {},
  methods: {
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

<style lang="scss">
#setting-test {
}
</style>
