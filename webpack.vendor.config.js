const path = require('path');
const webpack = require('webpack');
const buildType = process.env.TYPE || 'app';

const adminVendors = buildType == 'admin' ? [
		'graphql',
		'graphiql',
		'graphiql/graphiql.css',
		'react-codemirror',
		'codemirror-mode-elixir',
		'codemirror/lib/codemirror.css',
		'codemirror/mode/javascript/javascript',
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
			'react-native-vector-icons/FontAwesome',
			'react-native-vector-icons/Ionicons',
			'react-native-vector-icons/glyphmaps/MaterialIcons.json',
			'react-native-drawer',
			'react-native-textinput-effects',
			'tinycolor2', 'clamp',
			'moment', 'lodash',
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
				exclude: [
					/node_modules\/codemirror-mode-elixir/
				],
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