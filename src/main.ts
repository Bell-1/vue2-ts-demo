import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import ECharts from 'vue-echarts-ts'
import moment from 'moment'
import Http from '@/request'
import globalComponents from '@/components/globalComponents';
import '@/style/index.scss'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import '@/utils/live2d/live2d';



Vue.use(ElementUI);
Vue.use(ECharts);
Vue.use(Http, { store });
Vue.use(globalComponents);
Vue.config.productionTip = false
Vue.prototype.$moment = moment;

function removePageLoad() {
	let loadWrap = document.getElementById("pageLoad")
	console.log(loadWrap)
	if (loadWrap) {
		document.body.removeChild(loadWrap);
	}
}

const app = new Vue({
	router,
	store,
	mounted(){
		removePageLoad();
	},
	render: h => h(App),
});

app.$mount('#app');
