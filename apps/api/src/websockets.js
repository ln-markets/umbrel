const { LNMarketsWebsocket } = require('@ln-markets/api')
const { Server } = require('ws')

const OPEN = 1

module.exports = async (server) => {
  try {
    const lnm = new LNMarketsWebsocket({ network: process.env.BITCOIN_NETWORK })
    const ws = new Server({
      server,
      maxPayload: 1024,
      clientTracking: true,
    })

    lnm.on('connected', (message) => {
      console.log(`Connected to ${lnm.hostname} websockets`)
    })

    lnm.on('message', (message) => {
      ws.clients.forEach(function each(client) {
        if (client.readyState === OPEN) {
          client.send(JSON.stringify(message))
        }
      })
    })

    await lnm.connect()
    await lnm.subscribe({
      params: ['futures/market/index', 'futures/market/bid-offer'],
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
