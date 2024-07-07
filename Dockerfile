# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.2.0

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app
COPY . .

# Install python/pip for node-pre-gyp
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add --no-cache make g++
RUN npm ci

RUN npm run build


FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /usr/src/app
COPY package*.json .
COPY public/ ./public

# Install python/pip for node-pre-gyp
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add --no-cache make g++
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# RUN --mount=target=public,type=bind,source=public
COPY --from=build /app/dist ./dist
# Run the application as a non-root user.
USER node
# Expose the port that the application listens on.
# EXPOSE 3000
# Run the application.
ENTRYPOINT ["node", "dist/app.js"]
