const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
// 生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 清理 /dist 文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')

// 精简输出，添加一个能够删除未引用代码(dead code)的压缩工具
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const ExtractTextPlugin = require("extract-text-webpack-plugin")
// const dqPath = path.resolve(__dirname, 'src')

const vueConfig = require('./vue-loader.config')

function resolve (dir) {
  return path.join(__dirname, dir)
}

let config = {

    // entry: './css/index.js',
    entry: {
    	main: './src/index.js',
    	vendor: ['jquery', 'vue', 'vue-router', 'element-ui']
    },

    output: {
      // filename: 'bundle.js',
      filename: '[name].js',
      path: resolve('dist'),
      // publicPath: '/'
    },


    plugins: [
    	new CleanWebpackPlugin(['dist']),
    	// new UglifyJSPlugin(),

        // 所有的 bundle 会自动添加到 html 中
        new HtmlWebpackPlugin({
            title:"首页",
			template: resolve('src') + '/index.html',
			filename:"index.html",
			// chunks:["vendor",'react1']
        }),
        new webpack.NamedModulesPlugin(),
		// new ExtractTextPlugin("css/[name].[hash]css"),
        new ExtractTextPlugin({filename:'[name].css', allChunks: true, disabled: true}),   // 

		// 防止重复,提取公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor' , // 指定公共 bundle 的名称似，但是并非将公共模块移动到父 chunk（增加初始加载时间），而是使用新的异步加载的额外公共chunk。当下载额外的 chunk 时，它将自动并行下载。		

		}),

		//设置全局变量
		new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            
            Vue: 'vue',
            'window.Vue': 'vue'
        }),//直接加载到全局不需要require()
    ],

    module: {
    	rules: [
            // {
            //     test：用于匹配处理文件的扩展名的表达式，这个选项是必须进行配置的；
            //     use：loader名称，就是你要使用模块的名称，这个选项也必须进行配置，否则报错；
            //     include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
            //     query：为loaders提供额外的设置选项（可选）。
            // },
    		{
    			test: /\.css$/,
    			// use: ['style-loader!css-loader!postcss-loader']
    			use: ExtractTextPlugin.extract({
    				fallback: 'style-loader',
    				use: ["css-loader?importLoaders=1", 'postcss-loader']
    			})
    		},
    		{
		        test: /\.less$/i,
                // use: ['style-loader?importLoaders=1!css-loader!less-loader!postcss-loader']
		        use: ExtractTextPlugin.extract({
    				fallback: 'style-loader',
    				use: [ 'css-loader?importLoaders=1', 'less-loader', 'postcss-loader' ]
    			})
		    },
		    {
		        test: /\.scss$/i,
                // use: ['style-loader?importLoaders=1!css-loader!sass-loader!postcss-loader']
		        use: ExtractTextPlugin.extract({
    				fallback: 'style-loader',
    				use: [ 'css-loader?importLoaders=1', 'sass-loader', 'postcss-loader']
    			})
		    },
		    {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
		    {//处理jsx模块
		        test: /\.js[x]?$/, 
                include: __dirname,
		        //不打包node_modules里面的模块
		        exclude: /node_modules/,
		        use: {
                    // loader的名称（必须）
                    loader: "babel-loader",

                    // webpack会自动调用.babelrc里的babel配置选项）
                    // options: {
                    //     presets: [
                    //         "es2015", "react"
                    //     ]
                    // }
                }
		    }
    	]
    },

    resolve: {
    	modules: [
    		"node_modules",
    		__dirname
    	],
    	extensions: ['.js', '.vue', '.scss'],
    	alias: {
            'vue$': 'vue/dist/vue',
            '@': resolve('src'),
            'projectRoot': __dirname,
            "COMPONENTS": path.resolve(__dirname, 'src', 'assets', 'js', 'components'),
            "CONFIG": path.resolve(__dirname, 'src', 'assets', 'js', 'config'),
            "PAGE": path.resolve(__dirname, 'src', 'assets', 'js', 'page'),
            "ROUTER": path.resolve(__dirname, 'src', 'assets', 'js', 'router'),
            "VIEWS": path.resolve(__dirname, 'src', 'assets', 'js', 'views'),
            "SASS": path.resolve(__dirname, 'src', 'assets', 'SASS'),
        }
    }
}

if (process.env.NODE_ENV === 'dev') {
    config = merge(config, {
        // JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码
        devtool: "inline-source-map",

        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('dev')
            }),
            new webpack.HotModuleReplacementPlugin()
        ],

        devServer: {
            contentBase: './dist',
            historyApiFallback: true,
            hot: true,
            inline: true
            // proxy: {
            //     '/**': {
            //         changeOrigin: true,
            //         target: env.app_url,
            //         secure: false
            //     }
            // }
        }
    })
} else {
    // const CompressionWebpackPlugin = require('compression-webpack-plugin')
    // config = merge(config, {
    //     plugins: [
    //         // minify JS
    //         // new webpack.optimize.UglifyJsPlugin({
    //         //     compress: {
    //         //         warnings: false
    //         //     }
    //         // }),
    //         new UglifyJSPlugin(),
    //         new CompressionWebpackPlugin({
    //             asset: '[path].gz[query]',
    //             algorithm: 'gzip',
    //             test: /\.js$|\.css$|\.html$/,
    //             threshold: 10240,
    //             minRatio: 0.8
    //         })
    //     ]
    // })
}

module.exports = config
