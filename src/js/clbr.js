(function (window, angular) {
    'use strict';

    var app = angular.module('clbr', [
      'settings',
      'ui.router', // for ui routing
      'ngMaterial', // activate material design
      'home',
      'signup',
      'signin',
      'directives',
      'auth-api'
    ]);

    // Config
    app.config([
      '$urlRouterProvider', '$locationProvider', '$stateProvider', '$mdThemingProvider',
      function ($urlRouterProvider, $locationProvider, $stateProvider, $mdThemingProvider) {
        
        // routes
        $stateProvider
          .state('clbr', {
            'abstract': true,
            template: '<div ui-view></div>'
          });

        // html5 routing without #
        $urlRouterProvider.otherwise('/');
        // $locationProvider.html5Mode(true);

        // theme
        $mdThemingProvider.theme('default')
          .primaryPalette('grey')
          .accentPalette('green', {
            'default': '500',
            'hue-1': '200',
            'hue-2': '700',
            'hue-3': 'A200'
          });
      }
    ]);

    // Main application controller
    app.controller('ClickberryCtrl', [
      '$rootScope', '$state', 'authService', 'urls',
      function ($rootScope, $state, authService, urls) {

        $rootScope.$on('$stateChangeSuccess', function (event, toState/*, toParams, from, fromParams*/) {
          if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
            $rootScope.pageTitle = toState.data.pageTitle;
          }
        });

        $rootScope.menuExpanded = false;
        $rootScope.expandMenu = function() {
          $rootScope.menuExpanded = !$rootScope.menuExpanded;
        }

        $rootScope.signup = function () {
          $state.go('signup');
        };

        $rootScope.signin = function () {
          $state.go('signin');
        };

        function setRedirect() {
          authService.setRedirect(urls.web, function () {
          });
        }

        setRedirect();
      }
    ]);

})(window, window.angular);