const LNMarketsAPI = require('@classes/lnmarkets-api.js')

module.exports = async (req, res) => {
  try {
    const payload = {
      method: 'GET',
      endpoint: '/user/deposit',
      params: {
        getLength: true,
      },
    }

    const { dateSliceLength: nbDeposits } = await LNMarketsAPI.request(payload)

    payload.endpoint = '/user/withdraw'

    const { dateSliceLength: nbWithdrawals } = await LNMarketsAPI.request(
      payload
    )

    delete payload.params.getLength
    payload.params.nbItem = nbWithdrawals || 1

    const { rawHistory: withdrawals } = await LNMarketsAPI.request(payload)

    payload.params.nbItem = nbDeposits || 1
    payload.endpoint = '/user/deposit'

    const { rawHistory: deposits } = await LNMarketsAPI.request(payload)

    res.json({ deposits, withdrawals })
  } catch (error) {
    res.json(error)
  }
}
