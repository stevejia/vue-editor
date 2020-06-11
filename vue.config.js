// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  runtimeCompiler: true,
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('monaco-editor', 'monaco-editor/esm/vs/editor/editor.main.js');
  // }
  // entry: {
  //   app: ['babel-polyfill', './src/main.js'], // './src/main.js'
  //   "editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js'
  // }
  devServer: {
    port: 8888
  }
}