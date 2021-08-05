const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: ['./src/index.tsx'],
    vendor: ['react', 'react-dom']
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8361
  },
  stats: {
    colors: true,
    chunkGroups: true,
    errorDetails: false,
    reasons: false,
    version: false,
    warnings: false,
    assets: false,
    builtAt: false,
    modules: false,
    children: false,
  },
});
