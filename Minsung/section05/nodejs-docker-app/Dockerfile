FROM node:10

WORKDIR /usr/src/app

COPY pacakge.json .

RUN npm install

COPY . .

CMD ["node", "server.js"]