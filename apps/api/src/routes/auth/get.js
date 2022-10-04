import LNMarketsAPI from '#src/classes/lnmarkets-api.js'

export default async (req, res, next) => {
  try {
    const parts = LNMarketsAPI.hostname.split('.')

    parts.shift()

    const { token } = await LNMarketsAPI.authenticate({ withJWT: true })

    res.json({ hostname: parts.join('.'), token })
  } catch (error) {
    next(error)
  }
}
