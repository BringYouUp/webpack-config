const { resolve } = require('path')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { merge } = require("webpack-merge")

const commonConfig = require("./webpack.common.js") 
const { PROJECT_ROOT, SOURCE_DIRECTORY, BUILD_DIRECTORY, PRODUCTION } = require('../webpack-consts.js')
const { getAppropriateFilename } = require("../utils/index.ts")

const getDevelopmentAppropriateFilename = getAppropriateFilename(false)

module.exports = merge(commonConfig, {
	mode: PRODUCTION,
	entry: {
		app: resolve(SOURCE_DIRECTORY, "./index.tsx"),
	},
	output: {
		path: BUILD_DIRECTORY,
		filename: getDevelopmentAppropriateFilename('js'),
	},
	target: "browserslist",
	cache: {
		type: false
	},
	plugins: [
		new CleanWebpackPlugin({
			verbose: true,
		}),
	],
	optimization : {
   minimizer: [ new CssMinimizerPlugin() ],
   minimize: true
	},
}) 