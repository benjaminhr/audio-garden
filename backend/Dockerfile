FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8080

ENV NODE_ENV=production

CMD ["node", "main.js"]