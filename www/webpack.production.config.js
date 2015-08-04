var path = require('path');
var node_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
	devtool: 'eval',
	entry: [
		path.resolve(__dirname,'./scripts/index.js')
	],

	resolve: {
		extensions: ['', '.js', '.jsx', '.json'],

		alias: {
			'react': node_dir + '/react/react.min.js',
			'reflux': node_dir + '/reflux/dist/reflux.min.js',
			'bootstrap': node_dir + '/bootstrap/dist/js/bootstrap.min.js',
			'react-bootstrap': node_dir + '/react-bootstrap/dist/react-bootstrap.min.js'
		}
	},
	output: {
		path: path.resolve(__dirname,'build'),
		filename: 'bundle.js'
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