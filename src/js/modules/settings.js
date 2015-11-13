(function(window, angular) {
    "use strict";

    angular.module('settings', []) 
      .constant('urls', {
      	'web': 'qa.clbr.ws',
        'authApi': 'http://auth.qa.clbr.ws',
        'profilesApi': 'http://profiles.qa.clbr.ws',
        'projectsApi': 'http://projects.qa.clbr.ws'
      });
    
})(window, window.angular);