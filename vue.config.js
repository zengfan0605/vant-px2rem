const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    outputDir: 'dist',
    publicPath: '/',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true,
        port: 8080,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // 反向代理
            '/api': {
                target: 'http://test.net:9527',
                pathRewrite: { '^/api': '/api' },
                ws: true,
                changeOrigin: true
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            }
        }
    }
};