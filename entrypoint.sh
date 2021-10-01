#!/bin/sh

pwd

PORT=`env | grep APP_LNMARKETS_PORT | cut -d '=' -f2`

sed -i "s/'VUE_APP_LNMARKETS_PORT'/${APP_LNMARKETS_PORT}/g" apps/front/src/plugins/client.js

cat apps/front/src/plugins/client.js

cd apps/api

dumb-init node srcs/index.js
