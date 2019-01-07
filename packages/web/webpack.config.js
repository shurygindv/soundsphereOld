const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8888;

module.exports = {
  mode: NODE_ENV,

  entry: "./src/Index.bs.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js"
  },
  devServer: {
    port: PORT,
    compress: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),

    proxy: {
      '/api': 'http://localhost:7777',
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
