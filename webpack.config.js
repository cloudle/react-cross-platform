const path = require('path');
const webpack = require('webpack');
const happypack = require('happypack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const env = process.env.ENV || 'dev';
const port = process.env.PORT || 3000;
const buildType = process.env.TYPE || 'app';
const prod = env === 'prod';
const publicPath = `http://0.0.0.0:${port}/`;
const entry = buildType == 'app' ? './index.web.js' : './index.admin.js';

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
	plugins.push(new webpack.optimize.OccurenceOrderPlugin());
	plugins.push(new webpack.HotModuleReplacementPlugin());
	plugins.push(new webpack.NoErrorsPlugin());
	plugins.push(new DashboardPlugin());
}

let buildEntry = {}; buildEntry[buildType] = prod ? [entry] : [...hot, entry];
module.exports = {
	cache: true,
	devtool: prod ? null : 'eval-source-map',
	entry: buildEntry,
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
				// loaders: ['happypack/loader'],
			},
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
};