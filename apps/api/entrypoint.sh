#!/bin/sh

cd front/assets

FILE=`ls | grep 'index.*.js'`
PORT=`env | grep APP_LNMARKETS_PORT | cut -d '=' -f2`

sed -i "s/VUE_APP_LNMARKETS_PORT/${PORT}/g" $FILE

cat $FILE

cd ../..

dumb-init node srcs/index.js
