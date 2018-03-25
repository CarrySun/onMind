/* eslint-disable */
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

// modify start
var glob = require('glob'); //这里的glob是nodejs的glob模块，是用来读取webpack入口目录文件的
var entries = getEntry('./src/pages/**/*.js'); // 获得入口js文件

function getEntry(globPath) {
    var entries = {},
        basename, tmp, pathname;
    var files = glob.sync(globPath);

    // 去除store结尾的js
    files = files.filter(function(item) {
        return !(/Store.js$/.test(item))
    })

    files.forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
        entries[pathname] = entry;
    });
    return entries;
}
// modify end

module.exports = {
    // entry: {
    //   app: './src/main.js'
    // },
    entry: entries,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            // {
            //   test: /\.(js|vue)$/,
            //   loader: 'eslint-loader',
            //   enforce: 'pre',
            //   include: [resolve('src'), resolve('test')],
            //   options: {
            //     formatter: require('eslint-friendly-formatter')
            //   }
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
