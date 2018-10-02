const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: 'development',
  devServer: {
    publicPath: path.resolve(__dirname, 'build'),
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    compress: true,
    port: 9000
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
      }
    ]
  }
}