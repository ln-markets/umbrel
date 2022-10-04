import { performance } from 'node:perf_hooks'

import LNMarketsAPI from '#src/classes/lnmarkets-api.js'

export default async (req, res, next) => {
  try {
    const parts = LNMarketsAPI.hostname.split('.')

    parts.shift()

    const start = performance.now()
    const { token } = await LNMarketsAPI.authenticate({ withJWT: true })
    const afterAuth = performance.now()

    console.log({ auth: `${(afterAuth - start).toFixed(6)} ms` })
    res.json({ hostname: parts.join('.'), token })
  } catch (error) {
    next(error)
  }
}
