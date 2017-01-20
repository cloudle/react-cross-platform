const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const port = process.env.PORT || 3000;
const logMode = process.env.LOG;
const buildType = process.env.TYPE || 'app';

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	contentBase: 'web',
	hot: true,
	historyApiFallback: {
		index: buildType == 'app' ? 'app.html' : 'admin.html',
	},
	stats: {
		assets:         false,
		colors:         true,
		version:        false,
		hash:           false,
		timings:        true,
		chunks:         true,
		chunkModules:   !!logMode, /*[248 | 75]*/
	},
	quiet: false,
	noInfo: false,
}).listen(port, '0.0.0.0', function (err, result) {
	if (err) {
		return console.log(err);
	}

	console.log('Listening at http://localhost:'+port);
});