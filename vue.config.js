const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

let argv = process.argv
let app = argv[argv.findIndex(i => i === '--name') + 1] === 'login' ? 'login' : 'portal'
console.log('build ' + app)

module.exports = defineConfig({
  publicPath: './',
  outputDir: `dist/${app}`,
  transpileDependencies: true,
  // 关闭生产环境sourceMap
  productionSourceMap: false,
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
          return '@import "@/assets/style/common/variables.module.scss";' + '@import "@/assets/style/common/mixin.scss";' + content
        },
        sassOptions: { outputStyle: 'expanded' } // fix: 解决 element-ui 图标 icon 偶现乱码问题
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
  }
})
