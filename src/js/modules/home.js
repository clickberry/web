(function(window, angular) {
    "use strict";

    var module = angular.module('home', [
      'ui.router'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'HomeCtrl',
            data: {
              pageTitle: 'Clickberry Video Portal'
            }
          });
        }
    ]);

    // Controllers
    module.controller('HomeCtrl', [
      '$scope', '$state',
      function ($scope, $state) {

        
        
      }
    ]);
    
})(window, window.angular);