import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'
import weather from './weather'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	http: null,
	isMobile: false,
  },
  mutations: {
    setHttp(state: any, http) {
      state.http = http;
	},
	setIsMobile(state:any, isMobile){
		state.isMobile = isMobile;
	}
  },
  actions: {
  },
  modules: {
    admin,
    weather,
  }
})
