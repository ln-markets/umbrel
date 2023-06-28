import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import process from 'node:process'

import * as lightning from 'ln-service'

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

export const createLndGrpc = () => {
  const { lnd } = lightning.authenticatedLndGrpc({
    cert: base64Certificate(),
    macaroon: base64Macaroon(),
    socket: `${process.env.LND_IP}:${process.env.LND_GRPC_PORT || 10009}`,
  })

  const getWalletInfo = () => {
    return lightning.getWalletInfo({ lnd })
  }

  const diffieHellmanComputeSecret = (params) => {
    return lightning.diffieHellmanComputeSecret({ ...params, lnd })
  }

  const signMessage = (params) => {
    return lightning.signMessage({ ...params, lnd })
  }

  return { getWalletInfo, diffieHellmanComputeSecret, signMessage }
}
