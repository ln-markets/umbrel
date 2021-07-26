const config = {
  app: {
    url: process.env.APP_URL || 'http://localhost',
    port: process.env.API_PORT || 8001,
  },
  lnmarkets: {
    url:
      process.env.LNMARKETS_API_URL || process.env.BITCOIN_NETWORK === 'testnet'
        ? 'https://api.testnet.lnmarkets.com'
        : 'https://api.lnmarkets.com',
    version: process.env.LNMARKETS_API_VERSION || '/v1',
  },
}

module.exports = config
