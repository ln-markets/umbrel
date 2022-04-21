import path from 'node:path'
import process from 'node:process'

import bodyParser from 'body-parser'
import cuid from 'cuid'
import express from 'express'
import helmet from 'helmet'

import context from '#src/helpers/context.js'
import HttpError from '#src/helpers/errors.js'
import cors from '#src/middleware/cors.js'
import errors from '#src/middleware/errors.js'
import logRequest from '#src/middleware/log-request.js'
import session from '#src/middleware/session.js'
import routes from '#src/routes/index.js'

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

export default () => {
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

  app.use(cors)

  app.use(setRequestId)
  app.use(asyncContext)

  app.use(session)

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

  app.use(logRequest(['password']))

  app.use('/api', routes)

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../public')))
    // eslint-disable-next-line no-unused-vars
    app.get('*', (req, res, next) => {
      res.sendFile('index.html', { root: path.join(__dirname, '../public') })
    })
  }

  app.use(errors)

  return app
}
