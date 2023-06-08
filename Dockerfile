FROM node:18-alpine


LABEL authors="Dalton Harrold"

WORKDIR /app
COPY ./commands ./commands
COPY ./lib ./lib
COPY ./pb_data ./pb_data
COPY ./pb_migrations ./pb_migrations
COPY .env ./
COPY deploy-commands.js ./
COPY index.js ./
COPY package.json ./
COPY pocketbase ./
COPY docker-deploy.sh .

RUN npm install \
    && npm run reload

ENTRYPOINT sh docker-deploy.sh