#!/bin/bash

if [ -z "$AUTH_API" ]; then
    echo "AUTH_API environment variable required"
    exit 1
fi

if [ -z "$PROFILES_API" ]; then
    echo "PROFILES_API environment variable required"
    exit 1
fi

if [ -z "$PROJECTS_API" ]; then
    echo "PROJECTS_API environment variable required"
    exit 1
fi

if [ -z "$IMAGES_API" ]; then
    echo "IMAGES_API environment variable required"
    exit 1
fi

if [ -z "$PLAYER" ]; then
    echo "PLAYER environment variable required"
    exit 1
fi

if [ -z "$EDITOR" ]; then
    echo "EDITOR environment variable required"
    exit 1
fi

if [ -z "$SHARE_URL" ]; then
    echo "SHARE_URL environment variable required"
    exit 1
fi

# Patching config
sed -i "s|%AUTH_API%|${AUTH_API}|g" /usr/share/nginx/html/js/clbr.js
sed -i "s|%PROFILES_API%|${PROFILES_API}|g" /usr/share/nginx/html/js/clbr.js
sed -i "s|%PROJECTS_API%|${PROJECTS_API}|g" /usr/share/nginx/html/js/clbr.js
sed -i "s|%IMAGES_API%|${IMAGES_API}|g" /usr/share/nginx/html/js/clbr.js
sed -i "s|%PLAYER%|${PLAYER}|g" /usr/share/nginx/html/js/clbr.js
sed -i "s|%EDITOR%|${EDITOR}|g" /usr/share/nginx/html/js/clbr.js
sed -i "s|%SHARE_URL%|${SHARE_URL}|g" /usr/share/nginx/html/js/clbr.js

service nginx start