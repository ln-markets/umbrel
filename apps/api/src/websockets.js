import { LNMarketsWebsocket } from '@ln-markets/api'
import Websocket from 'ws'

import log from '#src/logger/index.js'

const OPEN = 1

export default async (server) => {
  try {
    const lnm = new LNMarketsWebsocket({ network: process.env.BITCOIN_NETWORK })
    const ws = new Websocket.Server({
      server,
      maxPayload: 1024,
      clientTracking: true,
    })

    lnm.on('connected', () => {
      log.info(`Connected to ${lnm.hostname} websockets`)
    })

    lnm.on('message', (message) => {
      ws.clients.forEach((client) => {
        if (client.readyState === OPEN) {
          client.send(JSON.stringify(message))
        }
      })
    })

    await lnm.connect()
    await lnm.subscribe({
      params: [
        'futures/btc_usd/index',
        'futures/btc_usd/lastPrice',
        'options/market/volatility',
      ],
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
