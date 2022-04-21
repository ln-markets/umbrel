import session from 'express-session'

export default session({
  secret: process.env.APP_PASSWORD,
  resave: false,
  saveUninitialized: true,
  name: 'lnmarkets-umbrel',
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: '/',
    sameSite: true,
  },
})
