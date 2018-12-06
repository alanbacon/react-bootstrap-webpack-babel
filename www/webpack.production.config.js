var path = require('path');
var node_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
	mode: 'production',
	entry: {
		shoppingList: path.resolve(__dirname,'./scripts/index.jsx')
	},

	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
	output: {
		path: path.resolve(__dirname),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{ 	
				test: /\.jsx?$/, 
        		exclude: /node_modules/,
				use: 'babel-loader'
			},
			{ 	
				test: /\.css$/, 
				use: [
					{ 
						loader: 'style-loader' 
					}, 
					{ 
						loader: 'css-loader'
					}
				] 
			}
		]
	}             
};