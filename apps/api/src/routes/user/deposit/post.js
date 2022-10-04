import { performance } from 'node:perf_hooks'

import LND from '#src/classes/lnd.js'
import LNMarketsAPI from '#src/classes/lnmarkets-api.js'
import HttpError from '#src/helpers/errors.js'

export default async (req, res, next) => {
  try {
    const { amount } = req.body

    const start = performance.now()
    const { depositId: id, paymentRequest: request } =
      await LNMarketsAPI.deposit({ amount })
    const afterApiCall = performance.now()
    const { tokens } = await LND.decodePaymentRequest({ request })
    const afterDecodePayment = performance.now()
    if (amount !== tokens) {
      throw new HttpError(
        400,
        'WrongAmountInvoice',
        'Amount request does not match with tokens in payment request.'
      )
    }

    const { secret } = await LND.pay({ request, max_paths: 4 })
    const afterPay = performance.now()

    console.log({
      request: `${(afterApiCall - start).toFixed(6)} ms`,
      decode: `${(afterDecodePayment - afterApiCall).toFixed(6)} ms`,
      pay: `${(afterPay - afterDecodePayment).toFixed(6)} ms`,
    })
    res.json({ secret, id })
  } catch (error) {
    if (Array.isArray(error)) {
      // Weird AF ?
      if (error[1] === 'ExpectedPaymentFeeMillitokensAmountForPendingPayment') {
        res.end()
      } else {
        next(new HttpError(400, 'lndError', error[1]))
      }
    } else {
      next(error)
    }
  }
}
