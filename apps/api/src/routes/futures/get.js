const LNMarketsAPI = require('@/classes/lnmarkets-api.js')

module.exports = async (req, res, next) => {
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
