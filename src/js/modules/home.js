(function(window, angular) {
    "use strict";

    var module = angular.module('home', [
      'ui.router',
      'projects-api',
      'infinite-scroll'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'HomeCtrl',
            data: {
              pageTitle: 'Clickberry Video Portal'
            }
          });
        }
    ]);

    // Controllers
    module.controller('HomeCtrl', [
      '$scope', '$state', 'projectsApi',
      function ($scope, $state, projectsApi) {

        $scope.projects = [];
        $scope.allLoaded = false;
        $scope.loading = false;

        $scope.loadProjects = function () {
          if ($scope.loading || $scope.allLoaded) {
            return;
          }
          $scope.loading = true;
          var lastId = $scope.projects.length > 0 ? $scope.projects[$scope.projects.length - 1].id : null;
          projectsApi.listPublic(50, lastId, function (err, data) {
            if (err) { throw err; }
            if (!data.length) {
              $scope.allLoaded = true;
              $scope.loading = false;
              return;
            }

            var result = [];
            var idx = $scope.projects.length;
            var lastBigOne = 0;
            var minSpace = 5;
            angular.forEach(data, function (i) {
              if (idx % 3 != 2 && (idx - lastBigOne) > minSpace && Math.floor(Math.random()*5) == 0) {
                lastBigOne = idx;
                i.size = 2;
              } else {
                i.size = 1;
              }

              // filter inconsisten projects
              if (!i.imageUri || !i.videos || !i.videos.length) {
                return;
              }

              idx++;
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