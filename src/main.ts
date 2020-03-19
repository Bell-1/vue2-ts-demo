import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import ECharts from 'vue-echarts-ts'
import moment from 'moment'
import http from '@/utils/http'
import 'element-ui/lib/theme-chalk/index.css';
import '@/scss/global.scss'

Vue.use(ElementUI);
Vue.use(ECharts);

Vue.config.productionTip = false
Vue.prototype.$moment = moment;
store.commit('setHttp', http);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
