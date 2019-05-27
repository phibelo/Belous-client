const path = require('path')

const commonConfig = require('./common.config')

const devConfig = Object.assign(commonConfig, {
	mode: 'development',
	devtool: 'eval',
	output: Object.assign(commonConfig.output, { path: path.resolve('./build/static') })
})

module.exports = devConfig