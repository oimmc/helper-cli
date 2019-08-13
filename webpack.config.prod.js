const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

let baseUrl = ''

switch (process.env.NODE_ENV) {
    case 'production':
        baseUrl = '/'
        break
    case 'lan':
        baseUrl = 'www.baidu.com'
        break
    default:
        baseUrl = ''
        break;
}

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        index: ['babel-polyfill', './src/main.js']
    },
    output: {
        publicPath: baseUrl,
        // chunkFilename: '[name][chunkhash].js',
        // chunkFilename: '[name].[chunkhash].js',
        // chunkFilename: '[name].js?id=[chunkhash]',
        filename: 'js/[name].[hash:7].js',
        path: resolve('dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        minimize: true
                    }
                },
                'css-loader'
            ]
        }, {
            test:/\.less$/,
            use:[
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
        }]
    },
    optimization: {
        runtimeChunk: {
            name: entrypoint => `runtimechunk~${entrypoint.name}`
        },
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\\/]node_modules[\\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    ecma: 6,
                    cache: true,
                    parallel: true,
                    cache: true
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:7].css',
            chunkFilename: 'css/[name].[hash:7].css'
        }),
        new FriendlyErrorsWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'static'),
            to: path.join(__dirname, '.', 'dist', 'static'),
            toType: 'dir',
            ignore: [
                '.DS_Store',
                '.gitkeep',
                'template.ejs'
            ]
        }])
    ]
})