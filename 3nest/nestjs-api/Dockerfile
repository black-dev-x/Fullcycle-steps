FROM node:23.0.0-slim

RUN apt update && apt install openssl procps -y

WORKDIR /app

COPY package*.json /app
COPY ./prisma /app/prisma
RUN npm install --verbose

COPY . /app
RUN npm run prepare

CMD ["npm", "start"]
