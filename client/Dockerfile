FROM node:18-alpine as base

FROM base as dev
WORKDIR /app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.cache/yarn \
    yarn install

WORKDIR /app
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
