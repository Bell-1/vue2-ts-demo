import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import ECharts from 'vue-echarts-ts'
import moment from 'moment'
import Http from 'axios-vue-http'
import 'element-ui/lib/theme-chalk/index.css';
import '@/scss/global.scss'
import apiList from '@/api'

Vue.use(ElementUI);
Vue.use(ECharts);
Vue.use(Http);
Vue.config.productionTip = false
Vue.prototype.$moment = moment;

function success({ res, resolve, reject }: any): void {
  let { code, data } = res.data;
  if (+code === 1) {
    resolve(data);
  } else {
    errorCode(+code);
    reject(res);
  }
}

function fail({ res, reject }: any): void {
  const { status } = res;
  errorCode(+status);
  reject(res);
}

function errorCode(code: number) {
  let msg = '操作失败';
  switch (Math.abs(code)) {
    case 401:
    case 403:
      msg = '未登录';
      app.$router.push('/login');
      break;
    case 403:
      msg = '服务器错误';
      break;
    default:
      break;
  }
  app.$message.error(msg || '操作失败');
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
