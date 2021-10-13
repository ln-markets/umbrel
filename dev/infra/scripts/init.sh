#!/usr/bin/env bash

set -e

echo -e "\nStopping infra containers..."
docker-compose pull
docker-compose rm -fsv
docker network prune -f

echo "Cleaning LND data..."
sudo rm -rf /data/lnd

echo -e "\nStarting infra containers..."
docker-compose up -d 

echo -e "\nCreating LND wallet..."
docker exec --user lnd -it lnmarkets_umbrel_lnd lncli --network='testnet' create
sleep 5

echo -e '\nConnecting to LNMarkets node...'
LNMARKETS_URI='03bae2db4b57738c1ec1ffa1c5e5a4423968cc592b3b39cddf7d495e72919d6431@34.192.102.161:9735'
docker exec --user lnd -it lnmarkets_umbrel_lnd lncli --network='testnet' connect "$LNMARKETS_URI" > /dev/null

echo -e '\nCreating new wallet adress...'
ADDRESS=`docker exec --user lnd -it lnmarkets_umbrel_lnd lncli --network='testnet' newaddress p2wkh | jq '.address' | awk '{ print substr($0, 2, length($0) - 2) }'`
printf "Wallet address: %s\n" $ADDRESS
