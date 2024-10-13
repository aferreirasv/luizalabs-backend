FROM node:lts

ENV workdir /data/app

RUN mkdir -p ${workdir}

WORKDIR ${workdir}

COPY . ${workdir}

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "dev"]