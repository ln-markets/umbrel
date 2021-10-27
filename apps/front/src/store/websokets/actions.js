import mitt from 'mitt'

import { wait, isJSONRPCMessage } from '../../plugins/utils.js'

const event = mitt()

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

  async subscribe({ dispatch, state, commit }, events) {
    const params = JSON.parse(JSON.stringify(events))

    for (const event of events) {
      if (state.currentSubscription.indexOf(event) > -1) {
        params.splice(params.indexOf(event), 1)
      }
    }

    if (params.length === 0) {
      return
    }

    const payload = {
      method: 'subscribe',
      params,
    }

    dispatch('send', payload).then(({ data }) => {
      commit('SUBSCRIBE', data)
    })
  },

  unsubscribe({ dispatch, commit }, params) {
    const payload = {
      method: 'unsubscribe',
      params,
    }
    dispatch('send', payload)
    commit('UNSUBSCRIBE', params)
  },

  send({ commit }, { method, params, notification }) {
    const payload = {
      jsonrpc: '2.0',
      method,
      params,
      id: notification ? null : '_' + Math.random().toString(36).substr(2, 9),
    }

    commit('SEND', JSON.stringify(payload))

    if (payload.id) {
      return new Promise((resolve, reject) => {
        event.on(payload.id, (data) => {
          resolve({ payload, data })
        })
      })
    }
  },
}
