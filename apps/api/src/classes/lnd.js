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

const isPortOpen = async (opt = {}) => {
  const { host, port } = opt

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
    return Promise.reject(
      new Error(`LND Port is not open host=${host} port=${port}`)
    )
  }
}

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
      host: process.env.LND_IP,
      port: process.env.LND_GRPC_PORT || 10009,
    }
  }

  async connect() {
    try {
      await isPortOpen(this.config)

      const { cert, macaroon, host, port } = this.config
      const socket = `${host}:${port}`

      const { lnd } = authenticatedLndGrpc({ cert, macaroon, socket })

      this.lnd = lnd
      this.info = await getWalletInfo({ lnd })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  diffieHellmanComputeSecret(params) {
    return diffieHellmanComputeSecret({ ...params, lnd: this.lnd })
  }

  getWalletInfo() {
    return getWalletInfo({ lnd: this.lnd })
  }

  decodePaymentRequest(params) {
    return decodePaymentRequest({ ...params, lnd: this.lnd })
  }

  pay(params) {
    return pay({ ...params, lnd: this.lnd })
  }

  createInvoice(params) {
    return createInvoice({ ...params, lnd: this.lnd })
  }
}

module.exports = new LND()
