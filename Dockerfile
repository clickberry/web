FROM nginx
MAINTAINER Alexey Melnikov <a.melnikov@clickberry.com>

COPY dist /usr/share/nginx/html

VOLUME /usr/share/nginx/html
VOLUME /etc/nginx
