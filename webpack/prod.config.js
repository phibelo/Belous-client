const path = require('path')
const webpack = require('webpack')

const commonConfig = require('./common.config')

const prodConfig = Object.assign(commonConfig, {
	mode: 'production',
	output: Object.assign(commonConfig.output, { path: path.resolve('./prod/static') }),
	plugins: commonConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') }
		})
	)
})

module.exports = prodConfig