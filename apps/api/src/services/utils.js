export const hexStringToArray = (string) => {
  return new Uint8Array(
    string.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  )
}

export const arrayToHexString = (array) => {
  return array.reduce(
    (string, byte) => `${string}${byte.toString(16).padStart(2, '0')}`,
    ''
  )
}

export const getHostname = (network) => {
  if (network === 'regtest') {
    return process.env.LNM_HOSTNAME
  } else if (network === 'testnet') {
    return 'testnet.lnmarkets.com'
  } else if (network === 'mainnet') {
    return 'lnmarkets.com'
  } else {
    return 'lnmarkets.com'
  }
}
