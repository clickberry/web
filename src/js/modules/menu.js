(function (window, angular) {
    "use strict";

    var module = angular.module('menu', ['user', 'constants']);

    module.directive('cbMenu', [
        '$window','$state', 'events', 'user', function ($window, $state, events, user) {
          return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'menu.html',
            link: function($scope) {
              $scope.menuExpanded = false;
              $scope.toggleMenu = function($event) {
                $scope.menuExpanded = !$scope.menuExpanded;
                $event.stopPropagation();
              };
              angular.element($window).on('click', function () {
                $scope.menuExpanded = false;
                $scope.$digest(); // because we're out of angular digest cycle
              });

              $scope.user = null;
              $scope.loading = false;
              $scope.$on(events.profileInit, function (event) {
                $scope.loading = true;
                $scope.$digest();
              });
              $scope.$on(events.login, function (event, data) {
                $scope.user = data;
                $scope.loading = false;
                $scope.$digest();
              });
              $scope.$on(events.logout, function () {
                $scope.user = null;
                $state.go('home');
              });
              $scope.$on(events.profileUpdate, function (event, data) {
                if ($scope.user) {
                  $scope.user.name = data.name;
                }
                
                $scope.$digest();
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

              $scope.settings = function () {
                $state.go('account-settings');
              };
            }
          };
        }
    ])

})(window, window.angular);