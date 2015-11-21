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

        (function loadProjects() {
          projectsApi.listPublic(50, function (err, data) {
            if (err) { throw err; }
            angular.forEach(data, function (i, idx) {
              if ((idx + 1) % 3 === 0) {
                i.size = 2;
              } else {
                i.size = 1;
              }
            });

            $scope.projects = data;
          });
        })();
        
      }
    ]);
    
})(window, window.angular);