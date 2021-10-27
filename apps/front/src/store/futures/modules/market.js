const defaultState = () => {
  return {
    index: 0.0,
    bid: 0.0,
    offer: 0.0,
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    fixedIndex: (state) => {
      return Math.round((state.index + Number.EPSILON) * 10) / 10
    },
  },
  actions: {
    'bid-offer'({ commit }, data) {
      commit('NEW_BID_OFFER', data)
    },

    index({ commit }, data) {
      commit('NEW_INDEX', data)
    },
  },
  mutations: {
    NEW_BID_OFFER(state, { bid, offer }) {
      state.bid = parseFloat(bid)
      state.offer = parseFloat(offer)
    },

    NEW_INDEX(state, { index }) {
      state.index = parseFloat(index)
    },
  },
}
