const LNMarketsAPI = require('@classes/lnmarkets-api.js')
const LND = require('@classes/lnd.js')

module.exports = async (req, res) => {
  try {
    const { amount } = req.body

    const payload = {
      method: 'POST',
      endpoint: '/user/deposit',
      params: {
        amount,
      },
    }

    const { paymentRequest: request } = await LNMarketsAPI.request(payload)

    const { tokens } = await LND.decodePaymentRequest({ request })

    if (amount !== tokens) {
      throw new Error('WrongAmountInvoice')
    }

    const response = await LND.pay({ request })

    res.json(response)
  } catch (error) {
    res.json(error)
  }
}
