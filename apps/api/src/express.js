const express = require('express')
const routes = require('@/routes/index.js')
const path = require('path')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const winston = require('winston')
const expressWinston = require('express-winston')

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

  app.use(require('@/middleware/cors.js'))

  app.use(bodyParser.json({ extended: false }))
  app.use(bodyParser.text())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.get('/status', (req, res) => {
    res.status(200).end()
  })

  app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      meta: false,
      msg: 'HTTP {{req.method}} {{req.url}}',
      expressFormat: true,
      colorize: true,
    })
  )

  app.use('/api', routes)

  app.use(
    expressWinston.errorLogger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      meta: false,
      msg: 'HTTP {{req.method}} {{req.url}}',
      expressFormat: true,
      colorize: true,
      showStack: true,
    })
  )

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../public')))
  }

  app.use(require('@/middleware/errors.js'))

  return app
}
