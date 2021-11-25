const HttpError = require('@/helpers/errors.js')

module.exports = (req, res, next) => {
  try {
    if (req.body.password === process.env.APP_PASSWORD) {
      req.session.auth = true
    } else {
      throw new HttpError(400, 'wrongPassword', 'Given password is incorrect.')
    }

    res.end()
  } catch (error) {
    next(error)
  }
}
