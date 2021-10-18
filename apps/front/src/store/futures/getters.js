export default {
  computePL: (state) => {
    return state.positions.reduce((a, b) => ({ pl: a.pl + b.pl }), { pl: 0 }).pl
  },
}
