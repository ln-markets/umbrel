FROM node:14.17-alpine as builder

ENV NODE_ENV="production"

WORKDIR /usr/tmp

COPY package.json yarn.lock ./
COPY apps/front/package.json /usr/tmp/apps/front/package.json
COPY apps/front/index.html /usr/tmp/apps/front/index.html
COPY apps/front/vite.config.js /usr/tmp/apps/front/vite.config.js
COPY apps/front/tailwind.config.js /usr/tmp/apps/front/tailwind.config.js
COPY apps/front/postcss.config.js /usr/tmp/apps/front/postcss.config.js
COPY apps/front/public /usr/tmp/apps/front/public
COPY apps/front/src /usr/tmp/apps/front/src

RUN yarn config --silent set cache-folder .yarn && \
  yarn workspace front install --frozen-lockfile && \
  yarn workspace front build

FROM node:14.17-alpine

ENV APP_VERSION=1.0.0

WORKDIR /usr/src

RUN apk add dumb-init

COPY --chown=node:node --from=builder /usr/tmp/apps/front/dist /usr/src/apps/api/front
COPY --chown=node:node ./package.json yarn.lock ./
COPY --chown=node:node ./apps/api/package.json /usr/src/apps/api/package.json

RUN yarn config --silent set cache-folder .yarn && \
    yarn workspace api install --frozen-lockfile --production && \
    yarn cache clean && \
    rm -f ~/.npmrc && \
    rm -f ~/.yarnc

COPY --chown=node:node ./apps/api/srcs /usr/src/apps/api/srcs
COPY --chown=node:node ./apps/api/docker/healthcheck.js /usr/src/apps/api/healthcheck.js

USER node

HEALTHCHECK --interval=12s --timeout=12s --start-period=15s \  
    CMD node /usr/src/apps/api/healthcheck.js

WORKDIR /usr/src/apps/api

CMD ["dumb-init", "node", "srcs/index.js"]
