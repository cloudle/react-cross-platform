const path = require('path');
const webpack = require('webpack');
const devVendors = [
	'react-hot-loader',
	'sockjs-client',
	'url', 'strip-ansi', 'ansi-regex',
];

module.exports = {
	entry: {
		'vendor': [
			'babel-polyfill', 'redux-logger',
			'react', 'react-native-web', 'react-dom',
			'react-router', 'react-router-addons-controlled',
			'redux', 'react-redux', 'immutable', 'history',
			'tinycolor2', 'clamp',
			...devVendors,
		],
	},

	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, 'web'),
		library: '[name]_lib',
	},

	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, 'web/[name]-manifest.json'),
			name: '[name]_lib'
		}),
	],
};