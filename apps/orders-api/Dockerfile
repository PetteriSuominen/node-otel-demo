
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
ENV PORT=3000
ENV OTEL_SERVICE_NAME=orders-api

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist/orders-api ./dist/orders-api
COPY --from=build /app/dist/shared ./dist/shared

USER node

EXPOSE 3000

CMD ["node", "--import", "./dist/shared/instrumentation.js", "./dist/orders-api/src/index.js"]
