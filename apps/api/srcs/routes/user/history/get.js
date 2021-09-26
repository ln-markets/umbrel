const LNMarketsAPI = require('@classes/lnmarkets-api.js')

module.exports = async (req, res) => {
  try {
    const deposits = await LNMarketsAPI.request({
      method: 'GET',
      endpoint: '/user/deposit',
      params: {
        limit: 100,
      },
    })

    const withdrawals = await LNMarketsAPI.request({
      method: 'GET',
      endpoint: '/user/withdraw',
      params: {
        limit: 100,
      },
    })

    res.json({ deposits, withdrawals })
  } catch (error) {
    res.json(error)
  }
}
