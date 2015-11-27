(function(window, angular) {
    "use strict";

    var module = angular.module('home', [
      'ui.router',
      'projects-api'
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
        $scope.loading = false;

        (function loadProjects() {
          $scope.loading = true;
          projectsApi.listPublic(50, function (err, data) {
            if (err) { throw err; }
            var result = [];
            var idx = 0;
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

            $scope.projects = result;
            $scope.loading = false;
            $scope.$digest();
          });
        })();
        
      }
    ]);
    
})(window, window.angular);