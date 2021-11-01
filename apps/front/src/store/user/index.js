import actions from './actions.js'

const MAX_DEPOSIT_AMOUNT = 1000000

const defaultState = () => {
  return {
    infos: {
      uid: '',
      balance: 0,
      username: '',
      linkingpublickey: '',
      total_deposit_success_count: 0,
      total_withdraw_success_count: 0,
      total_open_positions: 0,
      total_running_positions: 0,
      total_closed_positions: 0,
      total_canceled_positions: 0,
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
    UPDATE_USER(state, infos) {
      state.infos = infos
    },

    TRANSACTION_PROCESS(state, data) {
      for (const key in data) {
        state.transaction[key] = data[key]
      }
    },
  },
  getters: {
    maxDeposit: (state) => {
      return MAX_DEPOSIT_AMOUNT - state.infos.balance
    },

    positionCount: (state) => {
      return (
        state.infos.total_open_positions +
        state.infos.total_running_positions +
        state.infos.total_closed_positions +
        state.infos.total_canceled_positions
      )
    },
  },
}
