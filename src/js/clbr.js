(function (window, angular) {
    'use strict';

    var app = angular.module('clbr', [
      // 'directives',
      'ui.router', // for ui routing
      // 'infinite-scroll', // for auto-scrolling
      // 'clbr.videos'
    ]);

    // Third party libraries
    app.value('jQuery', window.$);

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
        '$rootScope',
        function ($rootScope) {

            $rootScope.$on('$stateChangeSuccess', function (event, toState/*, toParams, from, fromParams*/) {
                if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
                    $rootScope.pageTitle = toState.data.pageTitle;
                }
            });
        }
    ]);

})(window, window.angular);