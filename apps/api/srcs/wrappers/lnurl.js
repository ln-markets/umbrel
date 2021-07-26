const LND = require('@classes/lnd.js')

const got = require('got')
const queryString = require('querystring')

const bip39 = require('bip39')
const bip32 = require('bip32')
const { bech32 } = require('bech32')
const secp256k1 = require('secp256k1')

const { createHmac } = require('crypto')

const config = require('@config')

const hexStringToArray = (string) => {
  return new Uint8Array(
    string.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  )
}

const arrayToHexString = (array) => {
  return array.reduce(
    (string, byte) => `${string}${byte.toString(16).padStart(2, '0')}`,
    ''
  )
}

const auth = async () => {
  try {
    const {
      lnmarkets: { url: lnm, version },
    } = config

    // Retrieves authentication url for lnmarkets api with its
    // parameters (mostly k1, tag and hmac).

    const options = {
      method: 'POST',
      responseType: 'json',
      resolveBodyOnly: true,
      https: {
        rejectUnauthorized: config.lnmarkets.url === 'https://localhost',
      },
    }

    const { lnurl } = await got(`${lnm}${version}/lnurl/auth`, options)

    if (!lnurl) {
      throw new Error('lnurlNotFound')
    }

    const { words } = bech32.decode(lnurl, 500)
    const bytes = bech32.fromWords(words)
    const url = Buffer.from(bytes).toString()

    const { host } = new URL(url)
    const queryParams = url.substring(url.indexOf('?'), url.length)
    const { k1, hmac } = queryString.parse(queryParams)

    if (!host || !k1) {
      throw new Error('MissingInformations')
    }

    const { public_key } = await LND.getWalletInfo()

    if (!public_key) {
      throw new Error('NodePubkeyMissing')
    }

    // Computes private and public keys to sign a feedback message.

    const { secret } = await LND.diffieHellmanComputeSecret({
      key_family: 138,
      key_index: 0,
      partner_public_key: public_key,
    })
    const hash = createHmac('sha256', secret).update(host).digest('hex')

    const seed = bip39.entropyToMnemonic(hash)
    const base58 = bip39.mnemonicToSeedSync(seed)

    const node = bip32.fromSeed(base58)
    const nodeBytes =
      hash.match(/.{1,4}/g)?.map((byte) => parseInt(byte, 16)) || []
    const derivedSeed = node.derivePath(
      `m/138/${nodeBytes.slice(0, 4).join('/')}`
    )

    const privateKey = derivedSeed.privateKey.toString('hex')
    const publicKey = derivedSeed.publicKey.toString('hex')

    if (!privateKey || !publicKey) {
      throw new Error('ErrorGeneratingKey')
    }

    // Generates url parameters to get a JWT to communicate with lnmarkets api
    // by signing a message with the given lnurl.

    const sign = secp256k1.ecdsaSign(
      hexStringToArray(k1),
      hexStringToArray(privateKey)
    )

    const signature = secp256k1.signatureExport(sign.signature)
    const hexStringSignature = arrayToHexString(signature)

    return {
      tag: 'login',
      k1,
      hmac,
      sig: hexStringSignature,
      key: publicKey,
      jwt: true,
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = { auth }
