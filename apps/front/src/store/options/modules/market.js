const defaultState = () => {
  return {
    volatility: 0.5,
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  actions: {
    volatility({ commit }, data) {
      commit('NEW_VOLATILITY', data)
    },
  },
  mutations: {
    NEW_VOLATILITY(state, { volatility }) {
      state.volatility = parseFloat(volatility)
    },
  },
}
