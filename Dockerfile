FROM node:12.18.3-alpine as build

WORKDIR /app

COPY . /app/

RUN npm i && npm run build

FROM nginx:1.15.8-alpine

RUN sed -i 's|index  index.html index.htm;|try_files $uri /index.html;|' /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]