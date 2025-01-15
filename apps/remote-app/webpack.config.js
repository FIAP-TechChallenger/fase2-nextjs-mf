const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3002,
    // host: process.env.REMOTE_APP_HOST || "localhost", // Host configurável via .env
  },
  output: {
    publicPath: `http://localhost:3002/`,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote",
      library: { type: "var", name: "remote" },
      filename: "remote.js",
      exposes: {
        "./CardNovoInvestimento": "./src/CardNovoInvestimento.tsx",
      },
      shared: {
        "@stitches/react": {
          singleton: true,
        },
        react: {
          singleton: true,
          requiredVersion: false,
        },
        "react-dom": {
          requiredVersion: false,
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
