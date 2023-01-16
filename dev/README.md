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

> Be sure to edit `dev/local/docker-compose.yml` to put your own dev domain in `LNMARKETS_API_HOSTNAME` for both `api` and `app` services.

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

## Testing the app under real conditions

To check if new version do not mess up with Umbrel follow these steps:

1. Create a fork of [Umbrel apps repository](https://github.com/getumbrel/umbrel-apps).
2. Get [latest master LN Markets app image](https://github.com/ln-markets/umbrel/pkgs/container/umbrel) shasum.
3. In your forked repository edit `lnmarkets/docker-compose.yml` and change the image by something like:

```yml
  ...
  lnmarkets:
    image: ghcr.io/ln-markets/umbrel:master@sha256:[CHECKSUM]
  ...
```

4. Log into Umbrel using `ssh umbrel@umbrel.local`
5. Run the following commands:

```shell
  $> ./scripts/app stop lnmarkets
  $> ./scripts/repo checkout "https://url-of-the-repository.git"
  $> ./scripts/app update lnmarkets
```

> ℹ️ If you made your update on a branch, the checkout command parameter will be `https://url-of-the-repository.git#branch-name`.

6. You should have the latest version of LN Markets running on your Umbrel, ready to be tested!
