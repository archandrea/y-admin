<template>
  <div class="media-viewer">
    <template v-if="type === 'image'">
      <el-image
        class="media-viewer_cover"
        :src="cover"
        fit="cover"
        :preview-src-list="[src]">
        <el-image
          slot="error"
          class="media-viewer_error"
          :src="src"
          fit="cover">
          <div
            slot="error"
            class="media-viewer_error">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-image>
    </template>
    <template v-else-if="type === 'video'">
      <div class="media-viewer_cover">
        <el-image
          class="video-cover"
          :src="cover"
          placeholder="无封面"
          fit="cover">
          <div
            slot="error"
            class="media-viewer_error">
            <video :src="src"></video>
          </div>
        </el-image>
        <svg-icon
          class="media-viewer_play"
          icon="video-play"
          @click="openVideo"></svg-icon>
      </div>
      <video-viewer
        :playing="playing"
        :src="src"
        @close-video="closeVideo"></video-viewer>
    </template>
    <template v-else-if="type === 'audio'">
      <div class="media-viewer_cover">
        <el-image
          src=""
          fit="cover"></el-image>
        <svg-icon
          class="media-viewer_play"
          icon="video-play"
          @click.stop="openVideo"></svg-icon>
      </div>
      <audio-viewer
        :playing="playing"
        :src="src"
        @close-video="closeVideo"></audio-viewer>
    </template>
    <template v-else>
      <el-image
        class="media-viewer_cover"
        src=""
        fit="cover">
        <div
          slot="error"
          class="media-viewer_error">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </template>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MediaViewer',
  components: {
    'video-viewer': () => import('./components/VideoViewer.vue'),
    'audio-viewer': () => import('./components/AudioViewer.vue'),
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      default: '',
    },
    type: {
      type: String,
    },
  },
  data() {
    return {
      playing: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    openVideo() {
      this.playing = true
    },
    closeVideo() {
      this.playing = false
    },
  },
}
</script>

<style lang="scss">
.media-viewer {
  @include full;
  position: relative;
  overflow: hidden;
}

.media-viewer_cover {
  @include full;
  position: relative;

  .el-image {
    @include full;
  }

  .video-cover {
    &:after {
      content: '';
      @include full;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.2);
      background-size: 100% 100%;
    }
  }
}

.media-viewer_play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  font-size: 48px;
  transform: translate(-50%, -50%);
  transform-origin: 0 0;
  cursor: pointer;

  &:hover {
    scale: 1.1;
    transition: 0.3s;
  }
}

.media-viewer_error {
  @include full;
  @include flex-center;

  i {
    font-size: 60px;
    color: $txtColor-light;
    background-color: $bgColor-dark;
    cursor: not-allowed;
  }

  video {
    width: auto;
    height: 100%;
  }
}
</style>
