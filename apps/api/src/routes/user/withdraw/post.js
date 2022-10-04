import { performance } from 'node:perf_hooks'

import LND from '#src/classes/lnd.js'
import LNMarketsAPI from '#src/classes/lnmarkets-api.js'

export default async (req, res, next) => {
  try {
    const { amount } = req.body
    const start = performance.now()
    const { request: invoice } = await LND.createInvoice({
      description: 'LN Markets Withdraw',
      tokens: amount,
    })
    const afterInvoice = performance.now()
    const {
      paymentsecret: secret,
      paymenthash: payment,
      id,
      fee,
    } = await LNMarketsAPI.withdraw({ amount, invoice })
    const afterWithdraw = performance.now()
    console.log({
      invoice: `${(afterInvoice - start).toFixed(6)} ms`,
      pay: `${(afterWithdraw - afterInvoice).toFixed(6)} ms`,
    })
    res.json({ secret, id, payment, fee })
  } catch (error) {
    next(error)
  }
}
