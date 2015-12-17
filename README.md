# Dockerized Static Web UI
Web UI micro-service served by Nginx.

* [Architecture](#architecture)
* [Technologies](#technologies)
* [Environment Variables](#environment-variables)
* [License](#license)

# Architecture
The application is a set of static source files jade/stylus/js and compiled ready-to-use html/js/css.

# Technologies
* Jade for html generation
* Stylus for css generation
* Gulp for building source files
* Nginx server

# Environment Variables
The service should be properly configured with following environment variables.

Key | Value | Description
:-- | :-- | :-- 
AUTH_API | http://auth.yourdomain.com | HTTP url for deployed Auth API.
PROFILES_API | http://profiles.yourdomain.com | HTTP url for deployed Profiles API.
PROJECTS_API | http://projects.yourdomain.com | HTTP url for deployed Projects API.
IMAGES_API | http://images.yourdomain.com | HTTP url for deployed Images API.
PLAYER | http://editor.yourdomain.com/#/iplayer/ | HTTP url for Clickberry Online Editor Player.
EDITOR | http://editor.yourdomain.com/ | HTTP url for Clickberry Online Editor.

# License
Source code is under GNU GPL v3 [license](LICENSE).
