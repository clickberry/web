(function (window, angular) {
    'use strict';

    // Constants module
    angular.module('constants', []) 
      .constant('jQuery', window.$)
      .constant('urls', {
        'authApi': 'http://auth.qa.clbr.ws'
      });

    var app = angular.module('clbr', [
      'constants',
      'ui.router', // for ui routing
      'material', // activate material design
      'auth-api'
    ]);

    // Config
    app.config([
      '$urlRouterProvider', '$locationProvider', '$stateProvider',
      function ($urlRouterProvider, $locationProvider, $stateProvider) {
        // routes
        $stateProvider
          .state('clbr', {
            'abstract': true,
            template: '<div ui-view></div>'
          });

        // html5 routing without #
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
      }
    ]);

    // Main application controller
    app.controller('ClickberryCtrl', [
      '$rootScope', 'authService',
      function ($rootScope, authService) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState/*, toParams, from, fromParams*/) {
          if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
            $rootScope.pageTitle = toState.data.pageTitle;
          }
        });

        $rootScope.test = function () {
          authService.facebook();
        };
      }
    ]);

})(window, window.angular);