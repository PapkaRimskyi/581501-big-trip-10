const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    // eslint-disable-next-line
    path: path.join(__dirname, `public`),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      },
    ],
  },
  devServer: {
    // eslint-disable-next-line
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true,
    port: 8081,
    open: true,
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ],
  devtool: `source-map`,
};
