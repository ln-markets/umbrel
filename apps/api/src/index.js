import { pathToFileURL } from 'node:url'

import { config } from './config.js'
import { createExpressApp } from './express.js'
import { createServer } from './server.js'
import { createLndGrpc } from './services/lnd.js'
import { getHostname } from './services/utils.js'

export const start = async () => {
  const hostname = getHostname(config.network)
  console.log(`Using domain ${hostname}`)

  const lnd = createLndGrpc()
  const info = await lnd.getWalletInfo()
  console.log(`Connected to ${info.alias} (${info.version})`)

  const app = createExpressApp()
  await createServer(app)
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await start()
}
