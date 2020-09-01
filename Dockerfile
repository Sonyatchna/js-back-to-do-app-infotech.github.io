FROM node:10-slim AS build

COPY package*.json src/

WORKDIR /src

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT [ "npm" ]
CMD [ "run", "start" ]