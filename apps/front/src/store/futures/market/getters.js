export default {
  fixedIndex: (state) => {
    return Math.round((state.index + Number.EPSILON) * 10) / 10
  },
}
