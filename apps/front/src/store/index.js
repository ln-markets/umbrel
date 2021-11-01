import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './user/index.js'
import futures from './futures/index.js'
import websockets from './websockets/index.js'

import websocket from '@/plugins/websocket.js'

const UPDATE_INTERVAL = 15

const defaultState = () => {
  return {
    disclaimer: true,
    updateInterval: undefined,
  }
}

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState(), websocket()],
  state: defaultState(),
  actions: {
    updateDisclaimer({ commit }) {
      commit('UPDATE_DISCLAIMER')
    },
    updateProfileInterval({ dispatch }) {
      setInterval(() => {
        dispatch('user/get')
        dispatch('futures/get')
      }, UPDATE_INTERVAL * 1000)
    },
    error({ rootGetters }, error) {
      const { message, code } = error
      this.$vm.$notify({
        type: 'error',
        message: `${message || code || error}`,
      })

      console.error(error)
      return Promise.reject(error)
    },
  },
  mutations: {
    UPDATE_DISCLAIMER(state) {
      state.disclaimer = false
    },
  },
  getters: {},
  modules: {
    user,
    futures,
    websockets,
  },
})
