const dotenv = require('dotenv')
dotenv.config()

const def = {
  userSecret: 'Default user secret change me',
}

const session = require('express-session')

module.exports = session({
  secret: process.env.SESSION_USER_SECRET || def.userSecret,
  resave: false,
  saveUninitialized: true,
  name: process.env.SESSION_USER_COOKIE_NAME || 'session',
  cookie: {
    httpOnly: true,
    maxAge:
      parseInt(process.env.SESSION_USER_COOKIE_MAXAGE) ||
      1000 * 60 * 60 * 24 * 30,
    path: '/',
    sameSite: process.env.SESSION_COOKIE_SAMESITE || true,
  },
})
