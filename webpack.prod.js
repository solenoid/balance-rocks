const path = require("path");
module.exports = {
  mode: "production",
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
};
