import actions from './actions.js'

const defaultState = () => {
  return {
    connected: false,
    hasReceivedMessage: false,
    lastMessage: null,
    currentSubscription: [],
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  actions,
  mutations: {
    OPEN(state) {
      state.connected = true
      state.hasReceivedMessage = false
    },

    CLOSE(state) {
      state.connected = false
      state.hasReceivedMessage = false
    },

    MESSAGE(state) {
      if (!state.hasReceivedMessage) {
        state.hasReceivedMessage = true
      }
      state.lastMessage = Date.now()
    },
  },
  getters: {
    url: () => {
      if (import.meta.env.MODE === 'development') {
        return 'ws://localhost:8001'
      } else {
        return `ws://${window.location.host}`
      }
    },

    isConnected: (state) => {
      return state.connected
    },
  },
}
