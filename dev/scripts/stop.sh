#!/usr/bin/env bash

echo -e "\nStopping Umbrel containers..."
docker-compose pull
docker-compose rm -fsv

echo -e "\nStarting infra..."
cd infra ; ./scripts/stop.sh
