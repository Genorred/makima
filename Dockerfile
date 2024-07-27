FROM node:latest

WORKDIR /app

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update -y && apt-get install -y openssl

RUN corepack enable

RUN pnpm add -g ts-node

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

CMD ["pnpm", "run", "dev"]