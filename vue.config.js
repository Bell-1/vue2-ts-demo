const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);

const alias = {
    '@': resolve('src'),
}

const proxyConfig = {
    local: 'http://localhost:3333/',
    serve: 'https://vue.beiyunjiang.top/'
}

const cdn = {
    // 忽略打包的第三方库
    externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'element-ui': 'ELEMENT',
        'loadsh': '_',
    },
    js: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
        'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
        'https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
        'https://cdn.jsdelivr.net/npm/element-ui@2.15.2/lib/index.js',
        'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
        'https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js',
    ],
    css: []
}

function getProxyConfig() {
    const proxy = {}
    Object.keys(proxyConfig).forEach(key => {
        proxy[key] = {
            target: proxyConfig[key],
            changeOrigin: true,
            pathRewrite: {
                [`^/${key}`]: '/',
            }
        }
    })

    return proxy;
}

module.exports = {
    outputDir: 'vue',
    chainWebpack: config => {
        for (let [k, v] of Object.entries(alias)) {
            config.resolve.alias.set(k, v);
        }

        if (process.env.NODE_ENV === 'production') {
            // 忽略生成环境打包的文件
            config.set('externals', cdn.externals);
            config.plugin('html')
                .tap(args => {
                    args[0].cdn = cdn
                    return args
                })
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
        if (process.env.npm_config_report) {
            var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            newConf.plugins.push(new BundleAnalyzerPlugin());
        }
        return newConf
    },

    css: {
        sourceMap: process.env.NODE_ENV === 'development',
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                prependData: `@import "@/style/utils/index.scss";`
            },
        },
    },

    devServer: {
        proxy: getProxyConfig()
    }
}