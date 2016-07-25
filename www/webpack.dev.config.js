var path = require('path');
var node_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
	devtool: 'eval',
	entry: {
		shoppingList: path.resolve(__dirname,'./scripts/index.js')
	},

    devServer: {
		port: 8888
    },

	resolve: {
		extensions: ['', '.js', '.jsx', '.json'],

		alias: {
			//'react': node_dir + '/react/react.js',
			//'reflux': node_dir + '/reflux/src/index.js',
			//'bootstrap': node_dir + '/bootstrap/dist/js/bootstrap.js',
			//'react-bootstrap': node_dir + '/react-bootstrap/dist/react-bootstrap.js'
		}
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
	},

	module: {
		loaders: [
				{ test: /\.jsx$/, loader: 'jsx-loader'},
				{ test: /\.json$/, loader: 'json-loader'},
				{ test: /\.css$/, loader: 'style-loader!css-loader' },
				{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=200000' }
		]
	}             
};