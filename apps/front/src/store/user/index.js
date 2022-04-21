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
          positions: 0,
          margin: 0,
        },
        running: {
          quantity: 0,
          positions: 0,
          margin: 0,
        },
        canceled: {
          positions: 0,
        },
        closed: {
          positions: 0,
        },
      },
      options: {
        running: {
          quantity: 0,
          positions: 0,
        },
        closed: {
          positions: 0,
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
      state.metrics.transactions.withdrawals += 1
    },
    DEPOSIT_SUCCESS(state, amount) {
      state.account.available_balance += parseInt(amount)
      state.metrics.transactions.deposits += 1
    },
  },
  getters: {
    maxDeposit: (state) => {
      return MAX_DEPOSIT_AMOUNT - state.account.available_balance
    },

    positionsCount: (state) => {
      return (
        state.metrics.futures.running.positions +
        state.metrics.futures.opened.positions +
        state.metrics.futures.closed.positions +
        state.metrics.futures.canceled.positions +
        state.metrics.options.running.positions +
        state.metrics.options.closed.positions
      )
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
