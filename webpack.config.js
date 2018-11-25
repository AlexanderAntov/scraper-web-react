const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'app'),
  output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
  },
  devServer: {
      contentBase: path.resolve(__dirname, '.')
  },
  module: {
    rules: [
		{
		    test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader']
        }
	]
  }
};