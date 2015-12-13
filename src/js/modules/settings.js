(function (angular) {
    "use strict";

    angular.module('settings', [])
      .constant('urls', {
        authApi: '%AUTH_API%',
        profilesApi: '%PROFILES_API%',
        projectsApi: '%PROJECTS_API%',
        imagesApi: '%IMAGES_API%',
        player: '%PLAYER%'
      });
}) ((window.angular));