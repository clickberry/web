(function(window, angular, clbr) {
  "use strict";

  var module = angular.module('feedback-api', ['settings']);

  module.factory('feedbackApi', [
    'urls', function (urls) {
      return clbr.feedbackApi(urls.feedbackApi);
    }
  ]);  
    
})(window, window.angular, window.clbr);