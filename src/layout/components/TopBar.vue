<template>
  <div class="y-layout_bar flex-row">
    <div class="y-layout_logo">
      <router-link to="/">
        <h1>LOGO</h1>
      </router-link>
    </div>
    <div class="container flex-row">
      <div class="y-layout_tools flex-row">
        <svg-icon icon="notification"></svg-icon>
        <svg-icon icon="tag"></svg-icon>
        <svg-icon
          icon="fullscreen"
          @click.native="shiftFullscreen"></svg-icon>
      </div>
      <el-dropdown trigger="click">
        <div class="y-layout_user flex-row">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
          <span class="username">username</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            icon="el-icon-switch-button"
            @click.native="logout"
            >退出登陆</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isFullscreen: false,
    }
  },
  computed: {},
  created() {
    window.addEventListener('resize', this.shiftFullscreenState)
    document.documentElement.addEventListener('keydown', this.keyAgent)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.shiftFullscreenState)
    document.documentElement.removeEventListener('keydown', this.keyAgent)
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?logout=true`)
    },
    // 根据当前当前全屏状态切换全屏或者退出全屏
    shiftFullscreen() {
      if (!this.checkFullscreen()) {
        this.isFullscreen = false
        this.$root.$el.requestFullscreen()
      } else {
        this.isFullscreen = true
        document.exitFullscreen()
      }
    },
    // 根据当前当前全屏状态切换this.isFullscreen
    shiftFullscreenState() {
      if (this.checkFullscreen()) {
        this.isFullscreen = true
      } else {
        this.isFullscreen = false
      }
    },
    // 获取浏览器当前全屏状态
    checkFullscreen() {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        return true
      } else {
        return false
      }
    },
    // 按键事件接管
    keyAgent(e) {
      // 接管F11
      if (e.code === 'F11') {
        e.preventDefault()
        this.shiftFullscreen()
      }
    },
  },
}
</script>

<style lang="scss">
.y-layout_bar {
  
  align-items: center;
  padding: 0 16px;
  width: 100%;
  height: 64px;
  background-color: $themeColor;

  & > .container {
    flex: 0;
    justify-content: flex-end;
  }
}

.y-layout_user {
  align-items: center;
  color: $txtColor-reverse;
  cursor: pointer;

  .username {
    padding: 0 8px;
    font-size: 18px;
  }
}

.y-layout_tools {
  align-items: center;
  font-size: 14px;
  color: $txtColor-reverse;

  svg {
    margin-right: 24px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
