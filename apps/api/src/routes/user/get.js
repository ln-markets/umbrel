import LNMarketsAPI from '#src/classes/lnmarkets-api.js'

export default async (req, res, next) => {
  try {
    const response = await LNMarketsAPI.getUser()

    res.json(response)
  } catch (error) {
    next(error)
  }
}
