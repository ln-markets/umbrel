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

  SUBSCRIBE(state, events) {
    for (const event of events) {
      state.currentSubscription.push(event)
    }
  },

  UNSUBSCRIBE(state, events) {
    for (const event of events) {
      const index = state.currentSubscription.indexOf(event)
      if (index > -1) {
        state.currentSubscription.splice(index, 1)
      }
    }
  },

  SEND(state, payload) {},
}
