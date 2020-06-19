const path = require("path");
const {
  CleanWebpackPlugin,
} = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");

const ImageminPlugin = require("imagemin-webpack-plugin")
  .default;

const imageminMozjpeg = require("imagemin-mozjpeg");
const postcssNormalize = require("postcss-normalize");

module.exports = (env, argv) => {
  const isDevMode = argv.mode !== "production";

  return {
    entry: "./src/app.js",
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
                sourceMap: isDevMode,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: (loader) => [
                  require("postcss-preset-env")({
                    autoprefixer: {
                      flexbox: "no-2009",
                    },
                    stage: 3,
                  }),
                  postcssNormalize(),
                ],
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevMode,
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
        {
          test: /.svg$/,
          use: [
            "svg-sprite-loader",
            "svg-transform-loader",
            {
              loader: "svgo-loader",
              options: {
                plugins: [
                  {
                    removeAttrs: {
                      attrs: "(stroke|fill)",
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        chunks: "all",
        name: false,
      },
      runtimeChunk: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
      new HtmlWebpackPlugin({
        template: "src/views/index.html",
      }),

      new ImageminPlugin({
        disable: isDevMode,
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: { quality: 80 },
        plugins: [imageminMozjpeg({ quality: 50 })],
      }),
      new DotenvWebpackPlugin(),
    ],
    devtool: isDevMode && "source-map",
    devServer: {
      contentBase: path.join(__dirname, "src", "views"),
      hot: true,
    },
  };
};
