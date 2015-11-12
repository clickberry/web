(function (window, angular) {
    "use strict";

    var module = angular.module('menu', ['user', 'constants']);

    module.directive('cbMenu', [
        '$state', 'events', 'user', function ($state, events, user) {
          return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'menu.html',
            link: function($scope) {
              $scope.menuExpanded = false;
              $scope.expandMenu = function() {
                $scope.menuExpanded = !$scope.menuExpanded;
              };

              $scope.user = null;
              $scope.$on(events.login, function (event, data) {
                $scope.user = data;
                $scope.$digest();
              });
              $scope.$on(events.logout, function () {
                $scope.user = null;
              });

              $scope.signoff = function () {
                user.destroy();
              };

              $scope.signup = function () {
                $state.go('signup');
              };

              $scope.signin = function () {
                $state.go('signin');
              };

              $scope.profile = function () {
                $state.go('profile');
              };
            }
          };
        }
    ])

})(window, window.angular);