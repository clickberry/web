(function(window, angular, clbr) {
  "use strict";

  var module = angular.module('auth-api', ['settings']);

  module.factory('authApi', [
    'urls', function (urls) {
      return clbr.authApi(urls.authApi);
    }
  ]);  
    
})(window, window.angular, window.clbr);