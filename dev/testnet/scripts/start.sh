#!/usr/bin/env bash
#!/usr/bin/env bash

set -e

echo -e "\nStopping Umbrel containers..."
docker-compose pull
docker-compose rm -fsv
docker network prune -f

echo -e "\nStarting Umbrel containers..."
docker-compose up -d
