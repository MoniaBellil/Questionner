FROM node:14.15.1-alpine
ENV NODE_ENV production

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY qstn_backend/package*.json ./

RUN npm install

COPY qstn_backend/ .

EXPOSE 3000

CMD node app.js
