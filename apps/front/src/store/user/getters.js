export default {
  maxDeposit: (state) => {
    return 1000000 - state.infos.balance
  },
}
