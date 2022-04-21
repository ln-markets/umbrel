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
    stats: {
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
      state.stats.transactions.withdrawals += 1
    },
    DEPOSIT_SUCCESS(state, amount) {
      state.account.available_balance += parseInt(amount)
      state.stats.transactions.deposits += 1
    },
  },
  getters: {
    maxDeposit: (state) => {
      return MAX_DEPOSIT_AMOUNT - state.account.available_balance
    },

    positionsCount: (state) => {
      return (
        state.stats.futures.running.positions +
        state.stats.futures.opened.positions +
        state.stats.futures.closed.positions +
        state.stats.futures.canceled.positions +
        state.stats.options.running.positions +
        state.stats.options.closed.positions
      )
    },

    globalQuantity: (state, getters, rootState, rootGetters) => {
      return (
        state.stats.futures.opened.quantity +
        state.stats.futures.running.quantity +
        Math.round(rootGetters['options/computeDelta'])
      )
    },

    usedMargin: (state, getters, rootState, rootGetters) => {
      return (
        state.stats.futures.opened.margin +
        state.stats.futures.running.margin +
        rootGetters['options/usedMargin']
      )
    },
  },
}
