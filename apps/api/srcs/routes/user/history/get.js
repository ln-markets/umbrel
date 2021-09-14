const LNMarketsAPI = require('@classes/lnmarkets-api.js')

module.exports = async (req, res) => {
  try {
    const { rawHistory: deposits } = await LNMarketsAPI.request({
      method: 'GET',
      endpoint: '/user/deposit',
      params: {
        limit: 100,
      },
    })

    const { rawHistory: withdrawals } = await LNMarketsAPI.request({
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
