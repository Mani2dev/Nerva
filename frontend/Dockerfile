# 1) BUILD stage: leverage Docker cache
FROM node:20 AS build
WORKDIR /app

# Install deps first, so we only rerun on package changes
COPY package*.json ./
RUN npm ci

# Now copy source & build
COPY . .
RUN npm run build


FROM node:20-alpine AS serve-stage
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app
EXPOSE 8080
CMD ["serve", "-s", "/app", "-l", "8080", "--single"]