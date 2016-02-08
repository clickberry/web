#!/bin/bash

# remove web container & image
docker stop web
docker rm web
docker rmi web

# build new image and run container
gulp
docker build -t web .
docker run -d --name web -p 8888:80 -e AUTH_API=https://qa-auth.clickberry.tv -e PROFILES_API=https://qa-profiles.clickberry.tv -e PROJECTS_API=https://qa-projects.clickberry.tv -e IMAGES_API=https://qa-images.clickberry.tv -e FEEDBACK_API=https://qa-feedback.clickberry.tv -e PLAYER=https://qa-editor.clickberry.tv/#/iplayer/ -e EDITOR=https://qa-editor.clickberry.tv/ -e SHARE_URL=https://qa-video.clickberry.tv/ web
