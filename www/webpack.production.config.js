var path = require('path');
var node_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
	devtool: 'eval',
	entry: {
		shoppingList: [

			path.resolve(__dirname,'./scripts/index.js')
		]
	},

	resolve: {
		extensions: ['', '.js', '.jsx', '.json'],
	},
	output: {
		path: path.resolve(__dirname),
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