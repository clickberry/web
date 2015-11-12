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
      '$scope', '$state', 'authApi',
      function ($scope, $state, authApi) {

        $scope.signup = {};

        $scope.submit = function (params) {
          authApi.signup(params.email, params.password, function (err, data) {
            if (err) { return alert('Error: ' + err.message); }
            alert('Ok: ' + JSON.stringify(data));
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