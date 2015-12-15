(function (window, angular) {
    "use strict";

    var module = angular.module('account-settings', [
      'ui.router',
      'user'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('account-settings', {
            url: '/account-settings',
            templateUrl: 'account-settings.html',
            controller: 'AccountSettingsCtrl',
            data: {
              pageTitle: 'Account Settings on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('AccountSettingsCtrl', [
      '$rootScope', '$scope', '$state', 'user', '$mdDialog',
      function ($rootScope, $scope, $state, user, $mdDialog) {

        if (!user.id) {
          return $state.go('home');
        }

        $scope.deleteAccount = function() {
          var confirm = $mdDialog.confirm()
            .ok('Delete!')
            .cancel('Cancel');          
          confirm = confirm.title('Would you like to delete your account?');
          confirm = confirm.content('All of your data will be deleted permanently.');

          $mdDialog.show(confirm).then(function() {
            user.deletePermanently();
            $state.go('home');
          }, function() {
            // nothing to do
          });
        };
      }
    ]);
})(window, window.angular);