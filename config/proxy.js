/**
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'http://192.168.1.233:7000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    },
  },
  test: {
    '/api/': {
      target: 'http://192.168.1.233:7000',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  }
};
