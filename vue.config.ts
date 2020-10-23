import pagesConfig from './src/config/pages.config'

import { ProjectOptions } from '@vue/cli-service'

import * as path from 'path'

import * as glob from 'glob'

// gzip压缩
import * as CompressionWebpackPlugin from 'compression-webpack-plugin'

// 代码压缩
import * as TerserPlugin from 'terser-webpack-plugin'

import { entryItemModule, pageItemModule } from './src/types/vue.config'

import { emptyObj } from './src/types/glob'

const projectName: string | undefined = process.env.PROJECT_NAME // 获取package.json中scripts配置的变量

function resolve(dir: string): string {
  return path.join(__dirname, dir)
}

const pages: emptyObj = {}

let entryPages: emptyObj = {}

glob.sync('./src/pages/**/main.ts').forEach((entry: string) => {
  const chunk: string = entry.match(/\.\/src\/pages\/(.*)\/main\.ts/)[1]
  const curr: pageItemModule = pagesConfig[chunk]
  if (curr) {
    const pageItem: entryItemModule = {
      entry,
      ...curr,
      chunks: process.env.NODE_ENV === 'production'
        ? ['chunk-libs', 'chunk-elementUI', 'chunk-commons', 'runtime', chunk]
        : ['chunk-vendors', 'chunk-common', chunk]
    }
    pages[chunk] = pageItem
  }
})

projectName ? entryPages[projectName] = pages[projectName] : entryPages = pages

const vueConfig: ProjectOptions = {
  pages: entryPages,
  publicPath: './',
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  outputDir: `dist-${process.env.VUE_APP_CURENV}`,
  chainWebpack: config => {
    const types: string[] = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type: string) => addStyleResource(config.module.rule('less').oneOf(type)))
    
    // 防止多页面打包卡顿
    config.plugins.delete('named-chunks')
    
    // 修复HMR
    config.resolve.symlinks(true)
    
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_pi', resolve('src/pages/index'))
      .set('_piv', resolve('src/pages/index/views'))
      // .set('_pd1', resolve('src/pages/demo1'))
      // .set('_pd1v', resolve('src/pages/demo1/views'))
    
    // 设置svg-loader
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
    
    // 图片压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
      
    // 生产环境
    config.when(process.env.NODE_ENV === 'production', config => {
      // gzip压缩
      const productionGzipExtensions: string[] = ['html', 'js', 'css']
      config.plugin('CompressionWebpackPlugin')
        .use(new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        }))
    
      config.plugin('TerserPlugin')
        .use(new TerserPlugin({
          terserOptions: {
            //生产环境自动删除console
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        }))
    
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after(`html`)
        .use('script-ext-html-webpack-plugin', [{
          inline: /runtime\..*\.js$/
        }])
        .end()
    
      config
        .optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial'
            },
            elementUI: {
              name: 'chunk-elementUI', // 拆分element-ui
              priority: 20, // 权重
              test: /[\\/]node_modules[\\/]_?element-ui(.*)/
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'),
              minChunks: 3, // 最小使用数
              priority: 5,
              reuseExistingChunk: true
            }
          }
        })
    
      config.optimization.runtimeChunk('single')
    
      Object.keys(entryPages).forEach((page: string): void => {
  
        // 预加载
        config.plugin(`preload-${page}`).tap(() => [{
          rel: 'preload',
          fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
          include: 'initial'
        }])
    
        config.plugins.delete(`prefetch-${page}`)
      })
    })
  },
  configureWebpack: config => {
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : undefined
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 跨域代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://220.160.52.164:8213',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

function addStyleResource(rule: any): void {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/variables.less') // 需要全局导入的less
      ]
    })
}

module.exports = vueConfig
