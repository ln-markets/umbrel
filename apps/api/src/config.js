const config = {
  app: {
    url: process.env.APP_URL || 'http://localhost',
    port: process.env.API_PORT || 4242,
  },
  lnmarkets: {
    url:
      process.env.BITCOIN_NETWORK === 'mainnet'
        ? 'https://api.lnmarkets.com'
        : 'https://api.testnet.lnmarkets.com',
    version: process.env.LNMARKETS_API_VERSION || '/v1',
  },
}

module.exports = config
