const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    // 指定使用一个 host。默认是 localhost：
    devServer: {
        contentBase: './dist',
        hot: true,
        host: "0.0.0.0",
        // 本地调试开启https
        // https: true,
        port: 8000,
        proxy: {
            "/api": "http://localhost:1337"
        },
        before(app) {
            app.post('/some/post', function (req, res) {
                res.json({ code: '500' })
            }),
                app.get('/some/get', function (req, res) {
                    res.json({ code: '500' })
                })
        },
        // 开启gzip压缩
        compress: true
    },
    // plugins: [new webpack.HotModuleReplacementPlugin()]
});