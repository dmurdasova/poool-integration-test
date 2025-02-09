const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: ['babel-loader'],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
      minify: {
        caseSensitive: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseBooleanAttributes: true,
        removeCommentsFromCDATA: true,
        minifyJS: true,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[fullhash].js',
    publicPath: '/',
  },
  devServer: {
    port: 8888,
    host: 'localhost',
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};
