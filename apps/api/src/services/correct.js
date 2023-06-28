import { createHash, createHmac } from 'node:crypto'

import { bech32 } from 'bech32'
import secp256k1 from 'secp256k1'

import { config } from '../config.js'

import { fetchLnurl, fetchToken } from './fetch.js'
import { createLndGrpc } from './lnd.js'
import { arrayToHexString, getHostname } from './utils.js'

const generateKeys = async (host) => {
  const canonicHash = createHash('sha256')
    .update(
      Buffer.from(
        'DO NOT EVER SIGN THIS TEXT WITH YOUR PRIVATE KEYS! IT IS ONLY USED FOR DERIVATION OF LNURL-AUTH HASHING-KEY, DISCLOSING ITS SIGNATURE WILL COMPROMISE YOUR LNURL-AUTH IDENTITY AND MAY LEAD TO LOSS OF FUNDS!'
      ),
      'utf8'
    )
    .digest('hex')

  const lnd = createLndGrpc()
  const { signature: canonicPhraseSignature } = await lnd.signMessage({
    message: canonicHash,
  })

  const hashingKey = createHash('sha256')
    .update(Buffer.from(canonicPhraseSignature))
    .digest('hex')

  const linkingPrivateKey = createHmac('sha256', hashingKey)
    .update(host)
    .digest('hex')

  if (!secp256k1.privateKeyVerify(Buffer.from(linkingPrivateKey, 'hex'))) {
    throw 'privateKeyGenerationFailed'
  }

  const linkingPublicKey = secp256k1.publicKeyCreate(
    Buffer.from(linkingPrivateKey, 'hex')
  )

  return {
    publicKey: Buffer.from(linkingPublicKey).toString('hex'),
    privateKey: linkingPrivateKey,
  }
}

export const correctLnurlAuthMethod = async () => {
  const hostname = getHostname(config.network)

  const lnurl = await fetchLnurl(hostname)

  const { words } = bech32.decode(lnurl, 500)
  const bytes = bech32.fromWords(words)
  const string = Buffer.from(bytes).toString()

  const url = new URL(string)
  const { k1, hmac } = Object.fromEntries(url.searchParams)

  if (!url.host || !k1) {
    throw new Error('MissingInformations')
  }

  const { publicKey, privateKey } = await generateKeys(url.host)

  const sign = secp256k1.ecdsaSign(
    Buffer.from(k1, 'hex'),
    Buffer.from(privateKey, 'hex')
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
