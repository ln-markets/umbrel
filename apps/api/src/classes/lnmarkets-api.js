import { LNMarketsRest } from '@ln-markets/api'
import fetch from 'node-fetch'

import { createLnurlAuthPubkeyAndSignature } from '#src/helpers/lnurl.js'

const isCookieExpired = (cookie) => {
  const expiry = Date.parse(
    cookie
      .split('; ')
      .find((property) => property.startsWith('Expires='))
      .substring(8) // Lenght of Expires=, to only get the date.
  )
  const now = Date.now()

  return now > expiry
}

const network = process.env.BITCOIN_NETWORK

const customHeaders = {
  'LNM-ACCESS-APP': 'Umbrel',
}

class LNMarketsAPI extends LNMarketsRest {
  constructor() {
    super({ network, customHeaders, skipApiKey: true })

    this.doNotCheckCookie = false
  }

  async beforeRequestApi(options) {
    try {
      if (
        !this.doNotCheckCookie &&
        (!this.cookie || isCookieExpired(this.cookie))
      ) {
        await this.authenticate()
      }

      if (options.credentials) {
        options.headers = {
          Cookie: this.cookie,
        }
      }

      return this.requestAPI(options)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async authenticate(opt = {}) {
    try {
      const { withJWT = false } = opt

      this.doNotCheckCookie = true

      const authResponse = await fetch(
        'https://api.kibotrel.lnmarkets.dev/v1/lnurl/auth',
        {
          method: 'post',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' },
          credentials: true,
        }
      )

      const cookie = authResponse.headers.get('set-cookie')
      const { lnurl } = await authResponse.json()

      const params = new URLSearchParams(
        await createLnurlAuthPubkeyAndSignature({ lnurl, withJWT })
      )

      const response = await fetch(
        `https://${this.hostname}/${
          this.version
        }/lnurl/auth?${params.toString()}`,
        {
          credentials: true,
          headers: { Cookie: cookie },
        }
      )

      if (!withJWT) {
        this.cookie = cookie
      }

      this.doNotCheckCookie = false

      return response.json()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default new LNMarketsAPI()
