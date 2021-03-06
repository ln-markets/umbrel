import HttpError from '#src/helpers/errors.js'

export default (req, res, next) => {
  if (!req.session || !req.session.auth) {
    throw new HttpError(
      401,
      'unauthorized',
      'You do not have permission to reach this ressource.'
    )
  }
  next()
}
