'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

// const TerserPlugin = require('terser-webpack-plugin');

// module.exports = {
//   mode: 'production',
//   optimization: {
//     minimizer: [
//       new TerserPlugin({
//         /* additional options here */
//       }),
//     ],
//   },
// };

module.exports = {
  // devtool: 'cheap-module-source-map',
  entry: ['babel-polyfill', path.join(__dirname, 'app/index.js')],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CompressionPlugin({
      test: /\.js$/,
      deleteOriginalAssets: true,
    }),
  ],
  eslint: {
    configFile: '.eslintrc',
    failOnWarning: false,
    failOnError: false,
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json?$/,
        loader: 'json-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&localIdentName=[local]!sass',
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|otf|eot|svg|png)(\?[a-z0-9#=&.]+)?$/,
        loader: 'file',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};