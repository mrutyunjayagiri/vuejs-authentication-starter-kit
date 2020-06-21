import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './path'

Vue.use(VueRouter)

  
// Create a new Vue Router Instance
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

  // If any Scroll Options are there
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }

})

export default router
