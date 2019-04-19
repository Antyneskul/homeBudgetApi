FROM node:11.14.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

COPY package.json /usr/src/app/

RUN npm install \
 && npm rebuild bcrypt --build-from-source \

COPY . /usr/src/app

CMD /wait && npm run dev


