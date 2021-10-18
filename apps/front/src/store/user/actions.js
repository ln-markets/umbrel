import client from '../../plugins/client.js'

export default {
  async get({ commit }) {
    try {
      const data = await client.get({ path: '/api/user' })

      commit('UPDATE_USER', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async deposit({ commit, dispatch, state }, amount) {
    try {
      commit('TRANSACTION_PROCESS', { step: 'waiting' })

      const { secret, id, payment, code } = await client.post({
        path: '/api/user/deposit',
        body: { amount },
      })

      if (code) {
        throw code
      }

      const before = state.stats.transactions.deposits
      await dispatch('get')
      const after = state.stats.transactions.deposits

      if (before === after) {
        throw 'DepositFaillure'
      }

      commit('TRANSACTION_PROCESS', {
        step: 'after',
        id,
        secret,
        payment: payment,
        amount,
      })
    } catch (error) {
      commit('TRANSACTION_PROCESS', { step: 'faillure' })
      commit('API_ERROR', error, { root: true })
      return Promise.reject(error)
    }
  },

  async withdraw({ commit, dispatch, state }, amount) {
    try {
      commit('TRANSACTION_PROCESS', { step: 'waiting' })

      const { secret, id, payment_hash, code } = await client.post({
        path: '/api/user/withdraw',
        body: { amount },
      })

      if (code) {
        throw code
      }

      dispatch('get')

      commit('TRANSACTION_PROCESS', {
        step: 'after',
        id,
        secret,
        payment: payment_hash,
        amount,
      })
    } catch (error) {
      commit('TRANSACTION_PROCESS', { step: 'faillure' })
      commit('API_ERROR', error, { root: true })
      return Promise.reject(error)
    }
  },

  async getAuthenticationToken() {
    const { token } = await client.get({ path: '/api/user/token' })

    return token
  },
}
