const LNMarketsAPI = require('@/classes/lnmarkets-api.js')
const LND = require('@/classes/lnd.js')

module.exports = async (req, res, next) => {
  try {
    const { amount } = req.body

    const {
      depositId: id,
      paymentRequest: request,
    } = await LNMarketsAPI.deposit({ amount })

    const { tokens } = await LND.decodePaymentRequest({ request })

    if (amount !== tokens) {
      throw new Error('WrongAmountInvoice')
    }

    const { secret, paths } = await LND.pay({ request })

    res.json({ secret, id, payment: paths[0].payment })
  } catch (error) {
    next(error)
  }
}
