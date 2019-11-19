const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mode = process.env.NODE_ENV
const dev = mode === 'development'

const alias = { svelte: path.resolve('node_modules', 'svelte') }
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html']
const mainFields = ['svelte', 'module', 'browser', 'main']

const { preprocess } = require('./svelte.config')

module.exports = {
  stats: 'minimal',
  entry: {
    bundle: path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: '/',
  },
  resolve: { alias, extensions, mainFields },
  module: {
    rules: [
      {
        test: /\.(svelte|html)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            preprocess,
            dev,
            hydratable: true,
            hotReload: true,
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: dev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  mode,
  plugins: [
    dev && new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.browser': true,
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ].filter(Boolean),
  devtool: dev && 'inline-source-map',
  devServer: {
    hot: true,
    watchContentBase: true,
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    proxy: {
      '/api': 'http://localhost:4000',
    },
    historyApiFallback: {
      index: 'index.html',
    },
  },
}
