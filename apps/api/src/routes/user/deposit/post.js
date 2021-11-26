const LNMarketsAPI = require('@/classes/lnmarkets-api.js')
const LND = require('@/classes/lnd.js')

const HttpError = require('@/helpers/errors.js')

module.exports = async (req, res, next) => {
  try {
    const { amount } = req.body

    const {
      depositId: id,
      paymentRequest: request,
    } = await LNMarketsAPI.deposit({ amount })

    const { tokens } = await LND.decodePaymentRequest({ request })

    if (amount !== tokens) {
      throw new HttpError(
        400,
        'WrongAmountInvoice',
        'Amount request does not match with tokens in payment request.'
      )
    }

    const { secret } = await LND.pay({ request, max_paths: 4 })

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
