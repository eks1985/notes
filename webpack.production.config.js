module.exports = {
  entry: './app/assets/javascripts/components',
  output: {
    path: "./app/assets/javascripts/dist/",
    filename: "bundle.js"
  },
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
