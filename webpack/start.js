const webpack = require("webpack");
const DevServer = require("webpack-dev-server")
const hot = require("webpack-hot-middleware")
const chalk = require("chalk");

const devConfig = require("./config/webpack.dev.js");
const { HOST, PORT } = require("../webpack-consts")

const compiler = webpack(devConfig);

const server = new DevServer({
	host: HOST,
	port: PORT,
	hot: true,
	open: true,
	liveReload: true,
	historyApiFallback: true,
	open: true,
	client: {
		logging: "none",
		overlay: true,
	},
	// onAfterSetupMiddleware: (app) => {
	// 	app.use (
	// 		hot(compiler, {
	// 			log: false
	// 		})
	// 	)
	// }
}, compiler)

server.start(PORT, HOST, () => {
	console.log(
		`${chalk.blueBright("SERVER LISTENING ON")} ${chalk.blueBright(`https://${HOST}:${PORT}`)}
		`
	)
})