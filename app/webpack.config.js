// let HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');

// module.exports = {
// 	mode: 'development',
// 	module: {
// 		rules: [
// 			{
// 				test: /\.jsx?$/,
// 				loader: 'babel-loader',
// 			},
// 			{
// 				test: /\.less$/,
// 				use: [
// 					{ loader: 'style-loader' },
// 					{ loader: 'css-loader' },
// 					{ loader: 'less-loader' },
// 				],
// 			},
// 		],
// 	},
// };

module.exports = {
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader'
					}
				]
			}
		]
	}
};
