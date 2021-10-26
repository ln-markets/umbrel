import actions from './actions.js'
import mutations from './mutations.js'

const defaultState = () => {
  return {
    index: 0.0,
    bid: 0.0,
    offer: 0.0,
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  actions,
  mutations,
}
