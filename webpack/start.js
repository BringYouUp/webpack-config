const webpack = require("webpack");
const DevServer = require("webpack-dev-server")
const hot = require("webpack-hot-middleware")
const chalk = require("chalk");

const config = require("../webpack.config.js");
const { HOST, PORT } = require("../webpack-consts")

const compiler = webpack(config);

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

server.listen(PORT, HOST, () => {
	console.log(
		`${chalk.blueBright("SERVER LISTENING ON")} ${chalk.blueBright(`https://${HOST}:${PORT}`)}
		`
	)
})