<template>
  <el-dropdown trigger="click">
    <div :class="[`${namespace}-layout_user`, 'layout-flex-row']">
      <el-avatar icon="el-icon-user-solid"></el-avatar>
      <span class="username">username</span>
      <i class="el-icon-arrow-down"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        icon="el-icon-key"
        @click.native="openConfig('updatePwdDialog')"
        >修改密码</el-dropdown-item
      >
      <el-dropdown-item
        icon="el-icon-switch-button"
        @click.native="logout"
        >退出登陆</el-dropdown-item
      >
    </el-dropdown-menu>
    <config-form ref="configForm"></config-form>
  </el-dropdown>
</template>

<script>
export default {
  components: {
    'config-form': () => import('./components/ConfigForm'),
  },
  data() {
    return {}
  },
  computed: {
    namespace() {
      return this.$store.state.setting.namespace
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?logout=true`)
    },
    openConfig(type) {
      this.$refs.configForm[type] = true
    },
  },
}
</script>

<style lang="scss"></style>
