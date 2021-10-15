export default {
  UPDATE_USER(state, data) {
    const { infos, stats } = data

    state.infos = infos
    state.stats = stats
  },

  TRANSACTION_PROCESS(state, data) {
    for (const key in data) {
      state.transaction[key] = data[key]
    }
  },
}
