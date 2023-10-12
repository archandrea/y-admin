<template>
  <div
    class="media-viewer_video_viewer"
    v-show="playing">
    <video
      ref="video"
      class="media-viewer_video"
      controls
      preload="auto">
      <source
        :src="src"
        width="100%"
        height="100%" />
    </video>
    <i
      class="el-icon-close"
      @click="closeVideo"></i>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    playing: {
      type: Boolean,
    },
    src: {
      type: String,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
    }
  },
  destroyed() {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  computed: {},
  methods: {
    closeVideo() {
      this.$emit('close-video')
      this.$refs.video.pause()
    },
  },
}
</script>

<style lang="scss">
.media-viewer_video_viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.3);

  .el-icon-close {
    position: absolute;
    top: 20px;
    right: 30px;
    width: 40px;
    height: 40px;
    font-size: 36px;
    color: $txtColor-reverse;
    cursor: pointer;

    &:hover {
      scale: 1.1;
      transition: 0.3s;
    }
  }

  .media-viewer_video {
    @include full;
  }
}
</style>
