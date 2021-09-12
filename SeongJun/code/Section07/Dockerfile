FROM node:alpine as builder
WORKDIR '/usr/src/app'
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 80
RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y \
  nodejs
RUN echo "Node: " && node -v
RUN echo "NPM: " && npm -v
COPY --from=builder /usr/src/app/build /usr/share/nginx/html


