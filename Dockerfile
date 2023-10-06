FROM node:18-alpine as base

FROM base as dev
WORKDIR /app/client
RUN --mount=type=bind,source=./client/package.json,target=package.json \
    --mount=type=cache,target=/root/.cache/yarn \
    yarn install

WORKDIR /app/services/server
RUN --mount=type=bind,source=./services/server/package.json,target=package.json \
    --mount=type=cache,target=/root/.cache/yarn \
    yarn install

WORKDIR /app
COPY . .

EXPOSE 3000
EXPOSE 9090
CMD ["npm", "start"]
