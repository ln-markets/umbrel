#!/usr/bin/env bash

set -e

echo -e "\nStopping infra containers..."

docker-compose rm -fsv
docker network prune -f
