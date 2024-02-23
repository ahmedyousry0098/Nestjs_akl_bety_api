FROM node:20.10.0

WORKDIR /api

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma init

CMD ["npm", "start"]