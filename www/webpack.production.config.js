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
				},
				// some of these loaders are for loading bootstrap's files
				{
					test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
					loader: 'url-loader?limit=10000&mimetype=application/font-woff'
				},
  			{
  				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
  				loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
  			},
      	{
      		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
      		loader: 'file-loader'
      	},
  			{
  				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
  				loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
  			}
		]
	}             
};