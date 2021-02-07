const createProxyMiddleware = require('http-proxy-middleware');// importing this with {} will not work

module.exports = (app) =>{
    app.use(
        ["/api","/auth/google"],
        createProxyMiddleware({
            target:"http://localhost:5000",
        })
    );
};