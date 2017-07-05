const path = require('path');
const webpack = require('webpack');

const entries = {
  'merge-files': [
    path.resolve(__dirname, 'src', 'polyfills.js'),
    path.resolve(__dirname, 'src', 'merge-files.js'),
  ],
};

module.exports = {
  entry: entries,
  output: {
    filename: '[name].jsx',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
