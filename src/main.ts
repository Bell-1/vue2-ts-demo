import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import ECharts from 'vue-echarts-ts'
import moment from 'moment'
import Http from 'axios-vue-http'
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'
import '@/style/index.scss'
import apiList from '@/api'

import '@/utils/live2d/live2d'

Vue.use(ElementUI);
Vue.use(ECharts);
Vue.use(Http);
Vue.config.productionTip = false
Vue.prototype.$moment = moment;

function success({ res, resolve, reject }: any): void {
	let { code, data, msg } = res.data;
	if (+code === 1) {
		resolve(data);
	} else {
		errorCode(+code, msg);
		reject(res);
	}
}

function fail({ res, reject }: any): void {
	const { status } = res;
	errorCode(+status);
	reject(res);
}

function errorCode(code = -1, msg = '操作失败') {
	interface errs {
		[code: string]: string
	}
	const errs: errs = {
		'-401': '未登录',
		'-403': '未登录',
		'-500': '服务器错误',
	}

	msg = errs[code] || msg;
	app.$message.error(msg);

	if (code === -401 || code === -403) {
		app.$router.push('/login');
	}
}

function genHeader() {
	let headers = {
		token: localStorage.getItem('token') || undefined,
	}
	return { headers };
}

const app = new Vue({
	router,
	store,
	beforeMount() {
		this.$store.commit('setHttp', this.$http);
		this.$http.addApiList(apiList);
		this.$http.requestInterceptors(genHeader);
		this.$http.setSuccess(success);
		this.$http.setFail(fail);
	},
	render: h => h(App),
});

app.$mount('#app');
