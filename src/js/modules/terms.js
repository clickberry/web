(function (window, angular) {
    "use strict";

    var module = angular.module('terms', [
      'ui.router'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('terms', {
            url: '/terms',
            templateUrl: 'terms.html',
            data: {
              pageTitle: 'Terms of Use - Clickberry'
            }
          });
        }
    ]);
})(window, window.angular);