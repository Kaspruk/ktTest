import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store =  new Vuex.Store({
  state: {
    genres: [],
  },
  getters: {
    getGenres(state) {
      return state.genres
    }
  },
  mutations: {
    setGenres(state, payload){
      state.genres = payload
    }
  },
});
