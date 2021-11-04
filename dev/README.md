# Dev setup

You must follow this if you want to work on this app.

## Prerequisites:

- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [jq](https://stedolan.github.io/jq/)

## Install local env

This environment is linked to the **regtest** version of LN Markets. **Meant only for LN Markets developers**.

### Setting up the app:

You must launch LN Markets local env beforehand.

```shell
 $> pnpm local:start
```

## Install testnet env

This environment is linked to the **testnet** version of LN Markets. **Meant for development use only**.

### Setting up the app:

If it's the first time running the app in this mode, you must setup a channel between your node and LN Markets.

```shell
 $> pnpm testnet:init
```

This command will output you a wallet address that you must use to get tBTC in order to open a channel. You can get those via faucets, here is a small selection of them.

|             tBTC Faucets              |
| :-----------------------------------: |
| https://coinfaucet.eu/en/btc-testnet/ |
|  https://testnet-faucet.mempool.co/   |
|    https://bitcoinfaucet.uo1.net/     |
|                                       |

You can check how much your wallet contains.

```shell
  $> pnpm lnd:balance
```

Now that you have money create a channel with LN Markets.

```shell
  $> pnpm lnd:create-channel AMOUNT
```

If it's not the first time simply start the env.

```shell
  $> pnpm testnet:start
```

In both case you'll have to unlock your wallet and restart the API to get access to your node!

```shell
  $> pnpm lnd:unlock
  $> pnpm testnet:restart-api
```

## Services

These following services ar now accessible on any web browser no matter which env you launched.

| Service |            URL            |
| :-----: | :-----------------------: |
|   API   | http://localhost:8001/api |
|  Front  |   http://localhost:3000   |
|         |                           |
