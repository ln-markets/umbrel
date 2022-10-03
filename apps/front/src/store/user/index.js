import actions from './actions.js'

const MAX_DEPOSIT_AMOUNT = 2000000

// Check in api/src/routes/user/get.js in order to
// understand the structure bellow. Some properties
// got renamed for clarity.

const defaultState = () => {
  return {
    account: {
      uid: '',
      available_balance: 0,
      username: '',
      linkingpublickey: '',
    },
    metrics: {
      transactions: {
        deposits: 0,
        withdrawals: 0,
      },
      futures: {
        opened: {
          quantity: 0,
          margin: 0,
        },
        running: {
          quantity: 0,
          margin: 0,
        },
        closed: {
          quantity: 0,
          margin: 0,
          pl: 0,
        },
      },
      options: {
        running: {
          quantity: 0,
        },
        closed: {
          pl: 0,
          quantity: 0,
        },
      },
    },
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  actions,
  mutations: {
    UPDATE_USER(state, infos) {
      for (const key in infos) {
        state[key] = infos[key]
      }
    },
    WITHDRAW_SUCCESS(state, amount) {
      state.account.available_balance -= parseInt(amount)
      state.metrics.transactions.withdrawals += parseInt(amount)
    },
    DEPOSIT_SUCCESS(state, amount) {
      state.account.available_balance += parseInt(amount)
      state.metrics.transactions.deposits += parseInt(amount)
    },
  },
  getters: {
    maxDeposit: (state) => {
      return MAX_DEPOSIT_AMOUNT - state.account.available_balance
    },

    globalQuantity: (state, getters, rootState, rootGetters) => {
      return (
        state.metrics.futures.opened.quantity +
        state.metrics.futures.running.quantity +
        rootGetters['options/computeDelta']
      )
    },

    usedMargin: (state, getters, rootState, rootGetters) => {
      return (
        state.metrics.futures.opened.margin +
        state.metrics.futures.running.margin +
        rootGetters['options/usedMargin']
      )
    },
  },
}
