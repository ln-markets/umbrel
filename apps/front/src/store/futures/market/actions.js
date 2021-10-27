export default {
  'bid-offer'({ commit }, data) {
    commit('NEW_BID_OFFER', data)
  },

  index({ commit }, data) {
    commit('NEW_INDEX', data)
  },

  subscribeToMarketData({ dispatch, rootState }) {
    const events = ['futures/market/index', 'futures/market/bid-offer']
    dispatch('websockets/subscribe', events, { root: true })
  },
  unsubscribeToMarketData({ dispatch, rootState }) {
    const events = ['futures/market/index', 'futures/market/bid-offer']
    dispatch('websockets/unsubscribe', events, { root: true })
  },
}
