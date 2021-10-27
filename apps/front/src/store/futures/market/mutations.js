export default {
  NEW_BID_OFFER(state, { bid, offer }) {
    state.bid = parseFloat(bid)
    state.offer = parseFloat(offer)
  },

  NEW_INDEX(state, { index }) {
    state.index = parseFloat(index)
  },
}
