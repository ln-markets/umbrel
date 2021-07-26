export default {
  UPDATE_USER(state, infos) {
    for (const key in infos) {
      if (key in state) {
        state[key] = infos[key]
      }
    }
  },

  DEPOSIT_TRANSACTIONS(state, list) {
    state.deposits.transactions = list
  },

  WITHDRAWAL_TRANSACTIONS(state, list) {
    state.withdrawals.transactions = list
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
