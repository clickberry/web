(function(window, angular, clbr) {
    "use strict";

    var module = angular.module('auth-api', ['constants']);

    module.factory('authService', [
        'urls', function (urls) {
            return clbr.authApi(urls.authApi);
        }
    ]);
    
})(window, window.angular, window.clbr);