(function (angular) {
    'use strict';

    var app = angular.module('clbr', [
      'ui.router', // for ui routing
      'ngMaterial', // activate material design
      'home',
      'signup',
      'signin',
      'profile',
      'account-settings',
      'directives',
      'filters',
      'user',
      'exceptions',
      'video',
      'my-videos',
      'user-page',
      'terms',
      'about'
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
      '$rootScope',
      function ($rootScope) {

        $rootScope.profilesCache = {};

        $rootScope.pageTitle = 'Clickberry Video Portal';
        $rootScope.$on('$stateChangeSuccess', function (event, toState/*, toParams, from, fromParams*/) {
          if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
            $rootScope.pageTitle = toState.data.pageTitle;
          }
        });
      }
    ]);

})((window.angular));