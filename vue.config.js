module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert/')
      }
    }
  }
}
