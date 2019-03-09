const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  watch: true,
  output: {
    path: __dirname + 'dist',
    publicPath: '/dist/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
};