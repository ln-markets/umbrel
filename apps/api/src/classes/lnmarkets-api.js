import { createHash } from 'node:crypto'

import { LNMarketsRest } from '@ln-markets/api'
import fetch from 'node-fetch'
import secp256k1 from 'secp256k1'

import {
  createLnurlAuthPubkeyAndSignature,
  createLnurlAuthPubkeyAndSignatureDeprecated,
  generateKeys,
} from '#src/helpers/lnurl.js'

const isCookieExpired = (cookie) => {
  const expiry = Date.parse(
    cookie
      .split('; ')
      .find((property) => property.startsWith('Expires='))
      .substring(8) // Length of Expires=, to only get the date.
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
      const { withJWT = false, deprecatedAuth = false } = opt

      this.doNotCheckCookie = true

      const authResponse = await fetch(
        `https://${this.hostname}/${this.version}/lnurl/auth`,
        {
          method: 'post',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' },
          credentials: true,
        }
      )

      const cookie = authResponse.headers.get('set-cookie')
      const { lnurl } = await authResponse.json()

      const params = deprecatedAuth
        ? new URLSearchParams(
            await createLnurlAuthPubkeyAndSignatureDeprecated({
              lnurl,
              withJWT,
            })
          )
        : new URLSearchParams(
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

  async migrateAccount() {
    try {
      await this.authenticate({ withJWT: false, deprecatedAuth: true })

      const { k1 } = await this.beforeRequestApi({
        credentials: true,
        method: 'GET',
        path: '/lnurl/auth/migrate',
      })

      this.doNotCheckCookie = true

      const { publicKey, privateKey } = await generateKeys(this.hostname)

      // Hash the migration message and sign it
      const migrationMessageHash = createHash('sha256')
        .update(
          Buffer.from(
            `I AM MIGRATING MY LN MARKETS ACCOUNT TO A NEW LNURL PUBKEY ${k1}`,
            'utf8'
          )
        )
        .digest('hex')

      const { signature } = secp256k1.ecdsaSign(
        Buffer.from(migrationMessageHash, 'hex'),
        Buffer.from(privateKey, 'hex')
      )
      const signatureDER = secp256k1.signatureExport(signature)

      await this.beforeRequestApi({
        method: 'POST',
        path: '/lnurl/auth/migrate',
        params: {
          k1,
          publicKey,
          signature: Buffer.from(signatureDER).toString('hex'),
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.doNotCheckCookie = false
      this.cookie = undefined
    }
  }
}

export default new LNMarketsAPI()
