const path = require("path");
module.exports = {
  mode: "development",
  output: {
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        use: [{ loader: "babel-loader" }],
      },
      { test: /\.css$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }] },
    ],
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  devServer: {
    // NOTE: contentBase is preferred to be an absolute path
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
    hot: true,
  },
};
