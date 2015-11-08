FROM nginx
MAINTAINER Alexey Melnikov <a.melnikov@clickberry.com>

COPY nginx/*.conf /etc/nginx
COPY dist /usr/share/nginx/html

VOLUME /etc/nginx
VOLUME /usr/share/nginx/html
