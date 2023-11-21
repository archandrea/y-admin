<template>
  <el-color-picker
    v-model="themeColor"
    :predefine="['#0555CE', '#1890ff', '#304156', '#212121', '#11a983', '#13c2c2', '#6959CD', '#f5222d']"
    class="theme-picker"
    popper-class="theme-picker-dropdown" />
</template>

<script>
const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#0555CE' // default color
console.log(version)

export default {
  data() {
    return {
      chalk: '', // content of theme-chalk css
      themeColor: '',
      themeCluster: [],
      originalCluster: [],
    }
  },
  computed: {
    defaultTheme() {
      return this.$store.state.setting.themeColor
    },
  },
  watch: {
    defaultTheme: {
      handler: function (val, oldVal) {
        this.themeColor = val
      },
      immediate: true,
    },
    async themeColor(val, oldVal) {
      if (typeof val !== 'string') return

      let msg = this.$message({
        message: '正在获取主题色',
        type: 'info',
        duration: 0,
        iconClass: 'el-icon-loading',
      })

      // 获取色彩
      oldVal = oldVal ? oldVal : ORIGINAL_THEME
      this.themeCluster = this.getThemeCluster(val.replace('#', ''))
      this.originalCluster = this.getThemeCluster(oldVal.replace('#', ''))

      // 获取css文件
      const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
      this.chalk = await this.getCSSString(url)
      console.log(this.chalk)

      if (typeof this.chalk !== 'string') return

      // 处理style并加入header
      this.styleHandler(this.chalk, 'chalk-style')

      // 处理其他style
      this.otherStyleHandler(oldVal)

      this.$emit('change', val)

      msg.close()
    },
  },
  methods: {
    // 将style文件的色彩更新
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },

    // 拉取element-ui的css文件，去掉其中的@font-face
    getCSSString(url) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(xhr.responseText.replace(/@font-face{[^}]+}/, ''))
          }
        }
        xhr.open('GET', url)
        xhr.send()
      })
    },

    // 获取色彩组
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    },

    // 处理函数替换style的色彩并加入header
    styleHandler(chalk, id) {
      const newStyle = this.updateStyle(chalk, this.originalCluster, this.themeCluster)

      let styleTag = document.getElementById(id)
      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.setAttribute('id', id)
        document.head.appendChild(styleTag)
      }
      styleTag.innerText = newStyle
    },

    // 处理其他style
    otherStyleHandler(oldVal) {
      const styles = [].slice.call(document.querySelectorAll('style')).filter((style) => {
        const text = style.innerText
        return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
      })
      styles.forEach((style) => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(innerText, this.originalCluster, this.themeCluster)
      })
    },
  },
}
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
