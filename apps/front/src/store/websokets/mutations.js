export default {
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
}
