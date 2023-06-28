import http from 'node:http'

import { config } from './config.js'

export const createServer = (app) => {
  const server = http.createServer(app)

  server.on('error', (error) => {
    console.error(error)
  })

  return new Promise((resolve, reject) => {
    server.once('error', reject)
    server.once('listening', () => {
      const { address, port } = server.address()

      console.log(`Server listening on ${address}:${port}`)
      resolve(server)
    })

    server.listen(config.port, '0.0.0.0')
  })
}
