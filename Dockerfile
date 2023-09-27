FROM node:18-alpine

# Install dependencies.
RUN npm install -g typescript
WORKDIR /app
COPY . .
RUN npm install
WORKDIR ./client
RUN npm install
WORKDIR ../services/server
RUN npm install
WORKDIR ../../

# TODO: Figure out mongodb dependencies.

# Run the actual server on startup.
CMD ["npm", "run", "both"]
EXPOSE 3000
