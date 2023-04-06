const { resolve } = require('path')
const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const { PROJECT_ROOT, SOURCE_DIRECTORY, BUILD_DIRECTORY} = require('./webpack-consts.js')

const isDevelopment = process.env.NODE_ENV || process.env.NODE_ENV === "development" ? true : false
const mode = isDevelopment ? "development" : "production"

const getAppropriateFilename = ext => isDevelopment ? `[name].${ext}` : `[name].[hash:8].${ext}`

module.exports = {
	mode: mode ,
	entry: {
		app: resolve(SOURCE_DIRECTORY, "./index.tsx"),
	},
	output: {
		path: BUILD_DIRECTORY,
		filename: getAppropriateFilename('js'),
	},
	target: isDevelopment ? "web" : "browserslist",
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
		type: 'filesystem'
	},
	devtool: 'source-map',
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
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin({
			verbose: true,
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "index.html"),
			favicon: "./src/img/title-icon.png",
			title: 'webpack-config',
			minify: {
				collapseWhitespace: !isDevelopment ? true : false,
			},
		}),
		new MiniCssExtractPlugin({
			filename: getAppropriateFilename('css'),
		}),
	],
	optimization : {
   minimizer: [ new CssMinimizerPlugin() ],
   minimize: !isDevelopment
	},
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