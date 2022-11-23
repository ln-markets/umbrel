import { createHash, createHmac } from 'node:crypto'

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

const LNURL_CANONICAL_PHRASE =
  'DO NOT EVER SIGN THIS TEXT WITH YOUR PRIVATE KEYS! IT IS ONLY USED FOR DERIVATION OF LNURL-AUTH HASHING-KEY, DISCLOSING ITS SIGNATURE WILL COMPROMISE YOUR LNURL-AUTH IDENTITY AND MAY LEAD TO LOSS OF FUNDS!'

export const createLnurlAuthPubkeyAndSignatureDeprecated = async ({
  lnurl,
  withJWT = false,
}) => {
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
      jwt: withJWT,
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export const createLnurlAuthPubkeyAndSignature = async ({
  lnurl,
  withJWT = false,
}) => {
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

    const { publicKey, privateKey } = await generateKeys(url.host)

    const sign = secp256k1.ecdsaSign(
      Buffer.from(k1, 'hex'),
      Buffer.from(privateKey, 'hex')
    )

    const signature = secp256k1.signatureExport(sign.signature)
    const hexStringSignature = arrayToHexString(signature)

    return {
      tag: 'login',
      k1,
      hmac,
      sig: hexStringSignature,
      key: publicKey,
      jwt: withJWT,
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export const generateKeys = async (host) => {
  // Sign and sha256 a canonical message to generate a linking private key
  const canonicHash = createHash('sha256')
    .update(Buffer.from(LNURL_CANONICAL_PHRASE))
    .digest('hex')

  const { signature: canonicPhraseSignature } = await LND.signMessage({
    message: canonicHash,
  })
  const hashingKey = createHash('sha256')
    .update(Buffer.from(canonicPhraseSignature))
    .digest('hex')
  const linkingPrivateKey = createHmac('sha256', hashingKey)
    .update(host)
    .digest('hex')

  // Check if linking private key generation was successful
  if (!secp256k1.privateKeyVerify(Buffer.from(linkingPrivateKey, 'hex'))) {
    throw 'privateKeyGenerationFailed'
  }

  // Generate linking public key so that we can verify the message signature afterwards
  const linkingPublicKey = secp256k1.publicKeyCreate(
    Buffer.from(linkingPrivateKey, 'hex')
  )

  return {
    publicKey: Buffer.from(linkingPublicKey).toString('hex'),
    privateKey: linkingPrivateKey,
  }
}
