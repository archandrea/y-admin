<template>
  <div class="uploader">
    <el-upload
      ref="uploader"
      class="upload-area"
      :disabled="disabled"
      action=""
      :accept="typeLimit ? typeLimit + '/*' : '*/*'"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleFileChange"
      drag
      v-bind="$attrs"
      v-on="$listeners">
      <media-viewer
        v-if="preview && (type === 'image' || type === 'video')"
        :type="type"
        :src="preview"></media-viewer>
      <audio
        v-else-if="preview && type === 'audio'"
        controls
        :src="preview"></audio>
      <div
        v-else
        class="btn-upload">
        <slot></slot>
      </div>
    </el-upload>
    <div
      v-if="preview"
      class="btn-cancel"
      @click="clearFiles">
      <i class="el-icon-delete"></i>
    </div>
    <div
      class="uploader-tag"
      v-if="tag">
      {{ tag }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Uploader',
  components: {
    'media-viewer': () => import('@/components/MediaViewer'),
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    sizeLimit: {
      type: Number,
    },
    typeLimit: {
      type: String,
    },
    tag: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      type: '',
      preview: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleFileChange(file) {
      // 验证允许上传
      if (!this.verifyPermit()) return false
      // 验证文件大小限制
      if (!this.verifySize(file)) return false
      // 验证文件类型限制
      if (!this.verifyType(file)) return false

      this.$emit('file-change', file)
      if (file) {
        this.preview = URL.createObjectURL(file.raw)
      }
    },
    verifyPermit() {
      if (this.disabled) {
        this.$emit('not-permit')
        return false
      }
      return true
    },
    verifySize(file) {
      if (this.sizeLimit && file.raw.size > this.sizeLimit) {
        this.$message({
          message: `文件大小不允许超过${this.formatSize(this.sizeLimit)}，请重新上传`,
          type: 'error',
          duration: 1200,
        })
        return false
      }
      return true
    },
    verifyType(file) {
      const map = {
        image: '图片',
        video: '视频',
        audio: '音频',
      }
      for (const key in map) {
        if (file.raw.type.indexOf(key) !== -1) {
          this.type = key
          break
        }
      }
      if (this.typeLimit && file.raw.type.indexOf(this.typeLimit) === -1) {
        this.$message({
          message: `上传文件类型不是${map[this.typeLimit]}，请重新上传`,
          type: 'error',
          duration: 1200,
        })
        return false
      }
      return true
    },
    clearFiles() {
      this.preview = ''
      this.type = ''
      this.$emit('clear-files')
      this.$refs.uploader.clearFiles()
    },
    formatSize(size) {
      if (size > 100 && size < 1000000) {
        return Number(size / 1000).toFixed(0) + 'KB'
      } else if (size >= 1000000) {
        return Number(size / 1000000).toFixed(0) + 'MB'
      } else {
        return size + 'B'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.uploader {
  position: relative;
  flex: 1;
  height: 150px;

  .upload-area::v-deep {
    // @include flex-center;
    @include full;
    overflow: hidden;
    border-radius: 4px;

    .el-upload {
      @include full;
      // @include flex-center;

      .el-upload-dragger {
        @include full;
        @include flex-center;
        background: $bgColor-dark;
        border: none;

        &.is-dragover {
          border: 4px dashed $borderColor;
          background: $bgColor;
        }
      }

      audio {
        @include full;
      }
    }
  }

  .btn-upload {
    @include flex-col;
    font-size: 16px;
    color: $txtColor-slight;
  }

  .btn-cancel {
    @include flex-center;
    position: absolute;
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
    font-size: 16px;
    border-radius: 4px;
    background: rgba(38, 38, 38, 0.6);
    cursor: pointer;

    i {
      color: $txtColor-reverse;
    }

    &:hover {
      background: rgba(38, 38, 38, 0.4);
    }
  }

  .uploader-tag {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: normal;
    line-height: 16px;
    color: $txtColor-reverse;
    border-radius: 4px 0px 4px 0px;
    background-color: $themeColor;
  }
}
</style>
