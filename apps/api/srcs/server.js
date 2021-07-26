const express = require('express')
const http = require('http')

const config = require('@config')
const expressConfig = require('@loaders/express.js')

const LND = require('@classes/lnd.js')

const createApp = async () => {
  try {
    const app = express()

    await expressConfig(app)

    return app
  } catch (error) {
    return Promise.reject(error)
  }
}

const createServer = (app) => {
  const server = http.createServer(app)

  server.on('error', (error) => {
    console.error(error)
  })

  server.on('listening', () => {
    const { address, port } = server.address()

    console.log(`Server listening on ${address}:${port}`)
  })

  server.listen(config.app.port, '0.0.0.0')

  return server
}

const startDependencies = async () => {
  try {
    await LND.connect()
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = async () => {
  try {
    await startDependencies()

    const app = await createApp()
    const server = createServer(app)

    return server
  } catch (error) {
    return Promise.reject(error)
  }
}
