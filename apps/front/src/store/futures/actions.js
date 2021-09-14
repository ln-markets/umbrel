import client from '../../plugins/client.js'

export default {
  async get({ commit }) {
    try {
      const { opened, running, closed } = await client.get({
        path: '/api/futures',
      })

      if (opened) {
        commit('OPENED_POSITIONS', opened)
      }

      if (closed) {
        commit('CLOSED_POSITIONS', closed)
      }

      if (running) {
        commit('RUNNING_POSITIONS', running)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
}
