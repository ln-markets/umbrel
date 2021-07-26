import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './user/index.js'
import futures from './futures/index.js'

import client from '../plugins/client.js'

const defaultState = () => {
  return {
    disclaimer: true,
  }
}

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState()],
  modules: {
    user,
    futures,
  },
  state: defaultState(),
  actions: {
    async LNMarketsInfos() {
      try {
        return await client.get({ path: '/api/infos' })
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async updateDisclaimer({ commit }) {
      commit('UPDATE_DISCLAIMER')
    },
  },
  mutations: {
    UPDATE_DISCLAIMER(state) {
      state.disclaimer = false
    },
  },
})

export default store
