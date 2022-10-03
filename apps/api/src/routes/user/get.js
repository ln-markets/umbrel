import LNMarketsAPI from '#src/classes/lnmarkets-api.js'

export default async (req, res, next) => {
  try {
    const { uid, balance, username, linkingpublickey, metrics } =
      await LNMarketsAPI.getUser()

    const response = {
      account: {
        uid,
        available_balance: balance,
        username,
        linkingpublickey,
      },
      metrics: {
        transactions: {
          deposits: metrics.wallet.total_deposit_amount,
          withdrawals: metrics.wallet.total_withdraw_amount,
        },
        futures: {
          opened: {
            quantity: metrics.futures.total_open_quantity,
            margin: metrics.futures.total_open_margin,
          },
          running: {
            quantity: metrics.futures.total_running_quantity,
            margin: metrics.futures.total_running_margin,
          },
          closed: {
            quantity: metrics.futures.total_closed_quantity,
            margin: metrics.futures.total_closed_margin,
            pl: metrics.futures.total_pl_realised,
          },
        },
        options: {
          running: {
            quantity: metrics.options.total_running_quantity,
          },
          closed: {
            pl: metrics.options.total_closed_pl,
            quantity: metrics.options.total_closed_quantity,
          },
        },
      },
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
}
