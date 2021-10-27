const path = require('path')
require('module-alias')(path.join(__dirname, '..'))

const createServer = require('./server.js')

process.on('unchaughtException', (error) => {
  console.error(error)
})

const api = async () => {
  try {
    await createServer()
  } catch (error) {
    console.error(error)
    // eslint-disable-next-line no-process-exit
    process.exit(-1)
  }
}

api()
