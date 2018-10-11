var productionConfig = require('./webpack.production.config')

var developmentConfig = Object.assign(productionConfig, {
	mode: 'development',
	devtool: 'inline-module-source-map',
	devServer: {
		host: "0.0.0.0",
		port: 8888
  },
  output: {
		// dev server does not create an actual file on the local system, its a phantom file that 
		// is asscessable by a url

		// local path to output bundle to
		/* path: path.resolve(__dirname,'production-tool'), */

		// pulblic url where bundle will be accessable
		publicPath: '/',

		// bundle name (based on name specified in entry section)
		filename: '[name].bundle.js'
	}
})

module.exports = developmentConfig