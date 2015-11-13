(function(window, angular, clbr) {
  "use strict";

  var module = angular.module('projects-api', ['settings']);

  module.factory('projectsApi', [
    'urls', function (urls) {
      return clbr.projectsApi(urls.projectsApi);
    }
  ]);
    
})(window, window.angular, window.clbr);