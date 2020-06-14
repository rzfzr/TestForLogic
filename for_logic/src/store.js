import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clients: [],
    evaluations: [],
    user: {
      isLogged: false,
      data: null
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {

    SET_CLIENTS(state, val) {
      console.log('test', val)
      state.clients = val
    },
    SET_EVALUATIONS(state, val) {
      state.evaluations = val
    },

    SET_LOGGED_IN(state, value) {
      state.user.isLogged = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  actions: {
    fetchUser({
      commit
    }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
});