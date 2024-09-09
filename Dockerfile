FROM node:18.18.2 AS base
WORKDIR /app

# Production image, copy all the files and run next
FROM base AS runner
ARG NEXT_PUBLIC_NETWORK_TYPE
ARG NEXT_PUBLIC_TELEGRAM_BOT_ID_MAINNET
ARG NEXT_PUBLIC_TELEGRAM_BOT_ID_TESTNET
ENV NEXT_PUBLIC_NETWORK_TYPE=${NEXT_PUBLIC_NETWORK_TYPE}
ENV NEXT_PUBLIC_TELEGRAM_BOT_ID_MAINNET=${NEXT_PUBLIC_TELEGRAM_BOT_ID_MAINNET}
ENV NEXT_PUBLIC_TELEGRAM_BOT_ID_TESTNET=${NEXT_PUBLIC_TELEGRAM_BOT_ID_TESTNET}

COPY . /app/
RUN npm install -g
RUN yarn
RUN yarn build:${NEXT_PUBLIC_NETWORK_TYPE}
ENTRYPOINT yarn start:${NEXT_PUBLIC_NETWORK_TYPE}
EXPOSE 3333