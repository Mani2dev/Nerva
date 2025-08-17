FROM node:latest

WORKDIR /app

COPY ./ ./client

WORKDIR /app/client

RUN npm install && npm run build 

EXPOSE 3000

CMD ["npm", "start"]