(function(window, angular, moment) {
    "use strict";
    
    var module = angular.module('filters', []);

    module.filter('apiDate', [
      function() {
        return function(text, format) {
          var date = moment.utc(text); // ignore timezone
          return date.format(format);
        };
      }
    ]);

    module.filter('apiDateFromNow', [
      function() {
        return function(text) {
          var date = moment.utc(text); // ignore timezone
          return date.fromNow();
        };
      }
    ]);
    
})(window, window.angular, window.moment);