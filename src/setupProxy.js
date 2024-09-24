const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/dynamic-api',
    createProxyMiddleware({
      target: process.env.REACT_APP_DYNAMIC_PROXY_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/dynamic-api': '/api/v0/sdk',
      },
    })
  );
};
