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

    module.filter('abbreviation', [
      function() {
        return function(text) {
          if (!text) {
            return 'N/A';
          }

          var parts = text.split(' ');
          var abbr = parts[0][0];
          if (parts.length > 1) {
            abbr += parts[parts.length - 1][0];
          }

          return abbr.toUpperCase();
        };
      }
    ]);
    
})(window, window.angular, window.moment);