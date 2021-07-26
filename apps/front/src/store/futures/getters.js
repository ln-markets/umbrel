export default {
  positionCount: (state) => {
    return state.opened.length + state.closed.length + state.running.length
  },

  openedCount: (state) => {
    return state.opened.length
  },

  runningCount: (state) => {
    return state.running.length
  },

  closedCount: (state) => {
    return state.closed.length
  },

  computePL: (state) => {
    let total = 0

    for (const position of state.running) {
      total += position.pl
    }

    return total
  },
}
