FROM node:20.9.0-alpine

RUN apk --no-cache add g++

# RUN apk --no-cache add \
#       bash \
#       g++ \
#       ca-certificates \
#       lz4-dev \
#       musl-dev \
#       cyrus-sasl-dev \
#       openssl-dev \
#       make \
#       python3 \
#       perl patch linux-headers

# RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash

# RUN apk add --no-cache \
#     gcc \
#     g++ \
#     make \
#     musl-dev \
#     linux-headers \
#     bash \
#     patch \
#     openssl-dev \
#     cyrus-sasl-dev \
#     lz4-dev \
#     zlib-dev \
#     libcurl \
#     libtool \
#     pkgconf \
#     python3

# RUN apt-get update && apt-get install -y \
#     build-essential \
#     libssl-dev \
#     libsasl2-dev \
#     liblz4-dev \
#     libzstd-dev \
#     libcurl4-openssl-dev \
#     pkg-config \
#     python3 \
#     curl

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json ./
RUN npm install

COPY --chown=node:node . .

RUN npm run build

CMD ["npm", "start"]

