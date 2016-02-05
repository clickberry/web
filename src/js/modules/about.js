(function (window, angular) {
    "use strict";

    var module = angular.module('about', [
      'ui.router'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('about', {
            url: '/about',
            templateUrl: 'about.html',
            data: {
              pageTitle: 'About Clickberry'
            }
          });
        }
    ]);
})(window, window.angular);