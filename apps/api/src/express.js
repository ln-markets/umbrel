const express = require('express')
const cuid = require('cuid')
const routes = require('@/routes/index.js')
const path = require('path')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const context = require('@/helpers/context.js')
const HttpError = require('@/helpers/errors.js')

const setRequestId = (req, res, next) => {
  const requestId = cuid()
  res.set('X-RequestId', requestId)
  req.id = requestId
  next()
}

const asyncContext = (req, res, next) => {
  try {
    const store = new Map()

    context.run(store, () => {
      store.set('reqid', req.id)
      store.set('ip', req.ip)

      next()
    })
  } catch (error) {
    next(error)
  }
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

  app.use(bodyParser.json({ extended: false }))
  app.use(bodyParser.text())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(require('@/middleware/cors.js'))

  app.use(setRequestId)
  app.use(asyncContext)

  app.use(require('@/middleware/session.js'))
  app.use(require('@/middleware/log-request.js')(['password']))

  app.get('/status', (req, res) => {
    res.status(200).end()
  })

  app.get('/401', (req, res, next) => {
    next(
      new HttpError(
        401,
        'unauthorized',
        'You do not have permission to reach this ressource.'
      )
    )
  })

  app.use('/api', routes)

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../public')))
  }

  app.use(require('@/middleware/errors.js'))

  return app
}
