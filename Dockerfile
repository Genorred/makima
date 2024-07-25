FROM node:slim as base

WORKDIR /ggdrop-ferm

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update -y && apt-get install -y openssl

RUN corepack enable

RUN pnpm add -g ts-node
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --force --frozen-lockfile

COPY . .

RUN npx prisma db pull

CMD ["ts-node", "./src/index.ts"]