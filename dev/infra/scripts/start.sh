#!/usr/bin/env bash

set -e

echo -e "\nStopping infra containers..."
docker-compose pull
docker-compose rm -fsv
docker network prune -f

echo -e "\nStarting infra containers..."
docker-compose up -d 

echo -e "\Unlock LND wallet..."
docker exec --user lnd -it lnmarkets_umbrel_lnd lncli --network='testnet' unlock
