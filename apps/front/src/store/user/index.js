import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

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
  getters,
  actions,
  mutations,
}
