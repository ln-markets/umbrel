const { LNMarketsRest } = require('@ln-markets/api')
const { createLnurlAuthPubkeyAndSignature } = require('@/helpers/lnurl.js')

const isTokenExpired = (token) => {
  const convertBase64 = (input) => {
    input = input.replace(/-/g, '+').replace(/_/g, '/')

    const pad = input.length % 4

    if (pad) {
      if (pad === 1) {
        throw new Error('InvalidLengthError')
      }
      input += new Array(5 - pad).join('=')
    }

    return input
  }

  const convertedString = convertBase64(token.split('.')[1])
  const payload = Buffer.from(convertedString, 'base64').toString()

  const { exp } = JSON.parse(payload)
  const now = Math.floor(Date.now() / 1000)

  return now >= exp
}

class LNMarketsAPI extends LNMarketsRest {
  constructor() {
    super({ network: process.env.BITCOIN_NETWORK })
    this.doNotCheckToken = false
  }

  async beforeRequestApi(options) {
    try {
      if (!this.doNotCheckToken) {
        if (!this.token || isTokenExpired(this.token)) {
          // Mutex du pauvre
          this.doNotCheckToken = true
          this.token = await this.createToken()

          this.doNotCheckToken = false
        }
      }

      return this.requestAPI(options)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async createToken() {
    try {
      const { lnurl } = await this.getLnurlAuth()
      const params = await createLnurlAuthPubkeyAndSignature({ lnurl })
      const { token } = await this.lnurlAuth(params)
      return token
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

module.exports = new LNMarketsAPI()
