const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    hot: true,
    proxy: {
      '/': {
        target: 'http://172.0.0.1:8080/',
        changeOrigin: true,
        ws: false,
      }
    },
  },
  css: {
    loaderOptions: {
      scss: {
        // 变量注入
        // 防止重复注入
        additionalData: (content, loaderContext) => {
          const { resourcePath } = loaderContext;
          if (/variables\.module\.scss/.test(resourcePath) || /mixin\.scss/.test(resourcePath)) {
            return content
          }
          return '@import "@/assets/style/variables.module.scss";' + '@import "@/assets/style/mixin.scss";' + content
        },
      }
    }
  },
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve("path-browserify")
      },
    }
  },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
