const HttpError = require('@/helpers/errors.js')

module.exports = (req, res, next) => {
  try {
    const { body } = req

    if (body.password === process.env.APP_PASSWORD) {
      req.session.auth = true
    } else if (req.session && req.session.id) {
      throw new HttpError(400, 'alreadyLoggedIn', 'You are already logged in.')
    } else {
      throw new HttpError(400, 'wrongPassword', 'Given password is incorrect.')
    }

    res.json({ auth: true })
  } catch (error) {
    next(error)
  }
}
