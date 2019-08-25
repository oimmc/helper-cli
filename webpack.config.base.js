const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const EslintFriendlyFormatter = require('eslint-friendly-formatter')

function assetsPath(_path) {
    return path.posix.join(process.env.NODE_ENV === 'development' ? './' : '/', _path)
}

module.exports = {
    entry: './src/index.js',
    output: {
        // publicPath: 'dist',
        filename: '[name].[hash:7].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            assets: path.join(__dirname, 'src/assets')
        }
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [path.resolve(__dirname, 'src')],
            options: {
                formatter: EslintFriendlyFormatter
            }
        }, {
			test: /\.js|jsx$/,
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
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024 * 1,
                    name: assetsPath('img/[name].[hash:7].[ext]')
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
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: false,
            favicon: './static/favicon.ico',
            title: 'template-react',
            template: './static/template.ejs',
            filename: 'index.html'
        }),
        new PreloadWebpackPlugin()
    ]
}
