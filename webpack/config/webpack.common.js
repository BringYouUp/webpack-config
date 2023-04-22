const { resolve } = require('path')
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const { PROJECT_ROOT, SOURCE_DIRECTORY, DEVELOPMENT, PRODUCTION } = require('../webpack-consts.js')
const { getAppropriateFilename } = require("../utils/index.ts")

const isDevelopment = process.env.NODE_ENV || process.env.NODE_ENV === DEVELOPMENT
	? true
	: false

const getDevelopmentAppropriateFilename = getAppropriateFilename(isDevelopment)

module.exports = {
	entry: {
		app: resolve(SOURCE_DIRECTORY, "./index.tsx"),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				}
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
		         	sourceMap: true, 
							modules: {
								localIdentName: "[name]__[local]"
							}
						}
					},
					{
						loader: "postcss-loader",
					},
					{
						loader: "sass-loader"
					},

				],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				exclude: /node_modules/,
				type: "asset/resource",
				generator: {
					filename: "img/[name][ext]"
				}
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve(PROJECT_ROOT, "index.html"),
			favicon: resolve(PROJECT_ROOT, "./src/img/title-icon.png"),
			title: 'webpack-config',
			minify: {
				collapseWhitespace: true
			},
		}),
		new MiniCssExtractPlugin({
			filename: getDevelopmentAppropriateFilename('css'),
		}),
	],
	resolve: {
		extensions: ["", ".js", ".jsx", ".ts", "tsx"],
		alias: {
			"@":SOURCE_DIRECTORY,
			"@assets": resolve(PROJECT_ROOT, "./src/assets/"),
			"@components": resolve(PROJECT_ROOT, "./src/components/"),
			"@consts": resolve(PROJECT_ROOT, "./src/consts/"),
			"@hooks": resolve(PROJECT_ROOT, "./src/hooks/"),
			"@pages": resolve(PROJECT_ROOT, "./src/components/pages/"),
			"@providers": resolve(PROJECT_ROOT, "./src/providers/"),
			"@reducers": resolve(PROJECT_ROOT, "./src/redux/"),
			"@services": resolve(PROJECT_ROOT, "./src/services/"),
			"@store": resolve(PROJECT_ROOT, "./src/store/"),
			"@styles": resolve(PROJECT_ROOT, "./src/styles/"),
			"@types": resolve(PROJECT_ROOT, "./src/types/"),
			"@utils": resolve(PROJECT_ROOT, "./src/utils/"),
		},
		modules: ["node_modules"]
	},
	stats: {
		children: true,
	},
}