(function(window, angular) {
    "use strict";

    var module = angular.module('user-page', [
      'ui.router',
      'projects-api',
      'profiles-api',
      'infinite-scroll',
      'user',
      'user-page.video'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('user-page', {
            url: '/user/:id',
            templateUrl: 'user-page.html',
            controller: 'UserPageCtrl',
            data: {
              pageTitle: 'User Details on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('UserPageCtrl', [
      '$rootScope', '$scope', '$state', '$stateParams', 'projectsApi', 'profilesApi',
      function ($rootScope, $scope, $state, $stateParams, projectsApi, profilesApi) {
        var id = $stateParams.id;
        if (!id) {
          return $state.go('home');
        }

        $scope.projects = [];
        $scope.allLoaded = false;
        $scope.loading = false;

        $scope.profile = null;

        // loading user projects
        (function loadProjects(user_id) {
          if ($scope.loading || $scope.allLoaded) {
            return;
          }
          $scope.loading = true;
          projectsApi.listByUser(user_id, function (err, data) {
            if (err) { throw err; }
            $scope.allLoaded = true;

            var result = [];
            angular.forEach(data, function (i) {
              // filter inconsisten projects
              if (!i.imageUri || !i.videos || !i.videos.length) {
                return;
              }

              result.push(i);
            });

            $scope.projects = $scope.projects.concat(result);
            $scope.loading = false;
            $scope.$digest();
          });
        })(id);

        // loading user profile
        (function loadProfile(user_id) {
          if ($rootScope.profilesCache[user_id]) {
            $scope.profile = $rootScope.profilesCache[user_id];
            return;
          }

          profilesApi.public(user_id, function (err, data) {
            if (err) { throw err; }
            $scope.profile = data;
            $rootScope.profilesCache[user_id] = data;
          });
        })(id);
      }
    ]);
    
})(window, window.angular);