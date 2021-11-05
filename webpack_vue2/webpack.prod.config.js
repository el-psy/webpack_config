const base_config = require('./webpack.config.js');
const path = require('path');

const { merge } = require('webpack-merge');

// const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = merge(base_config, {
	mode: 'production',
	plugins: [
		// new DashboardPlugin(),
	]
});