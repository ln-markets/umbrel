import { createHmac } from 'crypto'

import { bech32 } from 'bech32'
import BIP32Factory from 'bip32'
import bip39 from 'bip39'
import secp256k1 from 'secp256k1'
import * as ecc from 'tiny-secp256k1'

import LND from '#src/classes/lnd.js'

const bip32 = BIP32Factory.default(ecc)

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

export const createLnurlAuthPubkeyAndSignature = async ({ lnurl }) => {
  try {
    if (!lnurl) {
      throw new Error('lnurlNotFound')
    }

    const { words } = bech32.decode(lnurl, 500)
    const bytes = bech32.fromWords(words)
    const string = Buffer.from(bytes).toString()

    const url = new URL(string)
    const { k1, hmac } = Object.fromEntries(url.searchParams)

    if (!url.host || !k1) {
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
    const hash = createHmac('sha256', secret).update(url.host).digest('hex')

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

    // Generates url parameters to get a cookie to communicate
    // with lnmarkets api and JWT for the "Trade" button redirection by
    // signing a message with the given lnurl.

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
