module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.module
      .rule('js-plotly')
      .test(/\.js$/)
      .use('ify-loader')
      .loader('ify-loader')
      .end()
  },
  transpileDependencies: false,
  configureWebpack: {
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert/')
      }
    }
  }
}
