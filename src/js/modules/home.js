(function(window, angular) {
    "use strict";

    var module = angular.module('home', [
      'ui.router',
      'projects-api',
      'profiles-api',
      'infinite-scroll',
      'socialshare',
      'settings'
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
      '$rootScope', '$scope', '$state', 'projectsApi', '$mdDialog', 'urls', 'profilesApi',
      function ($rootScope, $scope, $state, projectsApi, $mdDialog, urls, profilesApi) {

        $scope.projects = [];
        $scope.allLoaded = false;
        $scope.loading = false;

        var lastId = null;
        $rootScope.profilesMap = $rootScope.profilesMap || {};

        function loadMissingProfiles(map) {
          var ids = [];
          for (var key in map) {
            if (map[key] !== null) {
              continue;
            }
            ids.push(key);
          }

          if (!ids.length) {
            return;
          }
          profilesApi.list(ids, function (err, data) {
            if (err) {
              return console.log(err.message);
            }
            angular.forEach(data, function (i) {
              map[i.id] = i;
            });
          });
        }

        $scope.loadProjects = function () {
          if ($scope.loading || $scope.allLoaded) {
            return;
          }
          $scope.loading = true;
          projectsApi.listPublic(50, lastId, function (err, data) {
            $scope.loading = false;
            if (err) {
              return console.log(err.message);
            }
            if (!data.length) {
              $scope.allLoaded = true;
              $scope.loading = false;
              $scope.$digest();
              return;
            }

            lastId = data[data.length - 1].id;

            var result = [];
            var idx = $scope.projects.length;
            var plan = [
              {w: 12, h: 6},
              {w: 6, h: 5},
              {w: 6, h: 5},
              {w: 12, h: 6},
              {w: 4, h: 4},
              {w: 4, h: 4},
              {w: 4, h: 4},
              {w: 12, h: 6},
              {w: 12, h: 6},
              {w: 6, h: 5},
              {w: 6, h: 5},
              {w: 12, h: 6},
              {w: 12, h: 6},
              {w: 4, h: 4},
              {w: 4, h: 4},
              {w: 4, h: 4}
            ];
            angular.forEach(data, function (i) {
              var p = plan[idx % plan.length];
              i.cols = p.w;
              i.rows = p.h;

              // filter inconsisten projects
              if (!i.imageUri || !i.videos || !i.videos.length) {
                return;
              }

              i.shareUrl = urls.share + i.id;
              $rootScope.profilesMap[i.userId] = $rootScope.profilesMap[i.userId] || null;

              idx++;
              result.push(i);
            });

            $scope.projects = $scope.projects.concat(result);
            $scope.$digest();

            // loading profiles
            loadMissingProfiles($rootScope.profilesMap);
          });
        };
        
        $scope.loadProjects();
      }
    ]);
    
})(window, window.angular);