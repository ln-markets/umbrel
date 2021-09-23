# Umbrel App

## Install development env

This environment is linked to the **testnet** version of LN Markets.

### Prerequisites:

- [docker]()
- [docker-compose]()

### Setting up the app:

```shell
 $> yarn workspace dev start
```

After launching `infra` for the first time, `bitcoin-testnet` container might takes several minutes to sync to the current state of the bitcoin testnet blockchain. During this time you can start interacting with `lnmarkets_umbrel_lnd` to setup your wallet and channels with LN Markets.

```shell
  $> docker exec --user lnd -it lnmarkets_umbrel_lnd lncli --network="testnet" create
  $> docker exec --user lnd -it lnmarkets_umbrel_lnd lncli --network="testnet" connect "03bae2db4b57738c1ec1ffa1c5e5a4423968cc592b3b39cddf7d495e72919d6431@34.192.102.161:9735"
```

Once you created your wallet and linked your node to LN Markets, you need to create a channel with it. In order to do this, you need to create a wallet adress and get some tBTC from a faucet.

```shell
  $> docker exec --user lnd -it lnmarkets_umbrel_lnd lncli --network="testnet" newaddress p2wkh
```

Copy this adress and get tBTC from faucets like these :

| tBTC Faucets |
| :---: |
| https://coinfaucet.eu/en/btc-testnet/ |
| https://testnet-faucet.mempool.co/ |
| https://bitcoinfaucet.uo1.net/ |

You can check how mych your wallet has with the following command:

```shell
  $> docker exec --user lnd -it lnmarkets_umbrel_lnd lncli --network="testnet" walletbalance
```

Now that you have money create a channel with LN Markets.

```shell
  $> docker exec --user lnd -it lnmarkets_umbrel_lnd lncli --network="testnet" openchannel "03bae2db4b57738c1ec1ffa1c5e5a4423968cc592b3b39cddf7d495e72919d6431" AMOUNT
```

`AMOUNT` being the quantity of sats you want to allow to the channel. You'll need to wait up to an hour to get the channel accepted by the network but you can start using the app by going to these URLs in your favorite browser.

| | |
| ------------- |-------------:|
| API     | http://localhost:8001/api | 
| Front    | http://localhost:3000  |

