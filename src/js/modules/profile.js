(function (window, angular) {
    "use strict";

    var module = angular.module('profile', [
      'ui.router',
      'profiles-api',
      'user'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('profile', {
            url: '/profile',
            templateUrl: 'profile.html',
            controller: 'ProfileCtrl',
            data: {
              pageTitle: 'Your Profile on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('ProfileCtrl', [
      '$scope', '$state', 'profilesApi', 'user',
      function ($scope, $state, profilesApi, user) {

        $scope.profile = {};
        $scope.loading = false;

        $scope.submit = function (params) {
          $scope.loading = true;
          profilesApi.update(user.id, params.email, params.name, user.accessToken, function (err) {
            if (err) { throw err; }
            $scope.loading = false;
            $scope.$digest();
          });
        };

        (function load() {
          $scope.loading = true;
          profilesApi.get(user.id, user.accessToken, function (err, data) {
            if (err) { throw err; }
            $scope.profile = data;
            $scope.loading = false;
            $scope.$digest();
          });
        })();
      }
    ]);
})(window, window.angular);