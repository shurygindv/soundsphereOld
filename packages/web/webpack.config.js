const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 7777;

module.exports = {
  mode: NODE_ENV,

  entry: "./src/Index.bs.js",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: path.join(__dirname, "dist"),
    filename: "main.js"
  },
  devServer: {
    port: PORT,
    compress: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ]
};
