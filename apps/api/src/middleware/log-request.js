import log from '#src/logger/index.js'

export default (doNotLogParams) => {
  return (req, res, next) => {
    const { path, method } = req

    const clone = JSON.parse(JSON.stringify({ ...req.query, ...req.body }))
    const app = req.headers['LNM-ACCESS-APP'] || null

    if (Object.keys(clone).length > 0) {
      for (const key in clone) {
        if (
          process.env.NODE_ENV !== 'development' &&
          doNotLogParams.indexOf(key) > -1
        ) {
          delete clone[key]
        }
      }

      const params = JSON.stringify(clone)
      log.info({ method, path, app, params })
    } else {
      log.info({ method, path, app })
    }

    next()
  }
}
