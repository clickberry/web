(function (window, angular) {
    "use strict";

    var module = angular.module('signin', [
      'ui.router',
      'auth-api'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('signin', {
            url: '/signin',
            templateUrl: 'signin.html',
            controller: 'SigninCtrl',
            data: {
              pageTitle: 'Sign in to Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('SigninCtrl', [
      '$scope', '$state', 'authService',
      function ($scope, $state, authService) {

        $scope.signin = {};

        $scope.submit = function (params) {
          authService.signin(params.email, params.password, function (err, data) {
            if (err) { return alert('Error: ' + err.message); }
            alert('Ok: ' + JSON.stringify(data));
            $state.go('home');
          });
        };

        $scope.goFacebook = function () {
          authService.facebook();
        };

        $scope.goTwitter = function () {
          authService.twitter();
        };

        $scope.goGoogle = function () {
          authService.google();
        };

        $scope.goVk = function () {
          authService.vk();
        };
      }
    ]);
})(window, window.angular);