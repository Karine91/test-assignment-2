const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin")
  .default;

module.exports = (env, argv) => {
  const isDevMode = argv.mode === "development";
  return {
    entry: "./app.js",
    mode: argv.mode || "development",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          sideEffects: true,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDevMode,
              },
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "file-loader",
          options: {
            outputPath: "images",
            publicPath: "../images",
            name: "[name].[ext]",
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
      new HtmlWebpackPlugin({
        template: "src/views/index.html",
      }),
      new ImageminPlugin({
        disable: isDevMode,
        pngquant: {
          quality: "95-100",
        },
      }),
    ],
    devtool: "source-map",
    devServer: {
      contentBase: path.join(__dirname, "src", "views"),
      hot: true,
    },
  };
};
