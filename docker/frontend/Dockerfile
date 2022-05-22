FROM node:14.15.1-alpine AS build

ENV NODE_ENV production

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY qstn_frontend/package*.json ./

ENV NODE_OPTIONS=--max-old-space-size=2048

RUN npm install

RUN npm install --only=dev

COPY qstn_frontend/ .

RUN npm run build

FROM nginx:stable

COPY config/frontend/default.conf /etc/nginx/conf.d

COPY --from=build /usr/src/app/build/ /var/www/html

