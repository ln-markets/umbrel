export const config = {
  network: process.env.BITCOIN_NETWORK || 'mainnet',
  lndPort: Number(process.env.LND_GRPC_PORT) || 10009,
  lndHost: process.env.LND_IP,
  port: Number(process.env.APP_LNMARKETS_PORT) || 4242,
}
