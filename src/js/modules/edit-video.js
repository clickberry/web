(function(window, angular) {
    "use strict";

    var module = angular.module('edit-video', [
      'ui.router',
      'projects-api',
      'user'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('edit-video', {
            url: '/videos/edit/:id',
            templateUrl: 'edit-video.html',
            controller: 'EditVideoCtrl',
            data: {
              pageTitle: 'Edit Video on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('EditVideoCtrl', [
      '$scope', '$state', '$stateParams', 'projectsApi', 'user', '$mdDialog',
      function ($scope, $state, $stateParams, projectsApi, user, $mdDialog) {
        if (!$stateParams.id || !user.id) {
          return $state.go('home');
        }

        $scope.project = null;
        $scope.loading = false;

        (function loadProject (id) {
          if ($scope.loading || $scope.allLoaded) {
            return;
          }
          $scope.loading = true;
          projectsApi.get(id, user.accessToken, function (err, data) {
            if (err) { throw err; }
            $scope.project = data;
            $scope.loading = false;
            $scope.$digest();
          });
        })($stateParams.id);

        $scope.submit = function (project) {
          $scope.loading = true;
          projectsApi.update(project.id, project, user.accessToken, function (err, data) {
            if (err) { 
              console.log(err.message);
              return $mdDialog.show($mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Update error')
                .content('Could not update project! Check the data and try again.')
                .ok('Ok'));
              }
            $scope.project = data;
            $scope.loading = false;
            $state.go('my-videos');
          });
        };
      }
    ]);
    
})(window, window.angular);