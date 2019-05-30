/**
 * Common configuration file for webpack build
 */

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Paths are relative to the client folder, not to this config file, as this is where node is run from

const commonConfig = {
	context: path.resolve('./src'),
	entry: {
		app: './app'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { importLoaders: 2 }
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function() {
								return [
									require('precss'),
									require('autoprefixer')
								]
							}
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: 'file-loader'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: 'file-loader'
			}
		]
	},
	node: {
		fs: 'empty'
	},
	output: {
		filename: '[name].js',	// [name] resolves to name of bundle (e.g., authenticate, objects)
		publicPath: '/static/'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
			chunkFilename: '[name].css'
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: './template.html'
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', 'scss'],
		modules: [
			path.resolve('./src'),
			'node_modules'
		]
	},
	target: 'web'
}

module.exports = commonConfig