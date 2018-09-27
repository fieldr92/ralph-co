const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
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