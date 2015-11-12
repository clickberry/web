(function(window, angular, clbr) {
  "use strict";

  var module = angular.module('profiles-api', ['settings']);

  module.factory('profilesApi', [
    'urls', function (urls) {
      return clbr.profilesApi(urls.profilesApi);
    }
  ]);  
    
})(window, window.angular, window.clbr);