(function (window, angular) {
    "use strict";

    var module = angular.module('profile', [
      'ui.router',
      'profiles-api',
      'user',
      'constants',
      'angularFileUpload',
      'images-api'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('profile', {
            url: '/profile',
            templateUrl: 'profile.html',
            controller: 'ProfileCtrl',
            data: {
              pageTitle: 'Your Profile on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('ProfileCtrl', [
      '$rootScope', '$scope', '$state', 'profilesApi', 'user', 'events', 'FileUploader', 'imagesApi', '$mdDialog',
      function ($rootScope, $scope, $state, profilesApi, user, events, FileUploader, imagesApi, $mdDialog) {
        if (!user.id) {
          return $state.go('home');
        }

        $scope.profile = {};
        $scope.loading = false;

        $scope.uploader = new FileUploader({
          onAfterAddingFile: function (item) {
            // uploading
            imagesApi.upload(item._file, user.accessToken, function (err, result) {
              if (err) { 
                console.log(err.message);
                return $mdDialog.show($mdDialog.alert()
                  .clickOutsideToClose(true)
                  .title('Upload error')
                  .content('Could not upload avatar, try smaller image or different format.')
                  .ok('Got it!'));
              }
              $scope.profile.avatarUrl = result.url;
              $scope.$digest();
            });
          }
        });

        $scope.submit = function (params) {
          $scope.loading = true;
          var options = {
            id: user.id,
            email: params.email,
            name: params.name,
            avatarUrl: params.avatarUrl || ''
          };
          profilesApi.update(options, user.accessToken, function (err, data) {
            $scope.loading = false;
            if (err) {
              console.log(err.message);
              return $mdDialog.show($mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Profile update error')
                .content('Could not update profile, check inputs and try again.')
                .ok('Got it!'));
            }
            
            $scope.$digest();
            $rootScope.$broadcast(events.profileUpdate, data);
          });
        };

        (function load() {
          $scope.loading = true;
          profilesApi.get(user.id, user.accessToken, function (err, data) {
            if (err) { throw err; }
            $scope.profile = data;
            $scope.loading = false;
            $scope.$digest();
          });
        })();
      }
    ]);
})(window, window.angular);