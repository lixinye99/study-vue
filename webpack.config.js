const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports={
	mode:"development",
	entry: path.join(__dirname,'./src/main.js'),
	output: {
		path: path.join(__dirname,'./dist'),
		filename: 'bundle.js'
	},
	plugins:[
		new HtmlWebpackPlugin({
			//创建一个在内存中生成html页面的插件
			template:path.join(__dirname,'./src/index.html'),
			filename:'index.html'
		}),
		new VueLoaderPlugin()
	],
	module:{
		rules:[
			//处理css的loader
			{ test: /\.css$/, use:['style-loader','css-loader'] },
			//处理图片url的loader,limit给定的值是图片的大小,单位是bite,如果我们的图片大于或者等于
			//limit的值,则不会被转为base64格式的字符串,如果小于给定的值,则会被转为base64的字符串
			//url-loader?limit=1,118,978&name=[name].[ext],name属性表示名字和之前的一致
			{ test: /\.(jpg|png|gif|bmp|jpeg)$/, use:'url-loader'},
			//字体文件的loader
			{ test: /\.(ttf|woff2|svg|woff)$/, use:'url-loader'},
			{ test: /\.js$/,use:'babel-loader',exclude:/node_modules/},
			{ test: /\.vue$/,use:'vue-loader' },
			{ test: /\.scss$/,use:['style-loader','css-loader','sass-loader'] }
		]
	},
	resolve:{
		alias:{
			'vue$':'vue/dist/vue.js'
		}
	}
}