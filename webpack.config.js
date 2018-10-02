const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 3000,
    historyApiFallback: true,
    compress: true
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