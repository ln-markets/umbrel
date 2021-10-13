# Umbrel App

As a regular user you should use the official integrated application through [Umbrel](https://github.com/getumbrel/umbrel) (to be released soon). This way you could switch between mainnet and testnet network.


## Install development env

This environment is linked to the **testnet** version of LN Markets. **Meant for development use only**.

### Prerequisites:

- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [jq](https://stedolan.github.io/jq/)

### Setting up the app:

```shell
 $> yarn workspace dev init
```

It will setup bitcoin testnet blockchain and a LND node for you. In addition it will connect itself to LNMarkets node but you'll need to create the channel yourself since you need tBTC to create it. You'll get a wallet address from the `init` script above, copy this adress and get tBTC from faucets like these:

| tBTC Faucets                          |
| :-----------------------------------: |
| https://coinfaucet.eu/en/btc-testnet/ |
| https://testnet-faucet.mempool.co/    |
| https://bitcoinfaucet.uo1.net/        |
|                                       |

You can check how much your wallet contains.

```shell
  $> yarn workspace dev lnd-balance
```

Now that you have money create a channel with LN Markets.

```shell
  $> yarn workspace dev create-channel AMOUNT
```

Once that's done restart environment.

```shell
  $> yarn workspace dev start
```

These following services ar now accessible on any web browser.

| Service | URL                       |
| :-----: | :-----------------------: |
| API     | http://localhost:8001/api | 
| Front   | http://localhost:3000     |
|         |                           |

