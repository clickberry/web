(function(window, angular) {
    "use strict";

    var module = angular.module('my-videos', [
      'ui.router',
      'projects-api',
      'infinite-scroll',
      'user',
      'my-videos.video',
      'edit-video',
      'settings'
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
      '$scope', '$state', 'projectsApi', 'user', 'urls', '$mdDialog',
      function ($scope, $state, projectsApi, user, urls, $mdDialog) {
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

              i.shareUrl = urls.share + i.id;
              result.push(i);
            });

            $scope.projects = $scope.projects.concat(result);
            $scope.loading = false;
            $scope.$digest();
          });
        };

        $scope.deleteProject = function(project) {
          var confirm = $mdDialog.confirm()
            .ok('Delete!')
            .cancel('Cancel');          
          confirm = confirm.title('Would you like to delete your project?');
          confirm = confirm.content('The project "' + project.name +  '" will be deleted permanently.');

          $mdDialog.show(confirm).then(function() {
            projectsApi.delete(project.id, user.accessToken, function (err) {
              if (err) { 
                console.log(err.message);
                return $mdDialog.show($mdDialog.alert()
                  .clickOutsideToClose(true)
                  .title('Deletion error')
                  .content('Could not delete project! Try again.')
                  .ok('Ok'));
                }
              $scope.projects = [];
              $scope.allLoaded = false;
              $scope.loadProjects();
            });
          }, function() {
            // nothing to do
          });
        };
        
        $scope.loadProjects();
      }
    ]);
    
})(window, window.angular);