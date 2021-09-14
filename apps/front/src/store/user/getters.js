export default {
  depositCount: (state) => {
    return state.deposits.transactions.filter((el) => el.success).length
  },

  withdrawalCount: (state) => {
    return state.withdrawals.transactions.filter((el) => el.success).length
  },

  maxDeposit: (state) => {
    return 1000000 - state.balance
  },
}
