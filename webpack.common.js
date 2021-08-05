const path = require('path');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const project = require('./project');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    symlinks: true,
    cacheWithContext: false,
    plugins: [
      new TsConfigPathsPlugin({}),
    ],
  },
  optimization: {
    usedExports: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'source-map-loader'
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        include: path.resolve(__dirname, 'src/assets/fonts'),
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts'
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/,
        include: path.resolve(__dirname, 'src/assets/images'),
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images'
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[contenthash].css',
      chunkFilename: 'css/[contenthash].css',
      ignoreOrder: true
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: project.title,
      favicon: project.favicon,
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }]
    }),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules'
    })
  ]
};
