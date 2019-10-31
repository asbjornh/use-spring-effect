/* eslint-env node */
/* eslint-disable no-console */
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    inline: true,
    stats: 'minimal'
  },
  devtool: 'cheap-module-eval-demo-map',
  entry: {
    style: './demo/style.css',
    client: './demo/client.ts'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlPlugin({ template: 'demo/index.html' })
  ]
};
