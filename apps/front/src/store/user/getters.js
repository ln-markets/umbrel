export default {
  maxDeposit: (state) => {
    return 1000000 - state.infos.balance
  },

  positionCount: (state) => {
    return Object.values(state.stats.positions).reduce(
      (total, current) => total + current
    )
  },
}
