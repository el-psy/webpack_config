const base_config = require('./webpack.config.js');
const path = require('path');

const { merge } = require('webpack-merge');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DashboardPlugin = require('webpack-dashboard/plugin');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const { VueLoaderPlugin } = require('vue-loader');
// const smp = new SpeedMeasurePlugin();

module.exports = merge(base_config, {
	mode: 'development',
	devtool:'eval-source-map', // 发布时清空
	devServer:{
		static:'./dist',
		// publicPath: './dist',
		hot: true,
		port: 8080,
		// proxy: // 代理
	},
	plugins: [
		// new BundleAnalyzerPlugin(),
		new DashboardPlugin(),
		// new VueLoaderPlugin(),
	]
});