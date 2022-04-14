import api from '@/plugins/api.js'
import market from './modules/market.js'
import { calcFuturesPL } from '@/plugins/utils.js'

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
      const { bid, offer } = rootState.futures.market

      let pl = 0
      for (const position of state.positions) {
        const lastPrice = position.side === 'b' ? bid : offer

        pl += calcFuturesPL(position, lastPrice)
      }

      return pl
    },
  },
  modules: {
    market,
  },
}
