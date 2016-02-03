(function (window, angular) {
    "use strict";

    var module = angular.module('my-videos.video', [
      'ui.router',
      'settings',
      'projects-api',
      'user'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('my-videos.video', {
            url: '/:id',
            views: {
              'video': {
                controller: 'MyVideoCtrl'
              }
            },
            data: {
              pageTitle: 'Video on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('MyVideoCtrl', [
      '$rootScope', '$scope', '$state', '$stateParams', '$mdDialog', 'urls', 'projectsApi', 'user', '$sce',
      function ($rootScope, $scope, $state, $stateParams, $mdDialog, urls, projectsApi, user, $sce) {
        var id = $stateParams.id;
        if (!id) {
          return $state.go('home');
        }

        $scope.url = urls.player + id;

        // passing tokens to allow editor play private projects
        if (user.accessToken && user.refreshToken) {
          $scope.url = $scope.url.replace('#', '?access_token=' + user.accessToken + '&refresh_token=' + user.refreshToken + '#');
        }

        $mdDialog.show({
          clickOutsideToClose: true,
          scope: $scope,
          preserveScope: true,
          template: '<md-dialog class="video-popup" aria-label="Video on Clickberry">' +
                    '  <md-dialog-content>' +
                    '     <div class="video-container">' + 
                    '       <div class="video-loading"><md-button aria-label="Video Loading" ng-disabled="true">Loading <i class="fa fa-circle-o-notch fa-spin faster"></i></md-button></div> ' +
                    '       <iframe frameborder="0" width="100%" height="100%"' + 'src="' + $scope.url + '" allowfullscreen />' + 
                    '       <div class="video-close">' + 
                    '         <md-button class="md-icon-button" aria-label="Close Video" ng-click="close()"><i class="fa fa-times-circle"></i>' + 
                    '       </div>' + 
                    '     </div>' +
                    '  </md-dialog-content>' +
                    '</md-dialog>'
        })
        .finally(function() {
          $state.go('^');
        });

        $scope.close = function () {
          $mdDialog.hide();
        };

      }
    ]);
})(window, window.angular);