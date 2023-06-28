import { createHmac } from 'node:crypto'

import { bech32 } from 'bech32'
import BIP32Factory from 'bip32'
import bip39 from 'bip39'
import secp256k1 from 'secp256k1'
import * as ecc from 'tiny-secp256k1'

import { config } from '../config.js'

import { fetchLnurl, fetchToken } from './fetch.js'
import { createLndGrpc } from './lnd.js'
import { arrayToHexString, hexStringToArray, getHostname } from './utils.js'

const bip32 = BIP32Factory.default(ecc)

export const deprecatedLnurlAuth = async () => {
  const hostname = getHostname(config.network)
  const lnd = createLndGrpc()

  const lnurl = await fetchLnurl(hostname)

  const { words } = bech32.decode(lnurl, 500)
  const bytes = bech32.fromWords(words)
  const string = Buffer.from(bytes).toString()

  const url = new URL(string)
  const { k1, hmac } = Object.fromEntries(url.searchParams)

  if (!url.host || !k1) {
    throw new Error('MissingInformations')
  }

  const { public_key } = await lnd.getWalletInfo()

  if (!public_key) {
    throw new Error('NodePubkeyMissing')
  }

  // Computes private and public keys to sign a feedback message.

  const { secret } = await lnd.diffieHellmanComputeSecret({
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

  const sign = secp256k1.ecdsaSign(
    hexStringToArray(k1),
    hexStringToArray(privateKey)
  )

  const signature = secp256k1.signatureExport(sign.signature)
  const hexStringSignature = arrayToHexString(signature)

  const token = await fetchToken(
    hostname,
    k1,
    hmac,
    hexStringSignature,
    publicKey
  )

  return { token, publicKey, hostname }
}
