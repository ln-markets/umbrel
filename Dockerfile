FROM node:14.17-alpine as builder

WORKDIR /usr/tmp

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/front/package.json /usr/tmp/apps/front/package.json
COPY apps/front/index.html /usr/tmp/apps/front/index.html
COPY apps/front/vite.config.js /usr/tmp/apps/front/vite.config.js
COPY apps/front/tailwind.config.js /usr/tmp/apps/front/tailwind.config.js
COPY apps/front/postcss.config.js /usr/tmp/apps/front/postcss.config.js
COPY apps/front/public /usr/tmp/apps/front/public
COPY apps/front/src /usr/tmp/apps/front/src

RUN apk add -U jq findutils curl && \
     npm install -g pnpm@6.16.1 modclean

RUN pnpm config set store-dir .pnpm-store

RUN pnpm install --frozen-lockfile --ignore-scripts

RUN pnpm -C apps/front build

FROM node:14.17-alpine

ENV NODE_ENV="production"
ENV APP_VERSION=1.0.0

WORKDIR /usr/src

RUN apk add dumb-init

RUN apk add -U jq findutils curl && \
     npm install -g pnpm@6.16.1 modclean


COPY --chown=node:node --from=builder /usr/tmp/apps/front/dist /usr/src/apps/api/front
COPY --chown=node:node ./package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=node:node ./apps/api/package.json /usr/src/apps/api/package.json

RUN pnpm config set store-dir .pnpm-store

RUN pnpm install --frozen-lockfile --ignore-scripts --prod

COPY --chown=node:node ./apps/api/srcs /usr/src/apps/api/srcs
COPY --chown=node:node ./apps/api/docker/healthcheck.js /usr/src/apps/api/healthcheck.js

USER node

HEALTHCHECK --interval=12s --timeout=12s --start-period=15s \  
    CMD node /usr/src/apps/api/healthcheck.js

WORKDIR /usr/src/apps/api

CMD ["dumb-init", "node", "srcs/index.js"]
