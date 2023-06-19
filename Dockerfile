FROM node:16
LABEL maintainer="Rohan Rustagi"
WORKDIR /app
COPY package-lock.json ./
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]