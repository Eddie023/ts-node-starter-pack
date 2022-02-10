FROM node:16-alpine

WORKDIR /usr/app

RUN apk update && apk add bash
RUN npm install ts-node ts-node-dev -g

COPY package*.json ./

RUN npm install

COPY ["./src", "./src"]
COPY ["knexfile.ts", "tsconfig.json", ".gitignore", ".eslintignore", ".eslintrc.js", ".env", "./"]

EXPOSE 4000

CMD ["npm", "run", "start"]
