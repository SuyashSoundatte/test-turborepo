# for dev
FROM node:lts

WORKDIR /app

COPY package.json yarn.lock turbo.json ./
COPY /packages/tsconfig ./packages/tsconfig/

RUN yarn install --frozen-lockfile

COPY /packages/mongodb ./packages/mongodb/
COPY /packages/postgres ./packages/postgres/
COPY /packages/utils ./packages/utils/
COPY /apps/http-server ./apps/http-server/

RUN yarn install

EXPOSE 3001

CMD [ "yarn", "dev" ]