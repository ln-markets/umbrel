const got = require('got')

const config = require('@config')

const LNURL = require('@wrappers/lnurl.js')

const convertBase64 = async (input) => {
  try {
    input = input.replace(/-/g, '+').replace(/_/g, '/')

    const pad = input.length % 4

    if (pad) {
      if (pad === 1) {
        throw new Error('InvalidLengthError')
      }
      input += new Array(5 - pad).join('=')
    }

    return input
  } catch (error) {
    return Promise.reject(error)
  }
}

class LNMarketsAPI {
  constructor() {
    this.token = undefined
  }

  async tokenCheck() {
    try {
      if (this.token) {
        const convertedString = await convertBase64(this.token.split('.')[1])
        const payload = Buffer.from(convertedString, 'base64').toString()

        const { jti, exp } = JSON.parse(payload)
        const now = Math.floor(Date.now() / 1000)

        if (now > exp) {
          const { token } = await this.generateToken()

          this.token = token

          const payload = {
            method: 'DELETE',
            endpoint: '/user/jwt',
            params: { jti },
          }

          await this.request(payload)
        }
      } else {
        const { token } = await this.generateToken()

        this.token = token
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async generateToken() {
    try {
      const params = await LNURL.auth()
      const payload = {
        method: 'GET',
        endpoint: '/lnurl/auth',
        params,
      }

      const { token } = await this.request(payload)

      this.token = token

      return { token }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async request({ method, endpoint, params }) {
    try {
      const options = {
        method,
        responseType: 'json',
        https: {
          rejectUnauthorized: config.lnmarkets.url === 'https://localhost',
        },
      }

      if (method.match(/^(PUT|POST)$/) && params) {
        Object.assign(options, { json: params })
      } else if (method.match(/^(GET|DELETE)$/) && params) {
        Object.assign(options, { searchParams: params })
      }

      if (!endpoint.match(/^\/lnurl\/auth$/)) {
        await this.tokenCheck()

        Object.assign(options, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
      }

      const { url, version } = config.lnmarkets
      const { body } = await got(`${url}${version}${endpoint}`, options)

      return body
    } catch (error) {
      return Promise.reject(error.response.body)
    }
  }
}

module.exports = new LNMarketsAPI()
