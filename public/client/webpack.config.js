'use-strict';

var path = require('path');
var webpack = require('webpack');
var commonsPlugin =
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: true,
  __APIURL__: "'http://192.168.2.7:6543/'",
});

module.exports = {
  context: __dirname,

  entry: {
    app: [
    'webpack-dev-server/client?http://127.0.0.1:8080',
      'webpack-hot-middleware/client',
      './index'
    ]
  },

  output: {
    path: './build',
    filename: '[name].js'
  },

  module: {

    loaders: [
      {
        loader: 'babel',
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {
          optional: ['runtime'],
          stage: 0
        }
      },
      { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&" +
          "includePaths[]=" +
            encodeURIComponent(path.resolve(__dirname, "./scss")) + "&" +
          "includePaths[]=" +
            encodeURIComponent(path.resolve(__dirname, "./another-folder"))
      },

    ]
  },
  resolve: {
    modulesDirectories: ['./bower_components', 'node_modules'],
    root: path.resolve(__dirname, './')
  },
  plugins: [
    commonsPlugin,
    definePlugin,
    new webpack.NoErrorsPlugin()
  ],
  debug: true,

  devtool: 'eval',

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}