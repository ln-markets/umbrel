const LNMarketsAPI = require('@classes/lnmarkets-api.js')

module.exports = async (req, res) => {
  try {
    const payload = {
      method: 'GET',
      endpoint: '/user',
    }

    const {
      uid,
      balance,
      username,
      linkingpublickey,
      total_deposit_success_count: deposits,
      total_withdraw_success_count: withdrawals,
      total_open_positions: opened,
      total_running_positions: running,
      total_closed_positions: closed,
      total_canceled_positions: canceled,
    } = await LNMarketsAPI.request(payload)

    const user = {
      infos: {
        uid,
        username,
        linkingpublickey,
        balance,
      },
      stats: {
        transactions: {
          deposits,
          withdrawals,
        },
        positions: {
          opened,
          running,
          closed,
          canceled,
        },
      },
    }

    res.json(user)
  } catch (error) {
    res.json(error)
    console.log(error)
  }
}
