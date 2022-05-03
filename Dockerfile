FROM node:16.15.0-alpine3.14 AS builder

WORKDIR /usr/lnmarkets

RUN npm install -g pnpm@7

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

COPY apps/api/package.json /usr/lnmarkets/apps/api/package.json
COPY apps/front/package.json /usr/lnmarkets/apps/front/package.json

RUN pnpm config set store-dir .pnpm-store && \
  pnpm install --frozen-lockfile --ignore-scripts

COPY apps/front /usr/lnmarkets/apps/front

RUN pnpm -C apps/front build

FROM node:16.15.0-alpine3.14

ENV NODE_ENV="production"

WORKDIR /usr/lnmarkets

RUN apk add --no-cache dumb-init

COPY --chown=node:node --from=builder /usr/lnmarkets/apps/front/dist /usr/lnmarkets/apps/api/public
COPY --chown=node:node --from=builder /usr/lnmarkets/node_modules /usr/lnmarkets/node_modules
COPY --chown=node:node --from=builder /usr/lnmarkets/apps/api/node_modules /usr/lnmarkets/apps/api/node_modules
COPY --chown=node:node apps/api/src /usr/lnmarkets/apps/api/src
COPY --chown=node:node apps/api/docker/healthcheck.js /usr/lnmarkets/apps/api/healthcheck.js
COPY --chown=node:node apps/api/package.json /usr/lnmarkets/apps/api/package.json

USER node

EXPOSE 4242

HEALTHCHECK --interval=12s --timeout=12s --start-period=15s \  
  CMD node /usr/lnmarkets/apps/api/healthcheck.js

WORKDIR /usr/lnmarkets/apps/api

CMD ["dumb-init", "node", "src/index.js"]
