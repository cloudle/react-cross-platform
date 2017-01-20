const path = require('path');
const webpack = require('webpack');
const buildType = process.env.TYPE || 'app';

const adminVendors = buildType == 'admin' ? [
	'graphql',
	'graphiql',
	'graphiql/graphiql.css',
	'./src/admin/shared/appbar-light.png',
] : [];

const devVendors = [
	'react-hot-loader',
	'sockjs-client',
	'url', 'strip-ansi', 'ansi-regex',
];

module.exports = {
	entry: {
		'vendor': [
			'babel-polyfill', 'redux-logger', 'isomorphic-fetch',
			'react', 'react-dom',
			'react-native-web',
			'react-router', 'react-router-addons-controlled',
			'redux', 'react-redux', 'immutable', 'history',
			'react-native-vector-icons',
			'react-native-drawer',
			'react-native-textinput-effects',
			'tinycolor2', 'clamp',
			...adminVendors,
			...devVendors,
		],
	},

	resolve: {
		alias: {
			'react-native': 'react-native-web',
		},
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	},

	module: {
		loaders: [
			{
				test: /\.js?$/,
				loaders: ['babel'],
			},
			{ test: /\.css$/, loader: "style!css" },
			{
				test: /\.(png|jpg|svg|ttf)$/,
				loader: 'file?name=[name].[ext]'
			},
			{
				test: /\.json/,
				loader: 'json'
			}
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