const state = {
    data: null,
  };
  const mutations = {
    setUserData(state, data) {
      state.data = { ...data };
    },
  };
  const actions = {
    setUserData({ commit }, data) {
      commit("setUserData", data);
    },
  };
  
  export default {
    state,
    mutations,
    actions,
    namespaced: true,
  };