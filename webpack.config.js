/* eslint-env node */
/* eslint-disable no-console */
const path = require('path');
const DirectoryNamedPlugin = require('directory-named-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;

module.exports = {
  devServer: {
    inline: true,
    stats: 'minimal'
  },
  devtool: 'cheap-module-eval-demo-map',
  entry: {
    style: './demo/style.css',
    client: './demo/client.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts'],
    alias: {
      components: path.resolve('./demo/components'),
      source: path.resolve('./source')
    },
    plugins: [
      new DirectoryNamedPlugin({
        honorIndex: true,
        include: [path.resolve('./demo/components')]
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new SuppressChunksPlugin([
      {
        name: 'style',
        match: /\.js(.map)?$/
      }
    ]),
    new HtmlPlugin({ template: 'demo/index.html' })
  ]
};
