'use strict';

var webpack = require('webpack');
var path = require('path');

var config = {
  entry:  {
       app: './index.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, './src/js'),
    },
    devtool: "source-map",
    plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery'",
          "window.$": "jquery"
      })
    ],
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif)$/i,
          loader:"file-loader",
          query:{
            name:'[name].[ext]',
            outputPath:'images/'
            //the images will be emmited to public/assets/images/ folder
            //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png);
          }
        },
        {
          test: /\.css$/,
          loaders: ["style-loader","css-loader"]
        }
      ]
    },
    resolve: {
        alias: {
            'fancybox': './node_modules/fancybox/dist/js/jquery.fancybox.js'  // relative to node_modules
        }
    }
};

module.exports = config;
