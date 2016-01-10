var WriteFilePlugin = require('write-file-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
module.exports = {
  entry: './app/assets/javascripts/components',
  output: {
    path: "./app/assets/javascripts/dist/",
    filename: "bundle.js"
  },
  devServer: {
    outputPath: "./app/assets/javascripts/dist/"
  },
  plugins: [
    new WriteFilePlugin(),
    new LiveReloadPlugin()
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', "stage-0"]
        }
      },
    ]
  }
};
