import api from '@/plugins/api.js'
import market from './modules/market.js'
import {
  computeVanillaOptionPl,
  computeVanillaOptionDelta,
} from '@ln-markets/maths'
const defaultState = () => {
  return {
    options: [],
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  actions: {
    async get({ commit, dispatch }) {
      try {
        const options = await api.get({
          path: '/api/options',
        })

        commit('OPTIONS', options)
      } catch (error) {
        return dispatch('error', error, { root: true })
      }
    },
  },
  mutations: {
    OPTIONS(state, options) {
      state.options = options
    },
  },
  getters: {
    computePL: (state, getters, rootState) => {
      let pl = 0
      for (const position of state.options) {
        pl += computeVanillaOptionPl(position, rootState.futures.market)
      }

      return pl
    },

    computeDelta: (state, getters, rootState) => {
      let delta = 0
      for (const position of state.options) {
        delta += computeVanillaOptionDelta(position, rootState.futures.market)
      }

      return delta
    },

    usedMargin: (state) => {
      return state.options.reduce((a, b) => ({ margin: a.margin + b.margin }), {
        margin: 0,
      }).margin
    },
  },
  modules: {
    market,
  },
}
