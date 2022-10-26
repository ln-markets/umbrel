import LNMarketsAPI from '#src/classes/lnmarkets-api.js'

export default async (req, res, next) => {
  try {
    const { max_withdraw_amount } = await LNMarketsAPI.appConfiguration()

    res.json({ max_withdraw_amount })
  } catch (error) {
    next(error)
  }
}
