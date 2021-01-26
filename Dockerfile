
FROM node:10

COPY package*.json ./

RUN npm install

EXPOSE 8080