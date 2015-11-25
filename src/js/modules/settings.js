(function (angular) {
    "use strict";

    angular.module('settings', [])
      .constant('urls', {
        authApi: 'http://auth.qa.clbr.ws',
        profilesApi: 'http://profiles.qa.clbr.ws',
        projectsApi: 'http://projects.qa.clbr.ws',
        player: 'http://editor.qa.clbr.ws/#/iplayer/'
      });
}) ((window.angular));