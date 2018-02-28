const path = require('path')
const webpack = require('webpack')
// 生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 清理 /dist 文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')

// 精简输出，添加一个能够删除未引用代码(dead code)的压缩工具
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	// JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码
	devtool: "inline-source-map",

    // entry: './src/index.js',
    entry: {
    	// app: './src/index.js',
    	// print: './src/print.js',
    	// another: './src/another-module.js'
    	// reactMain: './src/reactMain.js',
    	// reactMain2: './src/reactMain2.js',
    	// reactCommon: ['react'],
    	// reactdomCommon: ['react-dom'],
    	// vendor: ['./src/react1.js', './src/react2.js']
    	react1: './src/react1.js',
    	react2: './src/react2.js',
    	// react3: './src/react3.js',
    	vendor: ['react', 'react-dom']
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
			template:__dirname+"/index.html",
			filename:"index.html",
			// chunks:["vendor",'react1']
        }),
        new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin("css/[name].css"),

		// 防止重复,提取公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor' , // 指定公共 bundle 的名称
			// name: "common",
			// name: ["mainChunk","reactCommon","reactdomCommon"],
			// ( 公共chunk(commnons chunk) 的名称)

			// filename: "vendor.js",
			// ( 公共chunk 的文件名)
			
			// minChunks: 2,
			// minChunks: Infinity,
			// 在提取之前需要至少三个子 chunk 共享这个模块)

			// children: true,
			// 个 chunk 的多个子 chunk 会有公共的依赖。为了防止重复，可以将这些公共模块移入父 chunk。这会减少总体的大小，但会对首次加载时间产生不良影响。
			
			// async: true,
			// 与上面的类似，但是并非将公共模块移动到父 chunk（增加初始加载时间），而是使用新的异步加载的额外公共chunk。当下载额外的 chunk 时，它将自动并行下载。		

		}),

		//设置全局变量
		new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
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
		    {//处理jsx模块
		        test: /\.js[x]?$/, 
		        //不打包node_modules里面的模块
		        exclude: /node_modules/,
		        loader: 'babel-loader?presets[]=es2015&presets[]=react' 
		    }
    	]
    },

    resolve: {
    	modules: [
    		"node_modules",
    		__dirname + "/src"
    	],
    	extensions: ['.js'],
    	// alias: {}
    }

        // module: {
    // 	rules: [
  		// {
  		// 	test: /\.css$/,
  		// 	use: ['style-loader', 'css-loader']
  		// },
  		// {
  		// 	test: /\.(png|svg|jpg|gif)$/,
  		// 	use: ['file-loader']
  		// },
  		// {
  		// 	test: /\.(woff|woff2|eot|ttf|otf)$/,
  		// 	use: [
	   //          'file-loader'
	   //      ]
  		// },
  		// {
    //         test: /\.(csv|tsv)$/,
    //         use: [
    //             'csv-loader'
    //         ]
    //     },
    //     {
    //         test: /\.xml$/,
    //         use: [
    //             'xml-loader'
    //         ]
    //     }
    // 	]
    // }
}