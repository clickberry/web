(function(window, angular, clbr) {
  "use strict";

  var module = angular.module('images-api', ['settings']);

  module.factory('imagesApi', [
    'urls', function (urls) {
      return clbr.imagesApi(urls.imagesApi);
    }
  ]);  
    
})(window, window.angular, window.clbr);