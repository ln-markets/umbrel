import HttpError from '#src/helpers/errors.js'

export default (req, res, next) => {
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
