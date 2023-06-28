import path from 'node:path'
import process from 'node:process'
import { URL } from 'node:url'

import { createId } from '@paralleldrive/cuid2'
import cors from 'cors'
import express from 'express'
import {
  dnsPrefetchControl,
  expectCt,
  frameguard,
  hidePoweredBy,
  ieNoOpen,
  permittedCrossDomainPolicies,
  referrerPolicy,
  xssFilter,
  noSniff,
} from 'helmet'

import { correctLnurlAuthMethod } from './services/correct.js'
import { deprecatedLnurlAuth } from './services/deprecated.js'

const __dirname = new URL('.', import.meta.url).pathname

const setRequestIdMiddleware = (req, res, next) => {
  req.id = createId()
  next()
}

const corMiddleware = cors({
  exposedHeaders: [
    'Set-Cookie',
    'Cookie',
    'X-RequestId',
    'Access-Control-Allow-Origin',
  ],
  origin: (origin, callback) => {
    callback(null, true)
  },
})

const logMiddleware = (req, res, next) => {
  const { path, method, ip, id } = req

  console.log(
    `time=${new Date().toISOString()} id=${id} ip=${ip} method=${method} path=${path}`
  )

  next()
}

// eslint-disable-next-line no-unused-vars
const logErrorMiddleware = (error, req, res, next) => {
  console.error(error)
  res.status(500).send(error.message)
}

export const createExpressApp = () => {
  const app = express()

  app.use(dnsPrefetchControl())
  app.use(expectCt())
  app.use(frameguard())
  app.use(hidePoweredBy())
  app.use(ieNoOpen())
  app.use(noSniff())
  app.use(permittedCrossDomainPolicies())
  app.use(referrerPolicy())
  app.use(xssFilter())

  app.use(express.json())
  app.use(express.text())
  app.use(express.urlencoded({ extended: false }))

  app.use(logMiddleware)
  app.use(setRequestIdMiddleware)
  app.use(corMiddleware)

  app.get('/correct', async (req, res, next) => {
    try {
      const result = await correctLnurlAuthMethod()
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

  app.get('/deprecated', async (req, res, next) => {
    try {
      const result = await deprecatedLnurlAuth()
      res.json(result)
    } catch (error) {
      next(error)
    }
  })

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../public')))
    // eslint-disable-next-line no-unused-vars
    app.get('*', (req, res, next) => {
      res.sendFile('index.html', { root: path.join(__dirname, '../public') })
    })
  }

  app.use(logErrorMiddleware)

  return app
}
