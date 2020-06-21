import Vue from 'vue'
import Vuex from 'vuex'

import {state} from './core/state'
import {getters} from './core/getters'
import {actions} from './core/actions'
import {mutations} from './core/mutations'
import auth from './modules/auth/index'

Vue.use(Vuex)



export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
auth
  }
})
