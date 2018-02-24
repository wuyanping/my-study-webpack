var webpack = require("webpack");
// //压缩代码
//生成CSS文件
var E = require("extract-text-webpack-plugin");
//生成HTML
var html = require("html-webpack-plugin")
//删除文件
var clean = require('clean-webpack-plugin');

var webpack = require("webpack");
module.exports = {
	// entry:"./app/app.js",//入口
	entry:{//多个入口文件
		bundle:"./app/app.js",
		bundle2:"./app/app2.js",
	},
	output:{//输出
		path:__dirname+"/www",
		filename:"js/[name].js"
	},
	plugins:[//插件
		// 提取公共部分
		new webpack.optimize.CommonsChunkPlugin({
			name:"common"
		}),
		new E({
			filename:"css/[name].css",
			allChunks: true//合并所有样式文件
		}),
		new clean(["www"]),
		new html({
			title:"首页",
			template:__dirname+"/app/index.html",
			filename:"index.html",
			chunks:["common",'bundle']
		}),
		//设置全局变量
		new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        })//直接加载到全局不需要require()
		// new webpack.optimize.UglifyJsPlugin()//压缩代码
	],
	module:{//配置打包所需要用到的模块
		loaders:[
			{//处理样式模块
				test:/\.css$/,
				// loader:"style-loader!css-loader!less-loader"				
				loader:E.extract({
					fallback:"style-loader",
					use:["css-loader","less-loader"]
				})
			},
			{//处理图片模块
				test:/\.(png|jpe?g)$/,		
				loader:"url-loader?limit=1&name=images/[name].[ext]"
			},
			{//处理jsx模块
		        test: /\.js[x]?$/, 
		        //不打包node_modules里面的模块
		        exclude: /node_modules/,
		        loader: 'babel-loader?presets[]=es2015&presets[]=react' 
		    }
		]
	},
	// webpack-dev-server
	devServer: {
	  contentBase:"./www",
      inline: true,
      port: 8088
    },
	resolve:{           
        // root: __dirname+'/app/js',//require查找module的话从这里开始查找            
        modules:[
        	"node_modules",
        	__dirname+'/app/js',
        	__dirname+'/app/images',
        ],
        extensions: ['.js', '.css',".less"],//require模块可以省略不写后缀名            
        alias: {//后续直接 require('style') 即可
            style : './css',
        }
    }
}
