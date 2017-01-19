const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
port = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	contentBase: 'web',
	hot: true,
	historyApiFallback: true,
	stats: {
		assets:         false,
		colors:         true,
		version:        false,
		hash:           false,
		timings:        true,
		chunks:         true,
		chunkModules:   false,
	},
	quiet: false,
	noInfo: false,
}).listen(port, '0.0.0.0', function (err, result) {
	if (err) {
		return console.log(err);
	}

	console.log('Listening at http://localhost:'+port);
});