#!/bin/bash

# remove web container & image
docker stop web-ui
docker rm web-ui
docker rmi web-ui

# build new image and run container
gulp
docker build -t web-ui .
docker run -d --name web-ui -p 8081:80 web-ui
