import LNMarketsAPI from '#src/classes/lnmarkets-api.js'

export default async (req, res, next) => {
  try {
    const positions = await LNMarketsAPI.optionsGetPositions()

    res.json(positions)
  } catch (error) {
    next(error)
  }
}
