const path = require('path')

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

	devServer: {
		proxy: 'http://localhost:3333'
	}
}