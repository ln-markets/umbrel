import LNMarketsAPI from '#src/classes/lnmarkets-api.js'

export default async (req, res, next) => {
  try {
    const {
      uid,
      balance,
      username,
      linkingpublickey,
      total_deposit_success_count,
      total_withdraw_success_count,
      total_open_positions,
      total_open_quantity,
      total_open_margin,
      total_canceled_positions,
      total_running_quantity,
      total_running_positions,
      total_running_margin,
      total_closed_positions,
      options: {
        total_running_quantity: total_option_running_quantity,
        total_running_trades,
        total_closed_trades,
      },
    } = await LNMarketsAPI.getUser()

    const response = {
      account: {
        uid,
        available_balance: balance,
        username,
        linkingpublickey,
      },
      stats: {
        transactions: {
          deposits: total_deposit_success_count,
          withdrawals: total_withdraw_success_count,
        },
        futures: {
          opened: {
            quantity: total_open_quantity,
            positions: total_open_positions,
            margin: total_open_margin,
          },
          running: {
            quantity: total_running_quantity,
            positions: total_running_positions,
            margin: total_running_margin,
          },
          canceled: {
            positions: total_canceled_positions,
          },
          closed: {
            positions: total_closed_positions,
          },
        },
        options: {
          running: {
            quantity: total_option_running_quantity,
            positions: total_running_trades,
          },
          closed: {
            positions: total_closed_trades,
          },
        },
      },
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
}
