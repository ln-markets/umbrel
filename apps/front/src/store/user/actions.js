import api from '@/plugins/api.js'

const UPDATE_INTERVAL = 15

export default {
  updateProfileInterval({ dispatch }) {
    setInterval(() => {
      dispatch('get')
      dispatch('futures/get', undefined, { root: true })
    }, UPDATE_INTERVAL * 1000)
  },

  async get({ commit, dispatch }) {
    try {
      const infos = await api.get({ path: '/api/user' })

      commit('UPDATE_USER', infos)
    } catch (error) {
      return dispatch('error', error, { root: true })
    }
  },

  async deposit({ commit, dispatch }, amount) {
    try {
      const { secret, id, payment } = await api.post({
        path: '/api/user/deposit',
        body: { amount },
      })

      commit('ADD_BALANCE', amount)

      this.$vm.$notify({
        type: 'success',
        message: `Deposit success! - ${amount.toLocaleString('en')} sats.`,
      })

      this.$vm.$vfm.hide('ModalDeposit')

      return { secret, id, payment }
    } catch (error) {
      return dispatch('error', error, { root: true })
    }
  },

  async withdraw({ commit, dispatch, state }, amount) {
    try {
      const { secret, id, payment, fee } = await api.post({
        path: '/api/user/withdraw',
        body: { amount },
      })

      commit('REMOVE_BALANCE', amount)

      this.$vm.$notify({
        type: 'success',
        message: `Withdraw success! - ${amount.toLocaleString('en')} sats.`,
      })

      this.$vm.$vfm.hide('ModalWithdraw')

      return { secret, id, payment, fee }
    } catch (error) {
      return dispatch('error', error, { root: true })
    }
  },

  async loginToLNMarkets({ dispatch }) {
    try {
      const { token, hostname } = await api.get({ path: '/api/auth' })
      window.open(`https://${hostname}/login/token?token=${token}`, '_blank')
    } catch (error) {
      return dispatch('error', error, { root: true })
    }
  },
}
