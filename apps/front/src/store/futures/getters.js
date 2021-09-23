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
    return state.running.reduce((a, b) => ({ pl: a.pl + b.pl }), { pl: 0 }).pl
  },
}
