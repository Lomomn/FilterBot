FROM node:8-alpine

WORKDIR /usr/src/app/
COPY package*.json yarn.* /usr/src/app/
RUN yarn install
RUN npm install -g nodemon

ENV NODE_ENV=development

COPY . /usr/src/app/
CMD ["yarn", "dev"]