export default {
  UPDATE_USER(state, data) {
    const { infos, stats } = data

    state.infos = infos
    state.stats = stats
  },

  DEPOSIT_PROCESS(state, infos) {
    for (const key in infos) {
      if (key in state.deposits.last) {
        state.deposits.last[key] = infos[key]
      }
    }
  },

  WITHDRAW_PROCESS(state, infos) {
    for (const key in infos) {
      if (key in state.withdrawals.last) {
        state.withdrawals.last[key] = infos[key]
      }
    }
  },
}
