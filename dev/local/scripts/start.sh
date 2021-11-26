#!/usr/bin/env bash

set -e

docker-compose build api front
docker-compose up -d api front
