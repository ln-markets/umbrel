import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

const defaultState = () => {
  return {
    uid: '',
    linkingpublickey: '',
    balance: 0,
    username: '',
    deposits: {
      transactions: [],
      last: {
        step: 'before',
        amount: 0,
        id: null,
        payment: null,
        secret: null,
      },
    },
    withdrawals: {
      transactions: [],
      last: {
        step: 'before',
        amount: 0,
        id: null,
        payment: null,
        secret: null,
      },
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
