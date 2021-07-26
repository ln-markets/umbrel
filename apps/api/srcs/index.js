const path = require('path')
require('module-alias')(path.join(__dirname, '..'))

const createServer = require('@srcs/server.js')

process.on('unchaughtException', (error) => {
  console.error(error)
})

const api = async () => {
  try {
    await createServer()
  } catch (error) {
    console.error(error)
    process.exit(-1)
  }
}

api()
