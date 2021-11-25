const HttpError = require('@/helpers/errors.js')

module.exports = (req, res, next) => {
  if (!req.session || !req.session.auth) {
    throw new HttpError(
      401,
      'unauthorized',
      'You do not have permission to reach this ressource.'
    )
  }
  next()
}
