import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'
import weather from './weather'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    http: null,
  },
  mutations: {
    setHttp(state: any, http) {
      state.http = http;
    }
  },
  actions: {
  },
  modules: {
    admin,
    weather,
  }
})
