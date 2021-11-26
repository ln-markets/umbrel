const express = require('express')
const cuid = require('cuid')
const routes = require('@/routes/index.js')
const path = require('path')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const setRequestId = (req, res, next) => {
  const requestId = cuid()
  res.set('X-RequestId', requestId)
  req.id = requestId
  next()
}

module.exports = () => {
  const app = express()

  app.use(helmet.dnsPrefetchControl())
  app.use(helmet.expectCt())
  app.use(helmet.frameguard())
  app.use(helmet.hidePoweredBy())
  app.use(helmet.ieNoOpen())
  app.use(helmet.noSniff())
  app.use(helmet.permittedCrossDomainPolicies())
  app.use(helmet.referrerPolicy())
  app.use(helmet.xssFilter())
  app.use(setRequestId)
  app.use(require('@/middleware/cors.js'))

  app.use(bodyParser.json({ extended: false }))
  app.use(bodyParser.text())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(require('@/middleware/session.js'))
  app.use(require('@/middleware/log-request.js'))

  app.get('/status', (req, res) => {
    res.status(200).end()
  })

  app.use('/api', routes)

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../public')))
  }

  app.use(require('@/middleware/errors.js'))

  return app
}
