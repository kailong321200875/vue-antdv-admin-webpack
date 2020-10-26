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
var pages_config_1 = require("./pages.config");
var path = require("path");
var glob = require("glob");
// gzip压缩
var CompressionWebpackPlugin = require("compression-webpack-plugin");
// 代码压缩
var TerserPlugin = require("terser-webpack-plugin");
var projectName = process.env.PROJECT_NAME; // 获取package.json中scripts配置的变量
function resolve(dir) {
    return path.join(__dirname, dir);
}
var pages = {};
var entryPages = {};
glob.sync('./src/pages/**/main.ts').forEach(function (entry) {
    var chunk = entry.match(/\.\/src\/pages\/(.*)\/main\.ts/)[1];
    var curr = pages_config_1["default"][chunk];
    if (curr) {
        var pageItem = __assign(__assign({ entry: entry }, curr), { chunks: process.env.NODE_ENV === 'production'
                ? ['chunk-libs', 'chunk-elementUI', 'chunk-commons', 'runtime', chunk]
                : ['chunk-vendors', 'chunk-common', chunk] });
        pages[chunk] = pageItem;
    }
});
projectName ? entryPages[projectName] = pages[projectName] : entryPages = pages;
var vueConfig = {
    pages: entryPages,
    publicPath: './',
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: true,
    productionSourceMap: process.env.NODE_ENV !== 'production',
    outputDir: "dist-" + process.env.VUE_APP_CURENV,
    chainWebpack: function (config) {
        var types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(function (type) { return addStyleResource(config.module.rule('less').oneOf(type)); });
        // 防止多页面打包卡顿
        config.plugins["delete"]('named-chunks');
        // 修复HMR
        config.resolve.symlinks(true);
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
            .set('_pi', resolve('src/pages/index'))
            .set('_piv', resolve('src/pages/index/views'));
        // .set('_pd1', resolve('src/pages/demo1'))
        // .set('_pd1v', resolve('src/pages/demo1/views'))
        // 设置svg-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end();
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
            .end();
        // 图片压缩
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
            bypassOnDebug: true
        })
            .end();
        // 生产环境
        config.when(process.env.NODE_ENV === 'production', function (config) {
            // gzip压缩
            var productionGzipExtensions = ['html', 'js', 'css'];
            config.plugin('CompressionWebpackPlugin')
                .use(new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8,
                deleteOriginalAssets: false // 删除原文件
            }));
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
            }));
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after("html")
                .use('script-ext-html-webpack-plugin', [{
                    inline: /runtime\..*\.js$/
                }])
                .end();
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
                        name: 'chunk-elementUI',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'),
                        minChunks: 3,
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            });
            config.optimization.runtimeChunk('single');
            Object.keys(entryPages).forEach(function (page) {
                // 预加载
                config.plugin("preload-" + page).tap(function () { return [{
                        rel: 'preload',
                        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                        include: 'initial'
                    }]; });
                config.plugins["delete"]("prefetch-" + page);
            });
        });
    },
    configureWebpack: function (config) {
        devtool: process.env.NODE_ENV === 'development' ? 'source-map' : undefined;
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
};
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
        patterns: [
            path.resolve(__dirname, './src/styles/variables.less') // 需要全局导入的less
        ]
    });
}
module.exports = vueConfig;
