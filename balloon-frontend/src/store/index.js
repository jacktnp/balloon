import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);


const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "balloon"
});

const store = new Vuex.Store({
  state: {},
  mutations: {
    setUser(state, data) {
      state.info = data.data;
    }
  },
  getters: {
    info: state => state.info
  },
  actions: {},
  plugins: [vuexLocal.plugin]
});

export default store;
