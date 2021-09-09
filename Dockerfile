FROM node:12.18 as development

WORKDIR /usr/src/app

COPY .npmrc ./
COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:12.18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./

RUN npm install --production

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
