const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

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
        break
}

module.exports = merge(baseConfig, {
    mode: 'production',
	devtool: 'source-map',
	stats: 'errors-only',
	performance: {
		hints: false
	},
    entry: {
        index: ['babel-polyfill', './src/main.ts']
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
            test: /\.less$/,
            use: [
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
			chunks: 'all',
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    // eslint-disable-next-line no-useless-escape
                    test: /[\\\/]node_modules[\\\/]/,
                    // test: /(vue|vue-router)/,
                    priority: -10,
                    chunks: 'all'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2, // 同一文件被引用2次
                    priority: -20,
                    chunks: 'all',
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            // new UglifyJsPlugin({
            //     sourceMap: true,
            //     uglifyOptions: {
            //         ecma: 6,
            //         cache: true,
            //         parallel: true
            //     }
			// })
			new TerserPlugin({
				sourceMap: true,
				cache: true,
				parallel: true
			})
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css'
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
		}]),
		new HardSourceWebpackPlugin()
    ]
})
