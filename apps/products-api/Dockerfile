
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY apps ./apps

RUN npm run build

FROM node:24-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
ENV OTEL_SERVICE_NAME=products-api

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist/products-api ./dist/products-api
COPY --from=build /app/dist/shared ./dist/shared

USER node

EXPOSE 3001

CMD ["node", "--import", "./dist/shared/instrumentation.js", "./dist/products-api/src/index.js"]
