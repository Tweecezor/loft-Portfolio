export default {
  namespaced: true,
  state: {
    tests: []
  },
  actions: {
    async addNew(store, obj) {
      // console.log(obj);
      store.commit("ADD_NEW_GROUP", obj);
    }
  },
  mutations: {
    ADD_NEW_GROUP(state, obj) {
      console.log(state);
      state.tests.push(obj);
    }
  },
  getters: {
    getTests(state) {
      return state.tests;
    }
  }
};
