const path = require('path');
const webpack = require('webpack');
// 清理 /dist 文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry:  {
    main: './huancun/index.js',
    vendor: ['lodash']
  },

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),

		new HtmlWebpackPlugin({
      title: 'Caching',
			template:__dirname+"/../index.html",
			filename:"index.html",
			// chunks:["vendor",'react1']
    }),

    // 而 vendor 的 hash 发生变化是我们要修复的。幸运的是，可以使用两个插件来解决这个问题。
    // webpack.NamedModulesPlugin，webpack.HashedModuleIdsPlugin
    new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })

  ]
};