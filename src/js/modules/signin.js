(function (window, angular) {
    "use strict";

    var module = angular.module('signin', [
      'ui.router',
      'auth-api',
      'user'
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
      '$scope', '$state', 'authApi', 'user',
      function ($scope, $state, authApi, user) {

        $scope.signin = {};

        $scope.submit = function (params) {
          authApi.signin(params.email, params.password, function (err, data) {
            if (err) { throw err; }
            user.init(data.accessToken, data.refreshToken);
            $state.go('home');
          });
        };

        $scope.goFacebook = function () {
          authApi.facebook();
        };

        $scope.goTwitter = function () {
          authApi.twitter();
        };

        $scope.goGoogle = function () {
          authApi.google();
        };

        $scope.goVk = function () {
          authApi.vk();
        };
      }
    ]);
})(window, window.angular);