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
      '/api': {
        target: 'http://172.0.0.1:8080/',
        changeOrigin: true,
        ws: false,
        // pathRewrite: {'^/api' : ''},
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
    },
  },
  chainWebpack(config) {

    if (process.env.ENV === 'production') {
      // 去除debugger, console
      config.optimization.minimizer('terser').tap(args => {
        args.forEach(item => {
          if (item.hasOwnProperty('terserOptions')) {
            Object.assign(item['terserOptions'].compress, {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            })
          }
          item['terserOptions']['format'] = {
            comments: false
          }
        })
        return args
      })
    }

    config
      .plugin('preload')
      .use('@vue/preload-webpack-plugin')
      .tap(() => [
        {
          rel: 'preload',
          // to ignore runtime.js
          fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
          include: 'initial'
        }
      ])
    // 删除prefetch
    config.plugins.delete('prefetch')

    // svg
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 拆分chunks
    config
      .optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          echarts: {
            name: 'chunk-echarts',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?echarts(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
    // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
    config.optimization.runtimeChunk('single')
  }
})
