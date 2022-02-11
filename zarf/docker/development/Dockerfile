FROM node:16-alpine

WORKDIR /usr/app

RUN apk update && apk add bash
RUN npm install ts-node ts-node-dev -g

COPY package*.json ./

RUN npm install

COPY ["knexfile.ts", "tsconfig.json", ".gitignore", ".eslintignore", ".eslintrc.js", ".env", "./"]

# Copy unnecessary for development because we mount volumes to src while developing.
# COPY ["./src", "./src"]

# EXPOSE 4000

CMD ["npm", "run", "start"]
