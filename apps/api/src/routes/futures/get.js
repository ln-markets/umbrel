import LNMarketsAPI from '#src/classes/lnmarkets-api.js'

export default async (req, res, next) => {
  try {
    const positions = await LNMarketsAPI.futuresGetPositions({
      type: 'running',
      limit: 50,
    })

    res.json(positions)
  } catch (error) {
    next(error)
  }
}
