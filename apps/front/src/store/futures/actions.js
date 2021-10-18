import client from '../../plugins/client.js'

export default {
  async get({ commit }) {
    try {
      const positions = await client.get({
        path: '/api/futures',
      })

      commit('POSITIONS', positions)
    } catch (error) {
      return Promise.reject(error)
    }
  },
}
