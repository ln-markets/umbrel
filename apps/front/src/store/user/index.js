import actions from './actions.js'

const MAX_DEPOSIT_AMOUNT = 2000000

const defaultState = () => {
  return {
    uid: '',
    balance: 0,
    username: '',
    linkingpublickey: '',
    total_deposit_success_count: 0,
    total_withdraw_success_count: 0,
    total_running_margin: 0,
    total_running_quantity: 0,
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
      state.balance = state.balance - parseInt(amount)
      state.total_withdraw_success_count =
        state.total_withdraw_success_count + 1
    },
    DEPOSIT_SUCCESS(state, amount) {
      state.balance = state.balance + parseInt(amount)
      state.total_deposit_success_count = state.total_deposit_success_count + 1
    },
  },
  getters: {
    maxDeposit: (state) => {
      return MAX_DEPOSIT_AMOUNT - state.balance
    },

    positionCount: (state) => {
      return (
        state.total_open_positions +
        state.total_running_positions +
        state.total_closed_positions +
        state.total_canceled_positions
      )
    },

    totalQuantity: (state) => {
      return state.total_running_quantity + state.total_open_quantity
    },

    usedMargin: (state) => {
      return state.total_running_margin + state.total_open_margin
    },
  },
}
