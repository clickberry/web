(function(window, angular) {
    "use strict";

    var module = angular.module('my-videos', [
      'ui.router',
      'projects-api',
      'infinite-scroll',
      'user',
      'my-videos.video'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('my-videos', {
            url: '/videos',
            templateUrl: 'my-videos.html',
            controller: 'MyVideosCtrl',
            data: {
              pageTitle: 'My Videos on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('MyVideosCtrl', [
      '$scope', '$state', 'projectsApi', 'user',
      function ($scope, $state, projectsApi, user) {
        if (!user.id) {
          return $state.go('home');
        }

        $scope.projects = [];
        $scope.allLoaded = false;
        $scope.loading = false;

        $scope.loadProjects = function () {
          if ($scope.loading || $scope.allLoaded) {
            return;
          }
          $scope.loading = true;
          projectsApi.listMy(user.accessToken, function (err, data) {
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
        };
        
        $scope.loadProjects();
      }
    ]);
    
})(window, window.angular);