(function(window, angular) {
    "use strict";

    var module = angular.module('exceptions', []);

    module.factory('$exceptionHandler', [
      function () {
        return function (exception) {
          var message = exception.message;
          if (!message || message === '[object Object]') {
              message = 'Application Error';
          }

          alert(message);
        };
      }
    ]);
    
})(window, window.angular);