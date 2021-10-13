#!/usr/bin/env bash

set -e

echo -e "\nStopping Umbrel containers..."
docker-compose pull
docker-compose rm -fsv

echo -e "\nStarting infra..."
cd infra ; ./scripts/start.sh ; cd ..

echo -e "\nStarting Umbrel containers..."
docker-compose up -d
