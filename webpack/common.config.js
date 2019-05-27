/**
 * Common configuration file for webpack build
 */

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractSass = new ExtractTextPlugin({ filename: '[name].css' })	// [name] resolves to name of bundle (e.g., authenticate, objects)

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
				use: extractSass.extract({
					use: [
						{
							loader: 'css-loader',
							options: { importLoaders: 1 }
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
					],
					fallback: 'style-loader'
				})
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
		new webpack.NoEmitOnErrorsPlugin(),
		extractSass,
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: './template.html'
		})
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			path.resolve('./src'),
			'node_modules'
		]
	},
	target: 'web'
}

module.exports = commonConfig