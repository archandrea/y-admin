<template>
  <svg-icon
    class="full-screen"
    icon="fullscreen"
    @click.native="shiftFullscreen"></svg-icon>
</template>

<script>
export default {
  name: 'FullScreen',
  components: {},
  props: {},
  data() {
    return {
      isFullscreen: false,
    }
  },
  created() {
    window.addEventListener('resize', this.shiftFullscreenState)
    document.documentElement.addEventListener('keydown', this.keyAgent)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.shiftFullscreenState)
    document.documentElement.removeEventListener('keydown', this.keyAgent)
  },
  methods: {
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

<style lang="scss"></style>
