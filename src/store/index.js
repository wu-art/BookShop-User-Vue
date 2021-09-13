import Vue from 'vue'
import Vuex from 'vuex'
import mycart from './modules/mycart'

import mycollect from './modules/mycollect'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      mycart,
      mycollect
  }
})