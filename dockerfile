FROM node:lts-slim

ENV workdir /data/app

RUN mkdir -p ${workdir}

WORKDIR ${workdir}

COPY . ${workdir}

RUN npm install

CMD ["npm", "start"]