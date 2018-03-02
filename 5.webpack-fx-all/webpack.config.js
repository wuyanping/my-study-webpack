const path = require('path')
const webpack = require('webpack')
// 生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 清理 /dist 文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')

// 精简输出，添加一个能够删除未引用代码(dead code)的压缩工具
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const ExtractTextPlugin = require("extract-text-webpack-plugin")

const dqPath = path.resolve(__dirname, 'css')

module.exports = {
	// JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码
	devtool: "inline-source-map",

    // entry: './css/index.js',
    entry: {
    	main: './css/index.js',
    	vendor: ['jquery', 'vue', 'vue-router']
    },

    output: {
      // filename: 'bundle.js',
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      // publicPath: '/'
    },

    plugins: [
    	new CleanWebpackPlugin(['dist']),

    	// new UglifyJSPlugin(),

        // 所有的 bundle 会自动添加到 html 中
        new HtmlWebpackPlugin({
            title:"首页",
			template: dqPath + '/index.html',
			filename:"index.html",
			// chunks:["vendor",'react1']
        }),
        new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin("css/[name].css"),

		// 防止重复,提取公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor' , // 指定公共 bundle 的名称似，但是并非将公共模块移动到父 chunk（增加初始加载时间），而是使用新的异步加载的额外公共chunk。当下载额外的 chunk 时，它将自动并行下载。		

		}),

		//设置全局变量
		new webpack.ProvidePlugin({
            Vue: 'vue',
            jquery: 'jquery',
            $: 'jquery',
            jQuery: 'jquery'
        }),//直接加载到全局不需要require()
    ],

    devServer: {
    	contentBase: './dist',
    	hot: true
    },

    module: {
    	rules: [
    		{
    			test: /\.css$/,
    			// use: ['style-loader', 'css-loader']
    			use: ExtractTextPlugin.extract({
    				fallback: 'style-loader',
    				use: "css-loader"
    			})
    		},
    		{
		        test: /\.less$/i,
		        use: ExtractTextPlugin.extract({
    				fallback: 'style-loader',
    				use: [ 'css-loader', 'less-loader' ]
    			})
		    },
		    {
		        test: /\.sass$/i,
		        use: ExtractTextPlugin.extract({
    				fallback: 'style-loader',
    				use: [ 'css-loader', 'sass-loader' ]
    			})
		    },
		    {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
		    {//处理jsx模块
		        test: /\.js[x]?$/, 
		        //不打包node_modules里面的模块
		        exclude: /node_modules/,
		        loader: 'babel-loader?presets[]=es2015' 
		    }
    	]
    },

    resolve: {
    	modules: [
    		"node_modules",
    		__dirname
    	],
    	extensions: ['.js', '.css', '.sass', '.less', '.vue'],
    	// alias: {}
    }
}