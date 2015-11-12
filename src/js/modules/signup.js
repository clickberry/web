(function (window, angular) {
    "use strict";

    var module = angular.module('signup', [
      'ui.router',
      'auth-api'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html',
            controller: 'SignupCtrl',
            data: {
              pageTitle: 'Sign up on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('SignupCtrl', [
      '$scope', '$state', 'authService',
      function ($scope, $state, authService) {

        $scope.signup = {};

        $scope.submit = function (params) {
          authService.signup(params.email, params.password, function (err, data) {
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