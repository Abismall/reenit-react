FROM node:16-alpine

WORKDIR /app/server

COPY package.json ./server


RUN npm install package.json

COPY . .
