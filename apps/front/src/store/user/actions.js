import client from '../../plugins/client.js'

export default {
  async get({ commit }) {
    try {
      const infos = await client.get({ path: '/api/user' })

      commit('UPDATE_USER', infos)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async transactionHistory({ commit }) {
    try {
      const { deposits, withdrawals } = await client.get({
        path: '/api/user/history',
      })

      if (deposits) {
        commit('DEPOSIT_TRANSACTIONS', deposits)
      }

      if (withdrawals) {
        commit('WITHDRAWAL_TRANSACTIONS', withdrawals)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async deposit({ commit, dispatch, state }, amount) {
    try {
      commit('DEPOSIT_PROCESS', { step: 'waiting' })

      const { secret, code } = await client.post({
        path: '/api/user/deposit',
        body: { amount },
      })

      if (code) {
        throw code
      }

      await dispatch('get')
      await dispatch('transactionHistory')

      const { transactions } = state.deposits
      const { id, payment_hash } = transactions[transactions.length - 1]

      commit('DEPOSIT_PROCESS', {
        step: 'after',
        id,
        secret,
        payment: payment_hash,
        amount,
      })
    } catch (error) {
      commit('DEPOSIT_PROCESS', { step: 'faillure' })
      return Promise.reject(error)
    }
  },

  async withdraw({ commit, dispatch, state }, amount) {
    try {
      commit('WITHDRAW_PROCESS', { step: 'waiting' })

      const { paymentsecret: secret, code } = await client.post({
        path: '/api/user/withdraw',
        body: { amount },
      })

      if (code) {
        throw code
      }

      dispatch('get')
      dispatch('transactionHistory')

      const { transactions } = state.withdrawals
      const { id, payment_hash } = transactions[transactions.length - 1]

      commit('WITHDRAW_PROCESS', {
        step: 'after',
        id,
        secret,
        payment: payment_hash,
        amount,
      })
    } catch (error) {
      commit('WITHDRAW_PROCESS', { step: 'faillure' })
      return Promise.reject(error)
    }
  },

  async getAuthenticationToken() {
    const { token } = await client.get({ path: '/api/user/token' })

    return token
  },
}
