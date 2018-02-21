var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  externals: {
      // require("angular") is external and available
      //  on the global var angular
      "angular": "angular"
  },
  module: {
    rules: [
      // all files with a `.ts` extension will be handled by `ts-loader`
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}
