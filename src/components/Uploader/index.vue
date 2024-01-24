<template>
  <div class="uploader">
    <el-upload
      ref="uploader"
      class="upload-area"
      action=""
      :accept="typeLimit ? typeLimit + '/*' : '*/*'"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleFileChange"
      @click.native.capture="disableClick"
      v-bind="$attrs"
      v-on="$listeners">
      <div
        v-if="!preview"
        ref="btnUpload"
        class="btn-upload">
        <slot></slot>
      </div>
    </el-upload>
    <div
      class="preview-area"
      v-if="preview"
      @click="previewClickEmitter">
      <media-viewer
        ref="mediaViewer"
        v-if="type === 'image' || type === 'video'"
        :type="type"
        :preview="mediaClickEvent === 'preview'"
        :src="preview"></media-viewer>
      <audio
        v-else-if="type === 'audio'"
        controls
        :src="preview"></audio>
    </div>
    <div
      v-if="preview"
      class="btn-cancel"
      @click="clearFiles">
      <i class="el-icon-delete"></i>
    </div>
    <div
      class="uploader-tag"
      @click="tagClickEmitter"
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
    mediaClickEvent: {
      type: String,
      default: 'none', // preview | none
    },
    // 接管uploader组件的click事件
    // 有此属性则el-upload的click事件将不会被触发
    handleClick: {
      type: Function,
      default: null,
    },
    // 接管tag的click事件
    // 触发覆盖优先级为 el-upload.click < handleClick < handleTagClick
    handleTagClick: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      type: '',
      preview: '',
      avoidLock: false,
    }
  },
  computed: {
    uploadClickLock() {
      if (!this.avoidLock && this.handleClick && typeof this.handleClick === 'function') {
        return true
      } else {
        return false
      }
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleFileChange(file) {
      // 验证文件大小限制
      if (!this.verifySize(file)) return false
      // 验证文件类型限制
      if (!this.verifyType(file)) return false

      this.$emit('file-change', file)
      if (file) {
        this.preview = URL.createObjectURL(file.raw)
      }
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
    previewClickEmitter(e) {
      if (e.target === this.$refs.btnUpload) {
        if (this.uploadClickLock) {
          this.handleClick(e)
        } else {
          this.openUpload()
        }
      } else {
        if (this.mediaClickEvent === 'none') {
          this.$refs.uploader.$el.click()
        }
      }
    },
    tagClickEmitter(e) {
      if (this.handleTagClick && typeof this.handleTagClick === 'function') {
        this.handleTagClick(e)
      } else if (this.uploadClickLock) {
        this.handleClick(e)
      } else {
        this.openUpload()
      }
    },
    openUpload() {
      let upload = this.$refs.uploader?.$refs?.['upload-inner']?.$el

      if (upload) {
        this.avoidLock = true
        upload.click()
        this.avoidLock = false
      }
    },
    disableClick(e) {
      if (this.uploadClickLock) {
        e.preventDefault()
        e.stopPropagation()

        this.handleClick(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.uploader::v-deep {
  position: relative;
  flex: 1;
  height: 150px;
  border: 1px solid $bgColor-dark;
  border-radius: 4px;
  overflow: hidden;

  .preview-area {
    @include full;
    @include flex-center;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .upload-area {
    @include full;
    position: absolute;
    overflow: hidden;

    .el-upload {
      @include full;
      @include flex-center;
      background: $bgColor-dark;

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
    z-index: 5;

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
    cursor: pointer;
    z-index: 5;
  }
}

.el-form-item.is-error .uploader {
  border-color: #f56c6c;
}
</style>
