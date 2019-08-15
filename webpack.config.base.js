const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const EslintFriendlyFormatter = require('eslint-friendly-formatter')

module.exports = {
    entry: {
        index: './src/main.ts'
    },
    output: {
        // publicPath: 'dist',
        filename: '[name].[hash:7].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue', '.json'],
        alias: {
            // vue: 'vue/dist/vue.js',
            'vue$': 'vue/dist/vue.esm.js',
            '@assets': path.join(__dirname, 'src/assets')
        }
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [path.resolve(__dirname, 'src')],
            options: {
                formatter: EslintFriendlyFormatter
            }
        }, {
            test: /\.(js)$/,
            use: [{
				loader: 'thread-loader',
				options: {
					workers: 3
				}
			},
				'babel-loader'
			],
            include: [path.join(__dirname, 'src')],
            exclude: [path.join(__dirname, 'node_modules')]
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: { /* ... */ }
		}, {
			test: /\.(ts)?$/,
			exclude: /node_modules/,
			use: [{
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			}]
		}, {
			test: /\.(ts)?$/,
			enforce: 'pre',
			exclude: /node_modules/,
			use: [{
				loader: path.join(__dirname, 'pre-tslint-loader.js')
			}]
		},
		{
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: path.posix.join('./', 'img/[name].[hash:7].[ext]')
                }
            }, {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 75
                    },
                    optipng: {
                        enabled: false
                    },
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false
                    }
                }
            }]
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join('./', 'media/[name].[hash:7].[ext]')
                }
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join('./', 'fonts/[name].[hash:7].[ext]')
                }
            }
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            hash: false,
            favicon: './static/favicon.ico',
            title: 'template-vue-ts',
            template: './static/template.ejs',
            filename: 'index.html'
        }),
        new PreloadWebpackPlugin({
            // rel: 'prefetch',
            rel: 'preload',
            include: 'initial'
        })
    ]
}
