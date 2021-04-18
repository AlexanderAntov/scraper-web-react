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
              test: /\.js|\.jsx$/,
              exclude: /node_modules\/(?!(highcharts)\/).*/,
              use: ['babel-loader']
          }
      ]
  },
  performance: { hints: false }
};