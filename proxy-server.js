const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const target = 'https://app.dynamicauth.com';

http.createServer((req, res) => {
  proxy.web(req, res, {
    target: target,
    changeOrigin: true,
    pathRewrite: {
      '^/dynamic-api': '/api/v0/sdk'
    }
  });
}).listen(8010);

console.log('Proxy server running on http://localhost:8010');
