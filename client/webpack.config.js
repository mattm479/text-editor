const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Just Another Text Editor",
        favicon: "./favicon.ico",
        template: "./index.html"
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Text Editor that can be used on or off line',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
            filename: 'logo.png'
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
