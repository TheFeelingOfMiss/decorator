const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.ts'
  },
  output: {
    path: Path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          'ts-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: 9100,
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, './public/index.html')
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      '@': Path.resolve(__dirname, './src')
    }
  }
}