/* config-overrides.js */
/* eslint-disable */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
  if (process.env.REACT_VIEW_TYPE === 'doc') {
    config.entry = config.entry.replace('index.', 'index.export.');
    config.output = {
      ...config.output, // copy all settings
      filename: "static/js/export-[name].js",
      chunkFilename: "static/js/[name].chunk.js",
    };

    config.plugins = [...config.plugins, new MonacoWebpackPlugin({})];
  } else {
    config.plugins = [...config.plugins, new MonacoWebpackPlugin({})];
  }

  return config;
}
