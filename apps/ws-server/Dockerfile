# for dev
FROM node:20-alpine 

WORKDIR /app

COPY package.json yarn.lock turbo.json ./
COPY /packages/tsconfig ./packages/tsconfig/

RUN yarn install --frozen-lockfile

COPY /packages/postgres ./packages/postgres/
COPY /apps/ws-server ./apps/ws-server/

RUN yarn install

EXPOSE 3002

CMD [ "yarn", "dev" ]