import http from 'node:http'

import LND from '#src/classes/lnd.js'
import log from '#src/logger/index.js'

import createExpressApp from './express.js'
import WebsocketServer from './websockets.js'

process.on('unchaughtException', (error) => {
  log.error(error)
})

const main = async () => {
  try {
    await LND.connect()
    const app = createExpressApp()
    const server = http.createServer(app)

    WebsocketServer(server)

    server.on('error', (error) => {
      log.error(error)
    })

    server.on('listening', () => {
      const { address, port } = server.address()

      log.info(`Server listening on ${address}:${port}`)
    })

    const port = process.env.API_PORT || 4242
    const host = process.env.APP_HOST || '0.0.0.0'

    server.listen(port, host)
  } catch (error) {
    log.crit(error)
    // eslint-disable-next-line no-process-exit
    process.exit(-1)
  }
}

main()
