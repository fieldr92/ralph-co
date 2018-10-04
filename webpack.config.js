const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ["@babel/polyfill", './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
    historyApiFallback: true,
    compress: true
  },
  resolve: {
    alias: {
      createjs: 'createjs/builds/1.0.0/createjs.js'
    }
  },
  module: {
    rules: 
    [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader' }
        ]
      },
      {
        test: /node_modules[/\\]createjs/,
        loaders: [
          'imports-loader?this=>window',
          'exports-loader?window.createjs'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RalphCO',
      template: 'src/index.html',
      path: path.resolve(__dirname, 'build'),
      filename: 'index.html'
    }),
    new CopyWebpackPlugin(
      [
        {
          from: './src/data/data.json',
          to: path.resolve(__dirname, 'build/data/data.json'),
        },
        {
          from: './src/assets',
          to: path.resolve(__dirname, 'build/assets')
        }
      ]
    )
  ]
}