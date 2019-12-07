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
    // NOTE @terminal: removed since dedupe plugin is deprecated
    // https://webpack.js.org/migrate/3/#dedupeplugin-has-been-removed
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // updated for webpack 4
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CompressionPlugin({
      test: /\.js$/,
      deleteOriginalAssets: true,
    }),
  ],
  // NOTE @terminal: moving next blog to inside the loader 
  // https://github.com/webpack-contrib/eslint-loader
  // eslint: {
  //   configFile: '.eslintrc',
  //   failOnWarning: false,
  //   failOnError: false,
  // },
  module: {
    // NOTE @terminal: moving preloaders to loaders with 'pre' property
    // https://github.com/webpack-contrib/eslint-loader/issues/113
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint',
    //   },
    // ],
    rules: [
      {
        enforce:'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc',
          failOnWarning: false,
          failOnError: false,
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // NOTE @terminal: commenting this out because json files works by default in webpack 4
      // https://webpack.js.org/loaders/json-loader/
      // {
      //   test: /\.json?$/,
      //   exclude: /node_modules/,
      //   loader: 'json-loader',
      // },
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