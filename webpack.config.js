const path = require("path");
module.exports = {
  output: {
    filename: "[name].js",
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  esmodules: true,
                },
              },
            ],
            "@babel/preset-react",
          ],
        },
      },
    ],
  },
  devServer: {
    // NOTE: contentBase is preferred to be an absolute path so configure it here
    //       the rest of configurations are done as npm shell script args
    contentBase: path.join(__dirname, "dist"),
  },
};
