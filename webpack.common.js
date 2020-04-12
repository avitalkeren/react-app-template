const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSExtract = new MiniCssExtractPlugin({ filename: "styles.css" });

const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const lessToJs = require("less-vars-to-js");

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, "./src/ant-default-vars.less"), "utf8"));

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
          cacheDirectory: true,
          plugins: [["import", { libraryName: "antd", style: true }]]
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,

          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },

          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: themeVariables,
              root: path.resolve(__dirname, "./")
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new HtmlWebpackPlugin({
      template: require("html-webpack-template"),
      // inject: false,
      appMountId: "app",
      title: 'react-app-template',
    }),
    CSSExtract,
    new webpack.DefinePlugin({
      SERVER_SUBFOLDER: JSON.stringify(process.env.NODE_ENV === "production" ? "SHOB" : "")
    })
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  }
};

module.exports = config;
