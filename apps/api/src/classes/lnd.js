const fs = require('fs')
const net = require('net')

const {
  authenticatedLndGrpc,
  getWalletInfo,
  diffieHellmanComputeSecret,
  decodePaymentRequest,
  pay,
  createInvoice,
} = require('ln-service')

const base64Certificate = () => {
  const certificate = fs.readFileSync('/lnd/tls.cert', 'utf8')
  const binaryData = Buffer.from(certificate, 'utf8')

  return binaryData.toString('base64').replace('\n', '')
}

const base64Macaroon = () => {
  const certificate = fs.readFileSync(
    `/lnd/data/chain/bitcoin/${process.env.BITCOIN_NETWORK}/admin.macaroon`
  )
  const binaryData = Buffer.from(certificate, 'utf8')

  return binaryData.toString('base64').replace('\n', '')
}

class LND {
  constructor() {
    this.lnd = undefined
    this.info = {}
    this.config = {
      cert: base64Certificate(),
      macaroon: base64Macaroon(),
      host: `${process.env.LND_IP}`,
      port: `${process.env.LND_GRPC_PORT}` || 10009,
    }
  }

  async isPortOpen() {
    const { host, port } = this.config

    try {
      await new Promise((resolve, reject) => {
        const socket = new net.Socket()

        const onError = (error) => {
          socket.destroy()
          reject(error)
        }

        socket.setTimeout(1000)
        socket.once('error', onError)
        socket.once('timeout', onError)

        socket.connect(port, host, () => {
          socket.end()
          resolve()
        })
      })

      return true
    } catch (error) {
      return Promise.reject(new Error('lndPortNotOpen'))
    }
  }

  async connect() {
    try {
      await this.isPortOpen()

      const { cert, macaroon, host, port } = this.config
      const socket = `${host}:${port}`

      const { lnd } = authenticatedLndGrpc({ cert, macaroon, socket })

      this.lnd = lnd
      this.info = await getWalletInfo({ lnd })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async diffieHellmanComputeSecret(options) {
    try {
      Object.assign(options, { lnd: this.lnd })

      return await diffieHellmanComputeSecret(options)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getWalletInfo() {
    try {
      return getWalletInfo({ lnd: this.lnd })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async decodePaymentRequest(options) {
    try {
      Object.assign(options, { lnd: this.lnd })

      return await decodePaymentRequest(options)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async pay(options) {
    try {
      Object.assign(options, { lnd: this.lnd })

      return await pay(options)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async createInvoice(options) {
    try {
      Object.assign(options, { lnd: this.lnd })

      return await createInvoice(options)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

module.exports = new LND()
