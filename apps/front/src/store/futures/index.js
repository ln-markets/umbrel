import api from '@/plugins/api.js'
import market from './modules/market.js'
import { computeFuturesPositionPl } from '@ln-markets/maths'

const defaultState = () => {
  return {
    positions: [],
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  actions: {
    async get({ commit, dispatch }) {
      try {
        const positions = await api.get({
          path: '/api/futures',
        })

        commit('POSITIONS', positions)
      } catch (error) {
        return dispatch('error', error, { root: true })
      }
    },
  },
  mutations: {
    POSITIONS(state, positions) {
      state.positions = positions
    },
  },
  getters: {
    computePL: (state, getters, rootState) => {
      let pl = 0
      for (const position of state.positions) {
        pl += computeFuturesPositionPl(position, rootState.futures.market)
      }

      return pl
    },
  },
  modules: {
    market,
  },
}
