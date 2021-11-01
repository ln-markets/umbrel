import actions from './actions.js'

const defaultState = () => {
  return {
    infos: {
      uid: '',
      linkingpublickey: '',
      balance: 0,
      username: '',
    },
    stats: {
      transactions: {
        deposits: 0,
        withdrawals: 0,
      },
      positions: {
        opened: 0,
        running: 0,
        closed: 0,
        canceled: 0,
      },
    },
    transaction: {
      step: 'before',
      amount: 0,
      id: null,
      payment: null,
      secret: null,
      fee: 0,
    },
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  actions,
  mutations: {
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
  },
  getters: {
    maxDeposit: (state) => {
      return 1000000 - state.infos.balance
    },

    positionCount: (state) => {
      return Object.values(state.stats.positions).reduce(
        (total, current) => total + current
      )
    },
  },
}
