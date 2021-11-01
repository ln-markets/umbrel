const LNMarketsAPI = require('@/classes/lnmarkets-api.js')

module.exports = async (req, res, next) => {
  try {
    const {
      uid,
      balance,
      username,
      linkingpublickey,
      total_deposit_success_count,
      total_withdraw_success_count,
      total_open_positions,
      total_running_positions,
      total_closed_positions,
      total_canceled_positions,
    } = await LNMarketsAPI.getUser()

    res.json({
      uid,
      balance,
      username,
      linkingpublickey,
      total_deposit_success_count,
      total_withdraw_success_count,
      total_open_positions,
      total_running_positions,
      total_closed_positions,
      total_canceled_positions,
    })
  } catch (error) {
    next(error)
  }
}
