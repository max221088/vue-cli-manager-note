import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: {
      1: 'home',
      2: 'work',
      3: 'education',
      4: 'hobby',
      5: 'frends'
    },
    notes: []
  },
  getters: {
    getCategories (state) {
      return state.categories;
    },
    getNotesFromLS (state) {
      return state.notes;
    }
  },
  mutations: {
  },
  actions: {
   getFromLS (state) {
    state.notes = JSON.parse(localStorage.getItem('notes'));
   }
  },
  modules: {
  }
})
