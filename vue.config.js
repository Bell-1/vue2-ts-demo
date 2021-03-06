const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);

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
        if(process.env.npm_config_report){
            var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            newConf.plugins.push(new BundleAnalyzerPlugin());
        }
        return newConf
    },

    devServer: {
        proxy: 'http://localhost:3333'
    }
}