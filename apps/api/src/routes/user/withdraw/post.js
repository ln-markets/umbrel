import LND from '#src/classes/lnd.js'
import LNMarketsAPI from '#src/classes/lnmarkets-api.js'

export default async (req, res, next) => {
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
