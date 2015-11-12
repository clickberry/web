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
        $scope.loading = false;

        $scope.submit = function (params) {
          $scope.loading = true;
          authApi.signin(params.email, params.password, function (err, data) {
            if (err) { throw err; }
            user.init(data.accessToken, data.refreshToken);
            $scope.loading = false;
            
            $state.go('home');
          });
        };

        $scope.goFacebook = function () {
          $scope.loading = true;
          authApi.facebook();
        };

        $scope.goTwitter = function () {
          $scope.loading = true;
          authApi.twitter();
        };

        $scope.goGoogle = function () {
          $scope.loading = true;
          authApi.google();
        };

        $scope.goVk = function () {
          $scope.loading = true;
          authApi.vk();
        };
      }
    ]);
})(window, window.angular);