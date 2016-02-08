(function (window, angular) {
    "use strict";

    var module = angular.module('contacts', [
      'ui.router',
      'feedback-api'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('contacts', {
            url: '/contacts',
            templateUrl: 'contacts.html',
            controller: 'ContactsCtrl',
            data: {
              pageTitle: 'Clickberry Contacts'
            }
          });
        }
    ]);

    // Controllers
    module.controller('ContactsCtrl', [
      '$scope', '$state', 'feedbackApi', '$mdDialog',
      function ($scope, $state, feedbackApi, $mdDialog) {

        $scope.feedback = {};
        $scope.loading = false;

        $scope.submit = function (params) {
          $scope.loading = true;
          feedbackApi.post(params.email, params.name, params.comment, function (err) {
            $scope.loading = false;
            if (err) {
              console.log(err.message);
              return $mdDialog.show($mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Server error')
                .content('An error occured while trying to send your feedback. Try again later.')
                .ok('Got it!'));
            }

            $mdDialog.show($mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Thank you for your feedback')
              .content('Your feedback has been sent to administrator. Thank you.')
              .ok('Got it!'));

            $state.go('home');
          });
        };
      }
    ]);
})(window, window.angular);