const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    // eslint-disable-next-line
    path: path.join(__dirname, `public`),
  },
  devServer: {
    // eslint-disable-next-line
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true,
    port: 8081,
    open: true,
  },
  devtool: `source-map`,
};
