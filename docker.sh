#!/bin/bash

# remove web container & image
docker stop web
docker rm web
docker rmi web

# build new image and run container
gulp
docker build -t web .
docker run -d --name web -p 8888:80 -e AUTH_API=http://auth.qa.clbr.ws -e PROFILES_API=http://profiles.qa.clbr.ws -e PROJECTS_API=http://projects.qa.clbr.ws -e IMAGES_API=http://images.qa.clbr.ws -e PLAYER=http://editor.qa.clbr.ws/#/iplayer/ -e EDITOR=http://editor.qa.clbr.ws/ web
