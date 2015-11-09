#!/bin/bash

# remove web container & image
docker stop web
docker rm web
docker rmi web

# build new image and run container
grunt
docker build -t web .
docker run -d --name web -p 8080:80 web