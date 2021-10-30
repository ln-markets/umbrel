const path = require('path')
require('module-alias')(path.join(__dirname, '..'))
const express = require('express')
const http = require('http')
const LND = require('@/classes/lnd.js')
const WebsocketServer = require('./websockets.js')
const app = express()

process.on('unchaughtException', (error) => {
  console.error(error)
})

const main = async () => {
  try {
    await LND.connect()
    require('@/loaders/express.js')(app)
    const server = http.createServer(app)
    WebsocketServer(server)

    server.on('error', (error) => {
      console.error(error)
    })

    server.on('listening', () => {
      const { address, port } = server.address()

      console.log(`Server listening on ${address}:${port}`)
    })

    const port = process.env.APP_PORT || 4242
    const host = process.env.APP_HOST || '0.0.0.0'

    server.listen(port, host)
  } catch (error) {
    console.error(error)
    // eslint-disable-next-line no-process-exit
    process.exit(-1)
  }
}

main()
