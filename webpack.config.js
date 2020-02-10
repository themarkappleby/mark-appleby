const PnpWebpackPlugin = require('pnp-webpack-plugin')

module.exports = {
  mode: 'development',
  resolve: {
    plugins: [
      PnpWebpackPlugin
    ]
  },
  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module)
    ]
  },
  devServer: {
    writeToDisk: true
  }
}
