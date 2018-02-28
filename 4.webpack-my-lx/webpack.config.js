// 使用环境变量配置

const path = require('path')
// "start": "webpack --env.prod"
// const config = env => {
// 	console.log(env)
// 	return {
// 		//入口
// 		// entry: './src/assets/js/index.js',
// 		entry: {
// 			bundle: './src/assets/js/index.js'
// 		},
// 		output: {
// 			path: path.resolve(__dirname, 'build'),
// 			filename: 'js/bundle.js',
// 			publicPath: "/assets/"
// 		}
// 	}
// }
console.log(process.env.NODE_ENV)
const config = {
	//入口
	// entry: './src/assets/js/index.js',
	entry: {
		bundle: process.env.NODE_ENV === 'dev' ? './src/assets/js/index.js' : './src/assets/js/other.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'js/bundle.js',
		publicPath: "/assets/"
	}
}
module.exports = config