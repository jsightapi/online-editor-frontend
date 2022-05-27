/* config-overrides.js */
/* eslint-disable */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function override(config, env) {
  if (process.env.REACT_VIEW_TYPE === 'doc') {
    config.entry = config.entry.replace('index.', 'index.export.');
    config.output = {
      ...config.output, // copy all settings
      filename: "static/js/export-[name].js",
      chunkFilename: "static/js/[name].chunk.js",
    };

    config.plugins = [...config.plugins, new MonacoWebpackPlugin({}), new  MiniCssExtractPlugin({
      filename: "static/css/export-[name].css",
      chunkFilename: "static/js/export-[name].css",
      ignoreOrder: false,
      runtime: true,
    })];
  } else {
    config.plugins = [...config.plugins, new MonacoWebpackPlugin({})];
  }

  return config;
}
