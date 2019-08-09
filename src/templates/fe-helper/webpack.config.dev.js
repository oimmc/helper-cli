const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
        publicPath: '/'
    },
	devServer: {
		historyApiFallback: true,
		host: 'localhost',
		port: '1919',
		hot: true,
		open: false,
		proxy: {
            '/api': {
                target: 'http://localhost:2019',
                ws: true,
                changeOrigin: true
            }
        }
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'vue-style-loader',
				'css-loader'
			]
		}, {
			test: /\.less$/,
			use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
})
