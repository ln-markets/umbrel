import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './user/index.js'
import futures from './futures/index.js'
import websockets from './websokets/index.js'

import websocket from '../plugins/websocket.js'

const defaultState = () => {
  return {
    disclaimer: true,
    errorCode: '',
  }
}

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState(), websocket()],
  modules: {
    user,
    futures,
    websockets,
  },
  state: defaultState(),
  actions: {
    async updateDisclaimer({ commit }) {
      commit('UPDATE_DISCLAIMER')
    },
  },
  mutations: {
    UPDATE_DISCLAIMER(state) {
      state.disclaimer = false
    },
    API_ERROR(state, errorCode) {
      state.errorCode = errorCode
    },
  },
})

export default store
