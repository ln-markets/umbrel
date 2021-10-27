import api from '../../plugins/api.js'

import market from './modules/market.js'

const defaultState = () => {
  return {
    positions: [],
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  modules: {
    market,
  },
  actions: {
    async get({ commit }) {
      try {
        const positions = await api.get({
          path: '/api/futures',
        })

        commit('POSITIONS', positions)
      } catch (error) {
        return Promise.reject(error)
      }
    },
  },
  mutations: {
    POSITIONS(state, positions) {
      state.positions = positions
    },
  },
  getters: {
    computePL: (state) => {
      return state.positions.reduce((a, b) => ({ pl: a.pl + b.pl }), { pl: 0 })
        .pl
    },
  },
}
