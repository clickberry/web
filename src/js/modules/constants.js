(function(window, angular) {
    "use strict";

    angular.module('constants', []) 
      .constant('events', {
      	'login': 'login',
        'logout': 'logout',
        'profileUpdate': 'profileUpdate'
      });
    
})(window, window.angular);