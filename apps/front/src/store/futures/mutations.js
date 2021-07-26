export default {
  OPENED_POSITIONS(state, list) {
    state.opened = list
  },

  CLOSED_POSITIONS(state, list) {
    state.closed = list
  },

  RUNNING_POSITIONS(state, list) {
    state.running = list
  },
}
