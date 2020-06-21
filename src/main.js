import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {autoAuthenticate} from './utils/auth/auth'
import './api/init'
autoAuthenticate()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
