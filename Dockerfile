FROM nginx
MAINTAINER Alexey Melnikov <a.melnikov@clickberry.com>

# config
RUN rm -v /etc/nginx/nginx.conf
ADD nginx/nginx.conf /etc/nginx/
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# content files
COPY dist /usr/share/nginx/html

RUN chmod 644 /usr/share/nginx/html/favicon.png
RUN chmod 644 /usr/share/nginx/html/images/brand-footer.png

# Volumes
VOLUME /etc/nginx
VOLUME /usr/share/nginx/html

# Entrypoint
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]