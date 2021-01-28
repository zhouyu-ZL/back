import Vue from 'vue'
import Vuex from 'vuex'
import state from './state';
import mutations from './mutations';
import actions from './actions';
import vuexPersist from "vuex-persist";

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [
    new vuexPersist({
      storage: window.localStorage,
    }).plugin,
  ],
})
