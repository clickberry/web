(function (window, angular) {
    "use strict";

    var module = angular.module('menu', ['user', 'constants', 'settings']);

    module.directive('cbMenu', [
        '$window','$state', 'events', 'user', 'urls', 'authApi', function ($window, $state, events, user, urls, authApi) {
          return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'menu.html',
            link: function($scope) {
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

              $scope.goToEditor = function () {
                var editorUrl = urls.editor;
                user.getExchange(function(exchangeToken){
                    if(exchangeToken){
                        editorUrl += '?exchange_token=' + exchangeToken + '&access_token=' + user.accessToken +'&refresh_token=' + user.refreshToken;
                    }

                    $window.location.href = editorUrl;
                });
              };
            }
          };
        }
    ])

})(window, window.angular);