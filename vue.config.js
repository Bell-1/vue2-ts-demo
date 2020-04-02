const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
    return path.resolve(__dirname, dir);
}
const alias = {
    '@': resolve('src'),
}

module.exports = {
    chainWebpack: config => {
        for (let [k, v] of Object.entries(alias)) {
            config.resolve.alias.set(k, v);
        }
    },

    configureWebpack() {
        const newConf = {
            plugins: [],
        }
        if (process.env.NODE_ENV === 'production') {
            const gzip = new CompressionPlugin({
                filename: '[path].gz[query]',
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8,
                deleteOriginalAssets: false,
            })
            newConf.plugins.push(gzip);
        }
        return newConf
    },

    devServer: {
        proxy: 'http://localhost:3333'
    }
}