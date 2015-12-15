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
      '$scope', '$state', 'authApi', '$mdDialog',
      function ($scope, $state, authApi, $mdDialog) {

        $scope.signup = {};
        $scope.loading = false;

        $scope.submit = function (params) {
          $scope.loading = true;
          authApi.signup(params.email, params.password, function (err, data) {
            $scope.loading = false;
            if (err) {
              console.log(err.message);
              return $mdDialog.show($mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Sign up error')
                .content('Check inputs and try again.')
                .ok('Got it!'));
            }

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