import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import ECharts from 'vue-echarts-ts'
import moment from 'moment'
import Http from '@/request'
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'
import '@/style/index.scss'

import '@/utils/live2d/live2d';

Vue.use(ElementUI);
Vue.use(ECharts);
Vue.use(Http, { store });
Vue.config.productionTip = false
Vue.prototype.$moment = moment;

const app = new Vue({
	router,
	store,
	render: h => h(App),
});

app.$mount('#app');
