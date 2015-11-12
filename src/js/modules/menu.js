(function (window, angular) {
    "use strict";

    var module = angular.module('menu', ['user', 'constants']);

    module.directive('cbMenu', [
        'events', 'user', function (events, user) {
          return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'menu.html',
            link: function($scope) {
              $scope.menuExpanded = false;
              $scope.expandMenu = function() {
                $scope.menuExpanded = !$scope.menuExpanded;
              };

              $scope.signoff = function () {
                user.destroy();
              };

              $scope.user = null;
              $scope.$on(events.login, function (event, data) {
                $scope.user = data;
                $scope.$digest();
              });
              $scope.$on(events.logout, function () {
                $scope.user = null;
              });
            }
          };
        }
    ])

})(window, window.angular);