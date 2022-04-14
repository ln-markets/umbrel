import api from '@/plugins/api.js'
import market from './modules/market.js'

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
    computePL: (state) => {
      return state.options.reduce((a, b) => ({ pl: a.pl + b.pl }), { pl: 0 }).pl
    }, //WIP
  },
  modules: {
    market,
  },
}
