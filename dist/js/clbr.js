(function(window, $) {
  
  if (!$) {
    return console.error('jQuery required.');
  }

  var clbr = window.clbr = window.clbr || {};

  clbr.authApi = function (url) {
    return {
      // Sign up by email and password
      signup: function (email, password, fn) {
        var data = {
          email: email,
          password: password
        };

        $.post(url + '/signup', data)
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Sets redirect url after social registrations
      setRedirect: function (redirect_url) {
        var data = {
          callbackUri: redirect_url
        };

        $.ajax({
            url: url + '/social',
            type: 'POST'
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Registration/login via Facebook
      facebook: function () {
        window.location.href = url + '/facebook';
      },

      // Registration/login via Twitter
      twitter: function () {
        window.location.href = url + '/twitter';
      },

      // Registration/login via Google
      twitter: function () {
        window.location.href = url + '/google';
      },

      // Registration/login via Vk
      vk: function () {
        window.location.href = url + '/vk';
      },

      // Updates access & refresh tokens
      refresh: function (refreshToken, fn) {
        $.ajax({
            url: url + '/refresh',
            type: 'GET',
            headers: {'Authorization': 'JWT ' + refreshToken}
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Signs out current user
      signout: function (refreshToken, fn) {
        $.ajax({
            url: url + '/signout',
            type: 'DELETE',
            headers: {'Authorization': 'JWT ' + refreshToken}
          })
          .done(function() {
            fn();
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Deletes all sessions for current user
      signoutall: function (refreshToken, fn) {
        $.ajax({
            url: url + '/signoutall',
            type: 'DELETE',
            headers: {'Authorization': 'JWT ' + refreshToken}
          })
          .done(function() {
            fn();
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Merges two accaunts
      merge: function (access_token1, access_token2) {
        var data = {
          token1: access_token1,
          token2: access_token2
        };

        $.ajax({
            url: url + '/merge',
            type: 'POST'
          })
          .done(function() {
            fn();
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Unmerges social account
      unmerge: function (access_token, provider, id) {
        var data = {
          provider: provider,
          id: id
        };

        $.ajax({
            url: url + '/unmerge',
            type: 'DELETE',
            headers: {'Authorization': 'JWT ' + access_token}
          })
          .done(function() {
            fn();
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Gets user info
      get: function (access_token) {
        $.ajax({
            url: url + '/account',
            type: 'GET',
            headers: {'Authorization': 'JWT ' + access_token}
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Deletes user account
      del: function (access_token) {
        $.ajax({
            url: url + '/account',
            type: 'DELETE',
            headers: {'Authorization': 'JWT ' + access_token}
          })
          .done(function() {
            fn();
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      }
    };
  };

})(window, window.jQuery);
(function(window, angular, clbr) {
    "use strict";

    var module = angular.module('auth-api', ['constants']);

    module.factory('authService', [
        'urls', function (urls) {
            return clbr.authApi(urls.authApi);
        }
    ]);
    
})(window, window.angular, window.clbr);
(function(window, angular, jQuery) {
    "use strict";

    var module = angular.module("material", []);

    // Config
    module.config([
        function () {
            // init material design
            jQuery.material.init();
        }
    ]);
    
})(window, window.angular, window.jQuery);
(function (window, angular) {
    'use strict';

    // Constants module
    angular.module('constants', []) 
      .constant('jQuery', window.$)
      .constant('urls', {
        'authApi': 'http://auth.qa.clbr.ws'
      });

    var app = angular.module('clbr', [
      'constants',
      'ui.router', // for ui routing
      'material', // activate material design
      'auth-api'
    ]);

    // Config
    app.config([
      '$urlRouterProvider', '$locationProvider', '$stateProvider',
      function ($urlRouterProvider, $locationProvider, $stateProvider) {
        // routes
        $stateProvider
          .state('clbr', {
            'abstract': true,
            template: '<div ui-view></div>'
          });

        // html5 routing without #
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
      }
    ]);

    // Main application controller
    app.controller('ClickberryCtrl', [
      '$rootScope', 'authService',
      function ($rootScope, authService) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState/*, toParams, from, fromParams*/) {
          if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
            $rootScope.pageTitle = toState.data.pageTitle;
          }
        });

        $rootScope.test = function () {
          authService.facebook();
        };
      }
    ]);

})(window, window.angular);