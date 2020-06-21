import Vue from 'vue'

// Declaring Host
const developmentUrl = 'http://localhost:3001'
const productionUrl = 'https://run.mocky.io/v3'

Vue.config.productionTip = true  // if false then development
Vue.prototype.$hostname = (Vue.config.productionTip) ? productionUrl :developmentUrl

export const hostname = Vue.prototype.$hostname