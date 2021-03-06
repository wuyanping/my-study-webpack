const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
	devtool: 'source-map',
  	plugins: [
  	 	new UglifyJSPlugin({
  	 		sourceMap: true
  	 	}),

  	 	// 指定环境
  	 	// NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量
  	 	// process.env.NODE_ENV === 'production'
      // 任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量，所以以下检查也是有效的： 
  	 	new webpack.DefinePlugin({
          	'process.env.NODE_ENV': JSON.stringify('production')
        })
  	]
})