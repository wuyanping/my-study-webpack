var webpack = require('webpack')
module.exports = {
	entry: './runoob1.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	plugins: [
		// 用于在文件头部输出一些注释信息。
		new webpack.BannerPlugin("吴燕萍学习webpack的例子！")
	]
}
