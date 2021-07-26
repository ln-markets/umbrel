const LNMarketsAPI = require('@classes/lnmarkets-api.js')
const LND = require('@classes/lnd.js')

module.exports = async (req, res) => {
  try {
    const { amount } = req.body
    const { request: invoice } = await LND.createInvoice({
      description: 'LnMarkets Withdraw',
      tokens: amount,
    })

    const payload = {
      method: 'POST',
      endpoint: '/user/withdraw',
      params: {
        amount,
        invoice,
      },
    }

    const response = await LNMarketsAPI.request(payload)

    res.json(response)
  } catch (error) {
    res.json(error)
  }
}
