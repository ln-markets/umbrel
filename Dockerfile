FROM node:16.13.0-alpine3.14 as builder

WORKDIR /usr/tmp

RUN npm install -g pnpm@6.19.1 modclean

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

COPY apps/api/package.json /usr/tmp/apps/api/package.json

COPY apps/front/package.json /usr/tmp/apps/front/package.json
COPY apps/front/index.html /usr/tmp/apps/front/index.html
COPY apps/front/vite.config.js /usr/tmp/apps/front/vite.config.js
COPY apps/front/tailwind.config.js /usr/tmp/apps/front/tailwind.config.js
COPY apps/front/postcss.config.js /usr/tmp/apps/front/postcss.config.js
COPY apps/front/public /usr/tmp/apps/front/public
COPY apps/front/src /usr/tmp/apps/front/src

RUN pnpm config set store-dir .pnpm-store && \
  pnpm install --frozen-lockfile --ignore-scripts && \
  modclean --no-progress --run

RUN pnpm -C apps/front build

# Remove dev packages
RUN pnpm prune --prod || true

FROM node:16.13.0-alpine3.14

ENV NODE_ENV="production"

WORKDIR /usr/src

RUN apk add dumb-init

COPY --chown=node:node --from=builder /usr/tmp/apps/front/dist /usr/src/apps/api/public
COPY --chown=node:node --from=builder /usr/tmp/node_modules /usr/src/node_modules
COPY --chown=node:node --from=builder /usr/tmp/apps/api/node_modules /usr/src/apps/api/node_modules
COPY --chown=node:node ./apps/api/docker/healthcheck.js /usr/src/apps/api/healthcheck.js
COPY --chown=node:node ./apps/api/src /usr/src/apps/api/src
COPY --chown=node:node ./apps/api/package.json /usr/src/apps/api/package.json

USER node

EXPOSE 4242

HEALTHCHECK --interval=12s --timeout=12s --start-period=15s \  
  CMD node /usr/src/apps/api/healthcheck.js

WORKDIR /usr/src/apps/api

CMD ["dumb-init", "node", "src/index.js"]
