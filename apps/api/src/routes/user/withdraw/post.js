const LNMarketsAPI = require('@/classes/lnmarkets-api.js')
const LND = require('@/classes/lnd.js')

module.exports = async (req, res, next) => {
  try {
    const { amount } = req.body

    const { request: invoice } = await LND.createInvoice({
      description: 'LN Markets Withdraw',
      tokens: amount,
    })

    const {
      paymentsecret: secret,
      paymenthash: payment,
      id,
      fee,
    } = await LNMarketsAPI.withdraw({ amount, invoice })

    res.json({ secret, id, payment, fee })
  } catch (error) {
    next(error)
  }
}
