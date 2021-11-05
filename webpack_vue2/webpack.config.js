const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const { template } = require('lodash');

module.exports = {
	entry: {
		print_1: './src/index_1.js',
		print_2: './src/index_2.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	module:{
		rules:[
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			// {
			// 	test: /\.(png|svg|jpg|jpeg|gif)$/i,
			// 	type: 'asset/resource',
			// },
			// {
			// 	test: /\.(woff|woff2|eot|ttf|otf)$/i,
			// 	type: 'asset/resource',
			// },
			{
				test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192
					}
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
				use: {
					loader: 'file-loader',
				},
			},
			{
				test: /\.txt$/i,
				use: 'raw-loader'
			},
			{
				test: /\.less$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.vue$/i,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/i,
				use: {
					loader: 'babel-loader'
				},
				include: path.join(__dirname, 'src'),
				exclude: /node_modules/,
			},
			{
				test: /\.tsx?$/i,
				loader: 'ts-loader'
			}
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			//   title: '管理输出',
			filename: 'index.html',
			template:'src/index.html',
			chunks: ['print_1'],
		}),
		new HtmlWebpackPlugin({
			// title: '管理输出',
			filename: 'index_2.html',
			template:'src/index.html',
			chunks: ['print_2'],
		}),
		// new BundleAnalyzerPlugin(),
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin(),
	],
	optimization:{
		// minimizer: [
		// 	new CssMinimizerPlugin(),
		// ],
		splitChunks: {
			chunks: 'async',
			minSize: 20000,
			minRemainingSize: 0,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			enforceSizeThreshold: 50000,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
};