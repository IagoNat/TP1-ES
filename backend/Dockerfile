# how to docker
FROM node:alpine

WORKDIR /home/node/app/backend

COPY . .

# PORT
EXPOSE 3000

RUN npm install
RUN npm run build

CMD [ "npm", "start" ]
