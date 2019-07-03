const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'app'),
  output: {
      path: __dirname + '/build',
      publicPath: '/',
      filename: 'bundle.js'
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules\/(?!(highcharts)\/).*/,
              loaders: ['babel-loader']
          }
      ]
  }
};