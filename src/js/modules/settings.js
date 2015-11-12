(function(window, angular) {
    "use strict";

    angular.module('settings', []) 
      .constant('urls', {
      	'web': 'http://192.168.99.100:8081',
        'authApi': 'http://auth.qa.clbr.ws'
      });
    
})(window, window.angular);