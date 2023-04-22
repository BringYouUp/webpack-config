const { resolve } = require('path')
const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { merge } = require("webpack-merge")

const commonConfig = require("./webpack.common.js") 
const { DEVELOPMENT, PROJECT_ROOT, SOURCE_DIRECTORY, BUILD_DIRECTORY} = require('../webpack-consts.js')
const { getAppropriateFilename } = require("../utils/index.ts")

const getDevelopmentAppropriateFilename = getAppropriateFilename(true)

module.exports = merge(commonConfig, {
	mode: DEVELOPMENT,
	target: "web",
	watchOptions: {
		ignored: /node_modules/,
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "/public/"),
		},
		// static: true,
		// historyApiFallback: true,
		// port: 9750,
		// open: true,
		// client: {
		// 	overlay: true,
		// },
	},
	cache: {
		type: "filesystem"
	},
	devtool: 'source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: getDevelopmentAppropriateFilename('css'),
		}),
	],
})