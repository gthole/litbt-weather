FROM node:12.4-alpine

WORKDIR /app
COPY package* ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
