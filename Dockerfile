FROM node:alpine

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]