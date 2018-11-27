const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const config = require('./config/config.json');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    vendor: ['babel-polyfill', 'react', 'react-dom'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['stage-0']
        }
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(ttf|eot|svg|jpg|png|woff)$/,
        loader: "url-loader"
      },
    ],

  },
  externals: {
    'Config': JSON.stringify(config[process.env.ENV || 'production'])
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './index.html' },
      { from: './bootloader.js' }
    ]),
    new ManifestPlugin()
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Pragma,Cache-Control',
    }
  }
};
