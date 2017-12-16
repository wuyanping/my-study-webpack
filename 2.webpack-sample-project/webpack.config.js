const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {

	// 只应该开发阶段使用它
	devtool: 'eval-source-map',

	entry: __dirname + '/app/main.js',

	output: {

		//打包后的文件存放的地方
		path: __dirname + '/bulid',

		//打包后输出文件的文件名
		filename: 'bundle.js'
	},

	devServer: {

		//本地服务器所加载的页面所在的目录
		contentBase: "./public",

		// 如果设置为true，所有的跳转将指向index.html
		historyApiFallback: true,

		// 当源文件改变时会自动刷新页面
		inline: true,

		port: 8088,

        hot: true
	},

	module: {
		rules: [

			// 允许你使用ES6以及JSX的语法
			{
				// 一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
                test: /(\.jsx|\.js)$/,


                use: {
                	// loader的名称（必须）
                    loader: "babel-loader",

                    // webpack会自动调用.babelrc里的babel配置选项）
                    // options: {
                    //     presets: [
                    //         "es2015", "react"
                    //     ]
                    // }
                },

                // include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
                exclude: /node_modules/

                // query：为loaders提供额外的设置选项（可选）
            },

            {
            	test: /\.css$/,

            	// 请注意这里对同一个文件引入多个loader的方法。
            	use: [
            		// style-loader将所有的计算后的样式加入页面中
            		{
            			loader: "style-loader"
            		},

            		// css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能
            		{
            			loader: "css-loader",
            			options: {
            				modules: true
            			}
            		},

            		// 自动添加适应不同浏览器的CSS前缀。
            		{
            			loader: 'postcss-loader'
            		}
            	]
            }
		]
	},

	plugins: [

        // 给打包后代码添加文本插件。
		new webpack.BannerPlugin("吴燕萍学习webpack的例子！"),

        // 依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
        new htmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),

        // 它允许你在修改组件代码后，自动刷新实时预览修改后的效果
        // 1. 在webpack配置文件中添加HMR插件；
        // 2. 在Webpack Dev Server中添加“hot”参数；
        new webpack.HotModuleReplacementPlugin()
	]

}

// 注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。