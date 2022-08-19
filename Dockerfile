# stage1 as builder
FROM node:14-alpine as builder
ARG API_URL="/parse-jsight"
ARG GTM_ID=""
ARG CLOUD_URL="https://cloud.jsight.io"
ENV REACT_APP_API_URL=$API_URL
ENV REACT_APP_GTM_ID=$GTM_ID
ENV REACT_APP_CLOUD_URL=$CLOUD_URL
RUN npm i -g npm@8
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY package.json .
RUN npm i --legacy-peer-deps
COPY . .
RUN npm run build-export && npm run build

# nginx state for serving content
FROM nginx:alpine
#!/bin/sh
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy from the stage 1
COPY --from=builder /app/build .
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
