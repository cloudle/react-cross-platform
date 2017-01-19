const path = require('path');
const webpack = require('webpack');
const happypack = require('happypack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const publicPath = 'http://0.0.0.0:3000/';

const env = process.env.MIX_ENV || 'dev';
const prod = env === 'prod';

const entry = './index.web.js';

const hot = [
	'webpack-dev-server/client?'+publicPath,
	'webpack/hot/only-dev-server',
];

let plugins = [
	// new happypack({
	// 	loaders: prod ? ['babel'] : ['react-hot', 'babel'],
	// 	tempDir: 'web/.happypack',
	// 	cachePath: 'web/.happypack/cache-[id].json',
	// 	threads: 4,
	// }),
	new DefinePlugin({
		ENV: JSON.stringify(env)
	}),
	new webpack.DllReferencePlugin({
		context: '.',
		manifest: require('./web/vendor-manifest.json')
	}),
];

if (env === 'dev') {
	plugins.push(new webpack.HotModuleReplacementPlugin());
	plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = {
	cache: true,
	devtool: prod ? null : 'eval-source-map',
	entry: {
		app: prod ? [entry] : [...hot, entry],
	},
	output: {
		publicPath: publicPath,
		path: path.join(__dirname, 'web'),
		filename: '[name].bundle.js',
		chunkFilename: "[name].js"
	},
	resolve: {
		alias: {
			'react-native': 'react-native-web',
		},
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	},
	plugins: plugins,
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loaders: prod ? ['babel'] : ['react-hot', 'babel'],
				exclude: path.join(__dirname, 'node_modules'),
				include: [
					path.join(__dirname, 'src'),
					path.join(__dirname, 'index.web.js'),
				]
			},
			{
				test: /\.(png|jpg|svg)$/,
				loader: 'file?name=[name].[ext]'
			},
		],
	},
};