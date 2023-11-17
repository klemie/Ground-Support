FROM rust:1.73 as flight-data-reader

RUN cargo install wasm-pack
COPY flight-data-reader /usr/src/flight-data-reader
WORKDIR /usr/src/flight-data-reader/web_package/rocket-data
RUN wasm-pack build

FROM node:18-alpine as base

FROM base as dev
WORKDIR /app
COPY --from=flight-data-reader /usr/src/flight-data-reader/web_package/rocket-data/pkg rocket-data
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.cache/yarn \
    yarn install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
