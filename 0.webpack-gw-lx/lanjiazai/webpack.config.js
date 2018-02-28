const path = require('path');
// 清理 /dist 文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './lanjiazai/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    	new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
            title:"首页",
			template:__dirname+"/../index.html",
			filename:"index.html",
			// chunks:["vendor",'react1']
        }),
    ]
};