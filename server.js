
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

config.entry.unshift('webpack/hot/dev-server');

config.plugins = [new webpack.HotModuleReplacementPlugin()];

var app = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  // noInfo: true,
});

app.listen(8080, function(err, result) {
  console.log('http://localhost:9090');
  if (err) {
    console.log(err);
  }
});
