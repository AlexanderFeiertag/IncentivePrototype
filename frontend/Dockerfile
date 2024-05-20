FROM nginx:1.23.4-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY target/Frontend-0.0.1-SNAPSHOT.tar.gz ./Frontend-0.0.1-SNAPSHOT.tar.gz

RUN tar -xvpzf ./Frontend-0.0.1-SNAPSHOT.tar.gz -C /usr/share/nginx/html