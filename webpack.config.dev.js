const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		stats: 'errors-only',
		host: 'localhost',
		port: '1919',
		hot: true
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'style-loader',
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
