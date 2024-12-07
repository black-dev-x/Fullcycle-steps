FROM node:23.0.0-slim

RUN apt update && apt install openssl procps -y

WORKDIR /app

COPY . /app
RUN npm install
RUN npm run prepare

CMD ["npm", "start"]
