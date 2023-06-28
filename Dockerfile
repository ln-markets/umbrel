FROM node:18.16.1-alpine3.16 AS builder

WORKDIR /home/lnmarkets

RUN npm install -g pnpm@8

COPY pnpm-lock.yaml ./

RUN pnpm fetch

COPY package.json pnpm-workspace.yaml  ./
COPY apps /home/lnmarkets/apps

RUN pnpm install --frozen-lockfile --recursive --offline --ignore-scripts

RUN pnpm -C apps/front build

RUN pnpm --filter="@ln-markets/umbrel-api" --prod --no-optional deploy /tmp

FROM node:18.16.1-alpine3.16

ENV NODE_ENV="production"

WORKDIR /home/lnmarkets

RUN apk add dumb-init

COPY --chown=node:node --from=builder /tmp /home/lnmarkets
COPY --chown=node:node --from=builder /home/lnmarkets/apps/front/dist /home/lnmarkets/public

USER node

EXPOSE 4242

HEALTHCHECK --interval=12s --timeout=12s --start-period=15s \  
  CMD nc -zv localhost 4242 || exit 1

CMD ["dumb-init", "node", "src/index.js"]
