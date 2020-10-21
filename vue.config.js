"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var pages_config_1 = require("./src/config/pages.config");
var path = require("path");
var glob = require("glob");
var projectName = process.env.PROJECT_NAME; // 获取package.json中scripts配置的变量
var resolve = function (dir) {
    return path.join(__dirname, dir);
};
var pages = {};
var entryPages = {};
glob.sync('./src/pages/**/main.ts').forEach(function (entry) {
    var chunk = entry.match(/\.\/src\/pages\/(.*)\/main\.ts/)[1];
    var curr = pages_config_1["default"][chunk];
    if (curr) {
        pages[chunk] = __assign({ entry: entry }, curr);
    }
});
projectName ? entryPages[projectName] = pages[projectName] : entryPages = pages;
var vueConfig = {
    pages: entryPages,
    publicPath: './',
    chainWebpack: function (config) {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
            .set('_pi', resolve('src/pages/index'))
            .set('_piv', resolve('src/pages/index/views'));
        // .set('_pd1', resolve('src/pages/demo1'))
        // .set('_pd1v', resolve('src/pages/demo1/views'))
    }
};
module.exports = vueConfig;
// module.exports = {
// pages: pagesConfig,
// publicPath: './',
// // 如果你不需要使用eslint，把lintOnSave设为false即可
// lintOnSave: true,
// outputDir: `dist-${process.env.VUE_APP_CURENV}`,
// chainWebpack: config => {
//   const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
//   types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
//   // 防止多页面打包卡顿
//   config.plugins.delete('named-chunks')
//   // 修复HMR
//   config.resolve.symlinks(true)
//   config.resolve.alias
//     .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
//     .set('_pi', resolve('src/pages/index'))
//     .set('_piv', resolve('src/pages/index/views'))
//     .set('_pd1', resolve('src/pages/demo1'))
//     .set('_pd1v', resolve('src/pages/demo1/views'))
//   // set svg-sprite-loader
//   config.module
//     .rule('svg')
//     .exclude.add(resolve('src/assets/icons'))
//     .end()
//   config.module
//     .rule('icons')
//     .test(/\.svg$/)
//     .include.add(resolve('src/assets/icons'))
//     .end()
//     .use('svg-sprite-loader')
//     .loader('svg-sprite-loader')
//     .options({
//       symbolId: 'icon-[name]'
//     })
//     .end()
//   // ============压缩图片 start============
//   config.module
//     .rule('images')
//     .use('image-webpack-loader')
//     .loader('image-webpack-loader')
//     .options({
//       bypassOnDebug: true
//     })
//     .end()
//   // ============压缩图片 end============
//   // 生产环境
//   config.when(process.env.NODE_ENV === 'production', config => {
//     // gzip压缩
//     const productionGzipExtensions = ['html', 'js', 'css']
//     config.plugin('CompressionWebpackPlugin')
//       .use(new CompressionWebpackPlugin({
//         filename: '[path].gz[query]',
//         algorithm: 'gzip',
//         test: new RegExp(
//           '\\.(' + productionGzipExtensions.join('|') + ')$'
//         ),
//         threshold: 10240, // 只有大小大于该值的资源会被处理 10240
//         minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
//         deleteOriginalAssets: false // 删除原文件
//       }))
//     config.plugin('TerserPlugin')
//       .use(new TerserPlugin({
//         terserOptions: {
//           //生产环境自动删除console
//           compress: {
//             drop_debugger: true,
//             drop_console: true,
//             pure_funcs: ['console.log']
//           }
//         },
//         sourceMap: false,
//         parallel: true
//       }))
//     config
//       .plugin('ScriptExtHtmlWebpackPlugin')
//       .after(`html`)
//       .use('script-ext-html-webpack-plugin', [{
//         inline: /runtime\..*\.js$/
//       }])
//       .end()
//     config
//       .optimization.splitChunks({
//         chunks: 'all',
//         cacheGroups: {
//           libs: {
//             name: 'chunk-libs',
//             test: /[\\/]node_modules[\\/]/,
//             priority: 10,
//             chunks: 'initial' // only package third parties that are initially dependent
//           },
//           elementUI: {
//             name: 'chunk-elementUI', // split elementUI into a single package
//             priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
//             test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
//           },
//           commons: {
//             name: 'chunk-commons',
//             test: resolve('src/components'), // can customize your rules
//             minChunks: 3, //  minimum common number
//             priority: 5,
//             reuseExistingChunk: true
//           }
//         }
//       })
//     config.optimization.runtimeChunk('single')
//     Object.keys(entryPages).forEach(page => {
//       // 预加载
//       config.plugin(`preload-${page}`).tap(() => [{
//         rel: 'preload',
//         fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
//         include: 'initial'
//       }])
//       config.plugins.delete(`prefetch-${page}`)
//     })
//   })
// },
// configureWebpack: config => {
// },
// css: {
//   loaderOptions: {
//     less: {
//       javascriptEnabled: true
//     }
//   }
// },
// // 设为false打包时不生成.map文件
// productionSourceMap: false
// 这里写你调用接口的基础路径，来解决跨域
// devServer: {
//   proxy: 'localhost:3000'
// }
// }
// function addStyleResource(rule) {
//   rule.use('style-resource')
//     .loader('style-resources-loader')
//     .options({
//       patterns: [
//         path.resolve(__dirname, './src/styles/variables.less') // 需要全局导入的less
//       ]
//     })
// }