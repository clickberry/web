(function (window, angular) {
    "use strict";

    var module = angular.module('video', [
      'ui.router',
      'settings',
      'projects-api'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('home.video', {
            url: 'show/:id',
            views: {
              'video': {
                controller: 'VideoCtrl',
                templateUrl: 'video.html'
              }
            },
            data: {
              pageTitle: 'Video on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('VideoCtrl', [
      '$rootScope', '$scope', '$state', '$stateParams', '$mdDialog', 'urls', 'projectsApi',
      function ($rootScope, $scope, $state, $stateParams, $mdDialog, urls, projectsApi) {
        var id = $stateParams.id;
        if (!id) {
          return $state.go('home');
        }

        $scope.url = urls.player + id;

        $mdDialog.show({
          clickOutsideToClose: true,
          scope: $scope,
          preserveScope: true,
          template: '<md-dialog class="video-popup" aria-label="Video on Clickberry">' +
                    '  <md-dialog-content>' +
                    '     <div class="video-container">' + 
                    '       <iframe frameborder="0" width="100%" height="100%"' + 'src="' + $scope.url + '" />' + 
                    '       <div class="close-video">' + 
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