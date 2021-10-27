import { wait } from '../../plugins/utils.js'

const JSONRPC = '2.0'

const isJSONRPCMessage = (payload) => {
  if (!payload) {
    return false
  } else {
    return (
      payload.jsonrpc === JSONRPC &&
      payload.method !== undefined &&
      payload.params !== undefined
    )
  }
}

export default {
  open({ commit }) {
    commit('OPEN')
  },

  close({ commit }) {
    commit('CLOSE')
  },

  reconnect({ state, dispatch }) {
    wait(500).then(() => {
      if (state.currentSubscription.length > 0) {
        const payload = {
          method: 'subscribe',
          params: state.currentSubscription,
        }

        dispatch('send', payload)
      }
    })
  },

  message({ commit, dispatch }, data) {
    commit('MESSAGE')

    let payload
    try {
      payload = JSON.parse(data)
      if (isJSONRPCMessage(payload)) {
        const { method, params } = payload
        dispatch(method, params, { root: true })
      } else {
        console.error(payload)
      }
    } catch (error) {
      if (!payload) {
        console.error(data)
      } else {
        console.error(payload)
      }

      console.error(error)
    }
  },
}
