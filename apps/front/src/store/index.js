import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { $vfm } from 'vue-final-modal'
import websocket from '@/plugins/websocket.js'
import router from '@/router/index.js'

import user from './user/index.js'
import futures from './futures/index.js'
import options from './options/index.js'
import websockets from './websockets/index.js'

import ModalDisclaimer from '@/modals/Disclaimer.vue'

const defaultState = () => {
  return {
    readDisclaimer: false,
  }
}

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState(), websocket()],
  state: defaultState(),
  actions: {
    showDisclaimer({ state }) {
      if (!state.readDisclaimer) {
        $vfm.show({
          component: ModalDisclaimer,
          bind: {
            name: 'ModalDisclaimer',
          },
          on: {
            close: () => {
              $vfm.hide('ModalDisclaimer')
            },
          },
        })
      }
    },

    error({ rootGetters }, error) {
      const { message, code, status } = error

      if (status === 401) {
        router.replace({ path: '/' })
      }

      this.$vm.$notify({
        type: 'error',
        message: `${message || code || error}`,
      })

      console.error(error)

      return Promise.reject(error)
    },
  },
  mutations: {
    DISCLAIMER_READ(state) {
      state.readDisclaimer = true
    },
  },
  modules: {
    user,
    futures,
    websockets,
    options,
  },
})
