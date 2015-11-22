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

      // Sign in by email and password
      signin: function (email, password, fn) {
        var data = {
          email: email,
          password: password
        };

        $.post(url + '/signin', data)
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Sets redirect url after social registrations
      setRedirect: function (redirect_url, fn) {
        var data = {
          callbackUri: redirect_url
        };

        $.ajax({
            url: url + '/social',
            type: 'POST',
            data: data,
            xhrFields: {
              withCredentials: true
           }
          })
          .done(function() {
            fn();
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
      google: function () {
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
      merge: function (access_token1, access_token2, fn) {
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
      unmerge: function (access_token, provider, id, fn) {
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
      get: function (access_token, fn) {
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
      del: function (access_token, fn) {
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
(function(window, $) {
  
  if (!$) {
    return console.error('jQuery required.');
  }

  var clbr = window.clbr = window.clbr || {};

  clbr.profilesApi = function (url) {
    return {
      // Get full profile info
      get: function (id, access_token, fn) {
        $.ajax({
            url: url + '/' + id,
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

      // Get public profile info
      public: function (id, access_token, fn) {
        $.ajax({
            url: url + '/public/' + id,
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

      // Update profile info
      update: function (id, email, name, access_token, fn) {
        var data = {
          email: email,
          name: name
        };

        $.ajax({
            url: url + '/' + id,
            type: 'PUT',
            headers: {'Authorization': 'JWT ' + access_token},
            data: data
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      }
    };
  };

})(window, window.jQuery);
(function(window, $) {
  
  if (!$) {
    return console.error('jQuery required.');
  }

  var clbr = window.clbr = window.clbr || {};

  clbr.projectsApi = function (url) {
    return {
      // Get project info
      get: function (id, access_token, fn) {
        if (!fn) {
          fn = access_token;
          access_token = null;
        }

        var headers = {};
        if (access_token) {
          headers['Authorization'] = 'JWT ' + access_token;
        }
        
        $.ajax({
            url: url + '/' + id,
            type: 'GET',
            headers: headers
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // List all projects for current user
      listMy: function (access_token, fn) {
        $.ajax({
            url: url,
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

      // List all public projects
      listPublic: function (top, last_id, fn) {
        if (!fn) {
          fn = last_id;
          last_id = null;
        }

        last_id = last_id || '';

        $.ajax({
            url: url + '/all?' + 'top=' + top || '' + '&last=' + last_id || '',
            type: 'GET'
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Creates new project
      save: function (data, access_token, fn) {
        $.ajax({
            url: url + '/' + id,
            type: 'POST',
            headers: {'Authorization': 'JWT ' + access_token},
            data: data
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Update profile info
      update: function (id, data, access_token, fn) {
        $.ajax({
            url: url + '/' + id,
            type: 'PUT',
            headers: {'Authorization': 'JWT ' + access_token},
            data: data
          })
          .done(function(result) {
            fn(null, result);
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

  var module = angular.module('auth-api', ['settings']);

  module.factory('authApi', [
    'urls', function (urls) {
      return clbr.authApi(urls.authApi);
    }
  ]);  
    
})(window, window.angular, window.clbr);
(function(window, angular) {
    "use strict";

    angular.module('constants', []) 
      .constant('events', {
      	'login': 'login',
        'logout': 'logout',
        'profileInit': 'profileInit',
        'profileUpdate': 'profileUpdate'
      });
    
})(window, window.angular);
(function(window, angular) {
    "use strict";
    
    var module = angular.module('directives', ['menu']);

    // input confirmation (e.g. passwords match)
    module.directive('cbConfirm', function() {
        return {
          restrict: 'A',
          require: 'ngModel',
          link: function(scope, elem, attrs, control) {
            var checker = function() {
              var e1 = scope.$eval(attrs.ngModel);
              var e2 = scope.$eval(attrs.cbConfirm);
              return e1 == e2 || (!e1 && !e2);
            };
            scope.$watch(checker, function(value) {
              // set the form control to valid if both 
              // inputs are the same, else invalid
              control.$setValidity("match", value);
            });
          }
        };
    });
    
})(window, window.angular);
(function(window, angular) {
    "use strict";

    var module = angular.module('exceptions', []);

    module.factory('$exceptionHandler', [
      function () {
        return function (exception) {
          var message = exception.message;
          if (!message || message === '[object Object]') {
              message = 'Application Error';
          }

          alert(message);
        };
      }
    ]);
    
})(window, window.angular);
(function(window, angular, moment) {
    "use strict";
    
    var module = angular.module('filters', []);

    module.filter('apiDate', [
      function() {
        return function(text, format) {
          var date = moment.utc(text); // ignore timezone
          return date.format(format);
        };
      }
    ]);

    module.filter('apiDateFromNow', [
      function() {
        return function(text) {
          var date = moment.utc(text); // ignore timezone
          return date.fromNow();
        };
      }
    ]);
    
})(window, window.angular, window.moment);
(function(window, angular) {
    "use strict";

    var module = angular.module('home', [
      'ui.router',
      'projects-api'
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
      '$scope', '$state', 'projectsApi',
      function ($scope, $state, projectsApi) {

        $scope.projects = [];

        (function loadProjects() {
          projectsApi.listPublic(50, function (err, data) {
            if (err) { throw err; }
            angular.forEach(data, function (i, idx) {
              if ((idx + 1) % 4 === 0) {
                i.size = 3;
              } else {
                i.size = 1;
              }
            });

            $scope.projects = data;
          });
        })();
        
      }
    ]);
    
})(window, window.angular);
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
            }
          };
        }
    ])

})(window, window.angular);
(function (window, angular) {
    "use strict";

    var module = angular.module('profile', [
      'ui.router',
      'profiles-api',
      'user',
      'constants'
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
      '$rootScope', '$scope', '$state', 'profilesApi', 'user', 'events',
      function ($rootScope, $scope, $state, profilesApi, user, events) {

        if (!user.id) {
          return $state.go('home');
        }

        $scope.profile = {};
        $scope.loading = false;

        $scope.submit = function (params) {
          $scope.loading = true;
          profilesApi.update(user.id, params.email, params.name, user.accessToken, function (err, data) {
            if (err) { throw err; }
            $scope.loading = false;
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
(function(window, angular, clbr) {
  "use strict";

  var module = angular.module('profiles-api', ['settings']);

  module.factory('profilesApi', [
    'urls', function (urls) {
      return clbr.profilesApi(urls.profilesApi);
    }
  ]);  
    
})(window, window.angular, window.clbr);
(function(window, angular, clbr) {
  "use strict";

  var module = angular.module('projects-api', ['settings']);

  module.factory('projectsApi', [
    'urls', function (urls) {
      return clbr.projectsApi(urls.projectsApi);
    }
  ]);
    
})(window, window.angular, window.clbr);
(function(window, angular) {
    "use strict";

    angular.module('settings', []) 
      .constant('urls', {
        'authApi': 'http://auth.qa.clbr.ws',
        'profilesApi': 'http://profiles.qa.clbr.ws',
        'projectsApi': 'http://projects.qa.clbr.ws'
      });
    
})(window, window.angular);
(function (window, angular) {
    "use strict";

    var module = angular.module('signin', [
      'ui.router',
      'auth-api',
      'user'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('signin', {
            url: '/signin',
            templateUrl: 'signin.html',
            controller: 'SigninCtrl',
            data: {
              pageTitle: 'Sign in to Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('SigninCtrl', [
      '$scope', '$state', 'authApi', 'user',
      function ($scope, $state, authApi, user) {

        $scope.signin = {};
        $scope.loading = false;

        $scope.submit = function (params) {
          $scope.loading = true;
          authApi.signin(params.email, params.password, function (err, data) {
            if (err) { throw err; }
            user.init(data.accessToken, data.refreshToken);
            $scope.loading = false;
            
            $state.go('home');
          });
        };

        $scope.goFacebook = function () {
          $scope.loading = true;
          authApi.facebook();
        };

        $scope.goTwitter = function () {
          $scope.loading = true;
          authApi.twitter();
        };

        $scope.goGoogle = function () {
          $scope.loading = true;
          authApi.google();
        };

        $scope.goVk = function () {
          $scope.loading = true;
          authApi.vk();
        };
      }
    ]);
})(window, window.angular);
(function (window, angular) {
    "use strict";

    var module = angular.module('signup', [
      'ui.router',
      'auth-api'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html',
            controller: 'SignupCtrl',
            data: {
              pageTitle: 'Sign up on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('SignupCtrl', [
      '$scope', '$state', 'authApi',
      function ($scope, $state, authApi) {

        $scope.signup = {};
        $scope.loading = false;

        $scope.submit = function (params) {
          $scope.loading = true;
          authApi.signup(params.email, params.password, function (err, data) {
            if (err) { return alert('Error: ' + err.message); }
            $scope.loading = false;

            $state.go('home');
          });
        };

        $scope.goFacebook = function () {
          $scope.loading = true;
          authApi.facebook();
        };

        $scope.goTwitter = function () {
          $scope.loading = true;
          authApi.twitter();
        };

        $scope.goGoogle = function () {
          $scope.loading = true;
          authApi.google();
        };

        $scope.goVk = function () {
          $scope.loading = true;
          authApi.vk();
        };
      }
    ]);
})(window, window.angular);
(function (window, angular) {
    "use strict";

    var module = angular.module('user', ['auth-api', 'profiles-api', 'constants', 'ngCookies']);

    module.factory('user', [
      '$rootScope', '$interval', '$location', '$window', '$cookies', 'authApi', 'profilesApi', 'events',
        function ($rootScope, $interval, $location, $window, $cookies, authApi, profilesApi, events) {          
          var cookieKey = 'tokens';
          var intervalId;
          var user = {};

          var fields = {
            id: undefined,
            email: undefined,
            accessToken: undefined,
            refreshToken: undefined,
            profile: undefined
          };

          // emits login event
          function emitLoginEvent(data) {
            $rootScope.$broadcast(events.login, data);
          }

          // emits logout event
          function emitLogoutEvent() {
            $rootScope.$broadcast(events.logout);
          }

          // emits profile init event
          function emitProfileInitEvent() {
            $rootScope.$broadcast(events.profileInit);
          }


          // persists tokens for 1 month
          function persistTokens() {
            if (!user.accessToken || !user.refreshToken) {
              return;
            }

            var now = new $window.Date();
            // this will set the expiration to 1 month
            var exp = new $window.Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

            var value = {accessToken: user.accessToken, refreshToken: user.refreshToken};
            $cookies.putObject(cookieKey, value, { expires: exp });
          }

          // restores tokens
          function restoreTokens() {
            return $cookies.getObject(cookieKey);
          }

          // destroys tokens
          function destroyTokens() {
            return $cookies.remove(cookieKey);
          }

          // refreshes tokens
          function refreshTokens(refreshToken, fn) {
            authApi.refresh(refreshToken, function (err, data) {
                if (err) { throw err; }
                fn(data);
              });
          }

          // handles social login redirects
          function getTokensFromSocialRedirect() {
            var params = $location.search();
            if (params.access_token && params.refresh_token){
              return {
                accessToken: params.access_token, 
                refreshToken: params.refresh_token
              };
            }
          }

          // set social callback
          function setRedirectUrl() {
            var baseUri = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/#/'; // /#/ to use angular routing
            authApi.setRedirect(baseUri, function () {});
          }

          // inits a user account
          function init (accessToken, refreshToken) {
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;

            emitProfileInitEvent();

            // gets user account info
            authApi.get(accessToken, function (err, data) {
              if (err) { throw err; }
              user.id = data.id;
              user.email = data.email;
              if (!user.email && data.memberships) {
                // checking memberships
                var i;
                for (i = 0; i < data.memberships.length; ++i) {
                  if (data.memberships[i].email) {
                    user.email = data.memberships[i].email;
                    break;
                  }
                }
              }

              // get profile info
              profilesApi.public(user.id, accessToken, function (err, data) {
                if (err) {
                  return emitLoginEvent({id: user.id, email: user.email});
                }

                user.profile = data;
                if (data.email) {
                  user.email = data.email;
                }
                emitLoginEvent({id: user.id, email: user.email, name: user.profile.name});
              });
              
            });

            // save tokens
            persistTokens();

            // sets the interval to refresh token
            intervalId = $interval(function() {
              refreshTokens(user.refreshToken, function (tokens) {
                user.refreshToken = tokens.refreshToken;
                user.accessToken = tokens.accessToken;
              });
            }, 60000);
          }

          // destroys the account
          function destroy () {
            $interval.cancel(intervalId);
            angular.extend(user, fields);
            destroyTokens();
            emitLogoutEvent();
          }

          // module init
          (function moduleInit() {
            setRedirectUrl();

            // get tokens from redirect url
            var tokens = getTokensFromSocialRedirect();
            if (tokens) {
              return init(tokens.accessToken, tokens.refreshToken);
            }
            
            // get tokens from cookies
            tokens = restoreTokens();
            if (tokens) {
              refreshTokens(tokens.refreshToken, function (newTokens) {
                init(newTokens.accessToken, newTokens.refreshToken);
              });
            }
          })();

          user.init = init;
          user.destroy = destroy;

          return user;
        }
  ]);

})(window, window.angular);
(function (window, angular) {
    'use strict';

    var app = angular.module('clbr', [
      'ui.router', // for ui routing
      'ngMaterial', // activate material design
      'home',
      'signup',
      'signin',
      'profile',
      'directives',
      'filters',
      'user',
      'exceptions'
    ]);

    // Config
    app.config([
      '$urlRouterProvider', '$locationProvider', '$stateProvider', '$mdThemingProvider',
      function ($urlRouterProvider, $locationProvider, $stateProvider, $mdThemingProvider) {
        
        // routes
        $stateProvider
          .state('clbr', {
            'abstract': true,
            template: '<div ui-view></div>'
          });

        // html5 routing without #
        $urlRouterProvider.otherwise('/');
        // $locationProvider.html5Mode(true);

        // theme
        $mdThemingProvider.theme('default')
          .primaryPalette('grey')
          .accentPalette('green', {
            'default': '500',
            'hue-1': '200',
            'hue-2': '700',
            'hue-3': 'A200'
          });
      }
    ]);

    // Main application controller
    app.controller('ClickberryCtrl', [
      '$rootScope',
      function ($rootScope) {

        $rootScope.pageTitle = 'Clickberry Video Portal';
        $rootScope.$on('$stateChangeSuccess', function (event, toState/*, toParams, from, fromParams*/) {
          if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
            $rootScope.pageTitle = toState.data.pageTitle;
          }
        });
      }
    ]);

})(window, window.angular);
//# sourceMappingURL=../maps/clbr.js.map
