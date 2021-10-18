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

    const {
      depositId: id,
      paymentRequest: request,
    } = await LNMarketsAPI.request(payload)

    const { tokens } = await LND.decodePaymentRequest({ request })

    if (amount !== tokens) {
      throw new Error('WrongAmountInvoice')
    }

    const { secret, paths } = await LND.pay({ request })

    res.json({ secret, id, payment: paths[0].payment })
  } catch (error) {
    res.json(error)
  }
}
