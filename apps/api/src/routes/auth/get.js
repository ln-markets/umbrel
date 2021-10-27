const LNMarketsAPI = require('@/classes/lnmarkets-api.js')

module.exports = async (req, res, next) => {
  try {
    const parts = LNMarketsAPI.hostname.split('.')
    parts.shift()
    const token = await LNMarketsAPI.createToken()

    res.json({ hostname: parts.join('.'), token })
  } catch (error) {
    next(error)
  }
}
