export default {
  depositCount: (state) => {
    let total = 0

    for (const deposit of state.deposits.transactions) {
      if (deposit.success) {
        total++
      }
    }

    return total
  },

  withdrawalCount: (state) => {
    let total = 0

    for (const withdrawal of state.withdrawals.transactions) {
      if (withdrawal.success) {
        total++
      }
    }

    return total
  },

  maxDeposit: (state) => {
    return 1000000 - state.balance
  },
}
