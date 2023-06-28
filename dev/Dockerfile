FROM node:18.16.1-alpine3.16

ARG PACKAGE

ENV PACKAGE=$PACKAGE

RUN npm install -g pnpm@8

WORKDIR /home/lnmarkets

COPY pnpm-lock.yaml ./

RUN pnpm fetch

COPY package.json pnpm-workspace.yaml  ./
COPY apps /home/lnmarkets/apps

RUN pnpm install --frozen-lockfile --recursive --offline --ignore-scripts

ENTRYPOINT [ "/bin/sh", "-c", "exec pnpm run -C ./$PACKAGE dev \"${@}\"", "--" ]
