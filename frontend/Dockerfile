
FROM node:14-slim

WORKDIR /user/src/app

COPY ./package.json ./

RUN npm install
RUN npm build

COPY . .

EXPOSE 3000

CMD ["npm", "start"]