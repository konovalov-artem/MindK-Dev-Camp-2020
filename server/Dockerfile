FROM node:12.7

WORKDIR /usr/app

COPY . .

RUN yarn install &&\
    yarn prestart

EXPOSE 3000

CMD ["yarn", "start:dev"]
