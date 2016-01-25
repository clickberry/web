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
      public: function (id, fn) {
        $.ajax({
            url: url + '/public/' + id,
            type: 'GET'
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Get public profile info
      list: function (ids, fn) {
        $.ajax({
            url: url + '/public/list/' + ids.join(','),
            type: 'GET'
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Update profile info
      update: function (params, access_token, fn) {
        var data = {
          email: params.email,
          name: params.name,
          avatarUrl: params.avatarUrl
        };

        $.ajax({
            url: url + '/' + params.id,
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

      // List all projects for current user
      listByUser: function (user_id, fn) {
        $.ajax({
            url: url + '/user/' + user_id,
            type: 'GET'
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
            url: url + '/all?' + 'top=' + (top || '') + '&last=' + (last_id || ''),
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
      },

      // Update profile info
      delete: function (id, access_token, fn) {
        $.ajax({
            url: url + '/' + id,
            type: 'DELETE',
            headers: {'Authorization': 'JWT ' + access_token}
          })
          .done(function() {
            fn(null);
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

  clbr.imagesApi = function (url) {
    return {
      // Uploads image
      upload: function (file, access_token, fn) {
        var data = new FormData();
        data.append('image', file, file.name);

        $.ajax({
            url: url + '/',
            type: 'POST',
            headers: {'Authorization': 'JWT ' + access_token},
            data: data,
            cache: false,
            processData: false,
            contentType: false
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },
      // Gets image by if
      get: function (id, fn) {
        $.ajax({
            url: url + '/' + id,
            type: 'GET'
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },
      // Deletes image by id
      update: function (id, access_token, fn) {
        $.ajax({
            url: url + '/' + id,
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

    var module = angular.module('edit-video', [
      'ui.router',
      'projects-api',
      'user'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('edit-video', {
            url: '/videos/edit/:id',
            templateUrl: 'edit-video.html',
            controller: 'EditVideoCtrl',
            data: {
              pageTitle: 'Edit Video on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('EditVideoCtrl', [
      '$scope', '$state', '$stateParams', 'projectsApi', 'user', '$mdDialog',
      function ($scope, $state, $stateParams, projectsApi, user, $mdDialog) {
        if (!$stateParams.id || !user.id) {
          return $state.go('home');
        }

        $scope.project = null;
        $scope.loading = false;

        (function loadProject (id) {
          if ($scope.loading || $scope.allLoaded) {
            return;
          }
          $scope.loading = true;
          projectsApi.get(id, user.accessToken, function (err, data) {
            if (err) { throw err; }
            $scope.project = data;
            $scope.loading = false;
            $scope.$digest();
          });
        })($stateParams.id);

        $scope.submit = function (project) {
          $scope.loading = true;
          projectsApi.update(project.id, project, user.accessToken, function (err, data) {
            if (err) { 
              console.log(err.message);
              return $mdDialog.show($mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Update error')
                .content('Could not update project! Check the data and try again.')
                .ok('Ok'));
              }
            $scope.project = data;
            $scope.loading = false;
            $state.go('my-videos');
          });
        };
      }
    ]);
    
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

    module.filter('abbreviation', [
      function() {
        return function(text) {
          if (!text) {
            return 'N/A';
          }

          var parts = text.split(' ');
          var abbr = parts[0][0];
          if (parts.length > 1) {
            abbr += parts[parts.length - 1][0];
          }

          return abbr.toUpperCase();
        };
      }
    ]);
    
})(window, window.angular, window.moment);
(function(window, angular) {
    "use strict";

    var module = angular.module('home', [
      'ui.router',
      'projects-api',
      'profiles-api',
      'infinite-scroll',
      'socialshare',
      'settings'
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
      '$rootScope', '$scope', '$state', 'projectsApi', '$mdDialog', 'urls', 'profilesApi',
      function ($rootScope, $scope, $state, projectsApi, $mdDialog, urls, profilesApi) {

        $scope.projects = [];
        $scope.allLoaded = false;
        $scope.loading = false;

        var lastId = null;
        $rootScope.profilesCache = $rootScope.profilesCache || {};

        function loadMissingProfiles(map) {
          var ids = [];
          for (var key in map) {
            if (map[key] !== null) {
              continue;
            }
            ids.push(key);
          }

          if (!ids.length) {
            return;
          }
          profilesApi.list(ids, function (err, data) {
            if (err) {
              return console.log(err.message);
            }
            angular.forEach(data, function (i) {
              map[i.id] = i;
            });
          });
        }

        $scope.loadProjects = function () {
          if ($scope.loading || $scope.allLoaded) {
            return;
          }
          $scope.loading = true;
          projectsApi.listPublic(50, lastId, function (err, data) {
            $scope.loading = false;
            if (err) {
              return console.log(err.message);
            }
            if (!data.length) {
              $scope.allLoaded = true;
              $scope.loading = false;
              $scope.$digest();
              return;
            }

            lastId = data[data.length - 1].id;

            var result = [];
            var idx = $scope.projects.length;
            var plan = [
              {w: 12, h: 6},
              {w: 6, h: 5},
              {w: 6, h: 5},
              {w: 12, h: 6},
              {w: 4, h: 4},
              {w: 4, h: 4},
              {w: 4, h: 4},
              {w: 12, h: 6},
              {w: 12, h: 6},
              {w: 6, h: 5},
              {w: 6, h: 5},
              {w: 12, h: 6},
              {w: 12, h: 6},
              {w: 4, h: 4},
              {w: 4, h: 4},
              {w: 4, h: 4}
            ];
            angular.forEach(data, function (i) {
              var p = plan[idx % plan.length];
              i.cols = p.w;
              i.rows = p.h;

              // filter inconsisten projects
              if (!i.imageUri || !i.videos || !i.videos.length) {
                return;
              }

              i.shareUrl = urls.share + i.id;
              $rootScope.profilesCache[i.userId] = $rootScope.profilesCache[i.userId] || null;

              idx++;
              result.push(i);
            });

            $scope.projects = $scope.projects.concat(result);
            $scope.$digest();

            // loading profiles
            loadMissingProfiles($rootScope.profilesCache);
          });
        };
        
        $scope.loadProjects();
      }
    ]);
    
})(window, window.angular);
(function(window, angular, clbr) {
  "use strict";

  var module = angular.module('images-api', ['settings']);

  module.factory('imagesApi', [
    'urls', function (urls) {
      return clbr.imagesApi(urls.imagesApi);
    }
  ]);  
    
})(window, window.angular, window.clbr);
(function (window, angular) {
    "use strict";

    var module = angular.module('menu', ['user', 'constants', 'settings']);

    module.directive('cbMenu', [
        '$window','$state', 'events', 'user', 'urls', function ($window, $state, events, user, urls) {
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
                if (user.accessToken && user.refreshToken) {
                  editorUrl += '?access_token=' + user.accessToken +'&refresh_token=' + user.refreshToken;
                }
                $window.location.href = editorUrl;
              };
            }
          };
        }
    ])

})(window, window.angular);
(function (window, angular) {
    "use strict";

    var module = angular.module('my-videos.video', [
      'ui.router',
      'settings',
      'projects-api'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('my-videos.video', {
            url: '/:id',
            views: {
              'video': {
                controller: 'MyVideoCtrl'
              }
            },
            data: {
              pageTitle: 'Video on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('MyVideoCtrl', [
      '$rootScope', '$scope', '$state', '$stateParams', '$mdDialog', 'urls', 'projectsApi',
      function ($rootScope, $scope, $state, $stateParams, $mdDialog, urls, projectsApi) {
        var id = $stateParams.id;
        if (!id) {
          return $state.go('home');
        }

        $scope.url = urls.player + id;

        $mdDialog.show({
          clickOutsideToClose: true,
          scope: $scope,
          preserveScope: true,
          template: '<md-dialog class="video-popup" aria-label="Video on Clickberry">' +
                    '  <md-dialog-content>' +
                    '     <div class="video-container">' + 
                    '       <div class="video-loading"><md-button aria-label="Video Loading" ng-disabled="true">Loading <i class="fa fa-circle-o-notch fa-spin faster"></i></md-button></div> ' +
                    '       <iframe frameborder="0" width="100%" height="100%"' + 'src="' + $scope.url + '" allowfullscreen />' + 
                    '       <div class="video-close">' + 
                    '         <md-button class="md-icon-button" aria-label="Close Video" ng-click="close()"><i class="fa fa-times-circle"></i>' + 
                    '       </div>' + 
                    '     </div>' +
                    '  </md-dialog-content>' +
                    '</md-dialog>'
        })
        .finally(function() {
          $state.go('^');
        });

        $scope.close = function () {
          $mdDialog.hide();
        };

      }
    ]);
})(window, window.angular);
(function(window, angular) {
    "use strict";

    var module = angular.module('my-videos', [
      'ui.router',
      'projects-api',
      'infinite-scroll',
      'user',
      'my-videos.video',
      'edit-video',
      'settings'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('my-videos', {
            url: '/videos',
            templateUrl: 'my-videos.html',
            controller: 'MyVideosCtrl',
            data: {
              pageTitle: 'My Videos on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('MyVideosCtrl', [
      '$scope', '$state', 'projectsApi', 'user', 'urls', '$mdDialog',
      function ($scope, $state, projectsApi, user, urls, $mdDialog) {
        if (!user.id) {
          return $state.go('home');
        }

        $scope.projects = [];
        $scope.allLoaded = false;
        $scope.loading = false;

        $scope.loadProjects = function () {
          if ($scope.loading || $scope.allLoaded) {
            return;
          }
          $scope.loading = true;
          projectsApi.listMy(user.accessToken, function (err, data) {
            if (err) { throw err; }
            $scope.allLoaded = true;

            var result = [];
            angular.forEach(data, function (i) {
              // filter inconsisten projects
              if (!i.imageUri || !i.videos || !i.videos.length) {
                return;
              }

              i.shareUrl = urls.share + i.id;
              result.push(i);
            });

            $scope.projects = $scope.projects.concat(result);
            $scope.loading = false;
            $scope.$digest();
          });
        };

        $scope.deleteProject = function(project) {
          var confirm = $mdDialog.confirm()
            .ok('Delete!')
            .cancel('Cancel');          
          confirm = confirm.title('Would you like to delete your project?');
          confirm = confirm.content('The project "' + project.name +  '" will be deleted permanently.');

          $mdDialog.show(confirm).then(function() {
            projectsApi.delete(project.id, user.accessToken, function (err) {
              if (err) { 
                console.log(err.message);
                return $mdDialog.show($mdDialog.alert()
                  .clickOutsideToClose(true)
                  .title('Deletion error')
                  .content('Could not delete project! Try again.')
                  .ok('Ok'));
                }
              $scope.projects = [];
              $scope.allLoaded = false;
              $scope.loadProjects();
            });
          }, function() {
            // nothing to do
          });
        };
        
        $scope.loadProjects();
      }
    ]);
    
})(window, window.angular);
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
(function (angular) {
    "use strict";

    angular.module('settings', [])
      .constant('urls', {
        authApi: '%AUTH_API%',
        profilesApi: '%PROFILES_API%',
        projectsApi: '%PROJECTS_API%',
        imagesApi: '%IMAGES_API%',
        player: '%PLAYER%',
        editor: '%EDITOR%',
        share: '%SHARE_URL%'
      });
}) ((window.angular));
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
      '$scope', '$state', 'authApi', 'user', '$mdDialog',
      function ($scope, $state, authApi, user, $mdDialog) {

        $scope.signin = {};
        $scope.loading = false;

        $scope.submit = function (params) {
          $scope.loading = true;
          authApi.signin(params.email, params.password, function (err, data) {
            $scope.loading = false;
            if (err) {
              console.log(err.message);
              return $mdDialog.show($mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Sign in error')
                .content('Check your email/password and try again.')
                .ok('Got it!'));
            }

            user.init(data.accessToken, data.refreshToken);
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
      '$scope', '$state', 'authApi', '$mdDialog',
      function ($scope, $state, authApi, $mdDialog) {

        $scope.signup = {};
        $scope.loading = false;

        $scope.submit = function (params) {
          $scope.loading = true;
          authApi.signup(params.email, params.password, function (err, data) {
            $scope.loading = false;
            if (err) {
              console.log(err.message);
              return $mdDialog.show($mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Sign up error')
                .content('Check inputs and try again.')
                .ok('Got it!'));
            }

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
(function(angular) {
  "use strict";

  var module = angular.module('socialshare', []);

  module.directive('share', ['$location', function ($location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        if (!attrs.shareUrl) {
          attrs.shareUrl = $location.absUrl();
        }

        attrs.shareTitle = (attrs.shareTitle || '').substring(0, 200);
        attrs.shareDescription = (attrs.shareDescription || '').substring(0, 200);
        attrs.shareImage = attrs.shareImage || '';

        // encode
        var url = encodeURIComponent(attrs.shareUrl);
        var title = encodeURIComponent(attrs.shareTitle);
        var description = encodeURIComponent(attrs.shareDescription);
        var image = encodeURIComponent(attrs.shareImage);

        // build share url
        var shareUrl = null;
        switch (attrs.shareType) {
          case 'facebook': 
            shareUrl = "https://www.facebook.com/sharer.php?u=" + url + "&t=" + title;
            break;
          case 'vk':
            shareUrl = "http://vk.com/share.php?url=" + url + "&description=" + title + "&image=" + image;
            break;
          case 'google':
            shareUrl = "https://plus.google.com/share?url=" + url;
            break;
          case 'twitter':
            var twitterTitle = encodeURIComponent(decodeURIComponent(title).substring(0, 140));
            shareUrl = "https://twitter.com/intent/tweet?url=" + url + "&text=" + twitterTitle;
            break;
        }

        element.attr('href', shareUrl);
        element.attr('target', "_blank");
      }
    };
}]);
    
})(window.angular);
(function (window, angular) {
    "use strict";

    var module = angular.module('user-page.video', [
      'ui.router',
      'settings',
      'projects-api'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('user-page.video', {
            url: '/:project_id',
            views: {
              'video': {
                controller: 'UserVideoCtrl'
              }
            },
            data: {
              pageTitle: 'User Video on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('UserVideoCtrl', [
      '$rootScope', '$scope', '$state', '$stateParams', '$mdDialog', 'urls', 'projectsApi',
      function ($rootScope, $scope, $state, $stateParams, $mdDialog, urls, projectsApi) {
        var id = $stateParams.project_id;
        if (!id) {
          return $state.go('home');
        }

        $scope.url = urls.player + id;

        $mdDialog.show({
          clickOutsideToClose: true,
          scope: $scope,
          preserveScope: true,
          template: '<md-dialog class="video-popup" aria-label="Video on Clickberry">' +
                    '  <md-dialog-content>' +
                    '     <div class="video-container">' + 
                    '       <div class="video-loading"><md-button aria-label="Video Loading" ng-disabled="true">Loading <i class="fa fa-circle-o-notch fa-spin faster"></i></md-button></div> ' +
                    '       <iframe frameborder="0" width="100%" height="100%"' + 'src="' + $scope.url + '" allowfullscreen />' + 
                    '       <div class="video-close">' + 
                    '         <md-button class="md-icon-button" aria-label="Close Video" ng-click="close()"><i class="fa fa-times-circle"></i>' + 
                    '       </div>' + 
                    '     </div>' +
                    '  </md-dialog-content>' +
                    '</md-dialog>'
        })
        .finally(function() {
          $state.go('^');
        });

        $scope.close = function () {
          $mdDialog.hide();
        };

      }
    ]);
})(window, window.angular);
(function(window, angular) {
    "use strict";

    var module = angular.module('user-page', [
      'ui.router',
      'projects-api',
      'profiles-api',
      'infinite-scroll',
      'user',
      'user-page.video',
      'settings'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('user-page', {
            url: '/user/:id',
            templateUrl: 'user-page.html',
            controller: 'UserPageCtrl',
            data: {
              pageTitle: 'User Details on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('UserPageCtrl', [
      '$rootScope', '$scope', '$state', '$stateParams', 'projectsApi', 'profilesApi', 'urls',
      function ($rootScope, $scope, $state, $stateParams, projectsApi, profilesApi, urls) {
        var id = $stateParams.id;
        if (!id) {
          return $state.go('home');
        }

        $scope.projects = [];
        $scope.allLoaded = false;
        $scope.loading = false;

        $scope.profile = null;

        // loading user projects
        (function loadProjects(user_id) {
          if ($scope.loading || $scope.allLoaded) {
            return;
          }
          $scope.loading = true;
          projectsApi.listByUser(user_id, function (err, data) {
            if (err) { throw err; }
            $scope.allLoaded = true;

            var result = [];
            angular.forEach(data, function (i) {
              // filter inconsisten projects
              if (!i.imageUri || !i.videos || !i.videos.length) {
                return;
              }

              i.shareUrl = urls.share + i.id;
              result.push(i);
            });

            $scope.projects = $scope.projects.concat(result);
            $scope.loading = false;
            $scope.$digest();
          });
        })(id);

        // loading user profile
        (function loadProfile(user_id) {
          if ($rootScope.profilesCache[user_id]) {
            $scope.profile = $rootScope.profilesCache[user_id];
            return;
          }

          profilesApi.public(user_id, function (err, data) {
            if (err) { throw err; }
            $scope.profile = data;
            $rootScope.profilesCache[user_id] = data;
          });
        })(id);
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
              var tokens = {
                accessToken: params.access_token, 
                refreshToken: params.refresh_token
              };
              $location.search('access_token', null);
              $location.search('refresh_token', null);
              return tokens;
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
              profilesApi.get(user.id, accessToken, function (err, data) {
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
                persistTokens();
              });
            }, 60000);
          }

          // destroys the account data
          function destroy () {
            $interval.cancel(intervalId);
            angular.extend(user, fields);
            destroyTokens();
            emitLogoutEvent();
          }

          // deletes the account permanently
          function deletePermanently () {
            authApi.del(user.accessToken, function (err) {
              if (err) { throw err; }
              destroy();
            });
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
          user.deletePermanently = deletePermanently;

          return user;
        }
  ]);

})(window, window.angular);
(function (window, angular) {
    "use strict";

    var module = angular.module('video', [
      'ui.router',
      'settings',
      'projects-api'
    ]);

    // Routes
    module.config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('home.video', {
            url: 'show/:id',
            views: {
              'video': {
                controller: 'VideoCtrl'
              }
            },
            data: {
              pageTitle: 'Video on Clickberry'
            }
          });
        }
    ]);

    // Controllers
    module.controller('VideoCtrl', [
      '$rootScope', '$scope', '$state', '$stateParams', '$mdDialog', 'urls', 'projectsApi',
      function ($rootScope, $scope, $state, $stateParams, $mdDialog, urls, projectsApi) {
        var id = $stateParams.id;
        if (!id) {
          return $state.go('home');
        }

        $scope.url = urls.player + id;

        $mdDialog.show({
          clickOutsideToClose: true,
          scope: $scope,
          preserveScope: true,
          template: '<md-dialog class="video-popup" aria-label="Video on Clickberry">' +
                    '  <md-dialog-content>' +
                    '     <div class="video-container">' + 
                    '       <div class="video-loading"><md-button aria-label="Video Loading" ng-disabled="true">Loading <i class="fa fa-circle-o-notch fa-spin faster"></i></md-button></div> ' +
                    '       <iframe frameborder="0" width="100%" height="100%"' + 'src="' + $scope.url + '" allowfullscreen />' + 
                    '       <div class="video-close">' + 
                    '         <md-button class="md-icon-button" aria-label="Close Video" ng-click="close()"><i class="fa fa-times-circle"></i>' + 
                    '       </div>' + 
                    '     </div>' +
                    '  </md-dialog-content>' +
                    '</md-dialog>'
        })
        .finally(function() {
          $state.go('^');
        });

        $scope.close = function () {
          $mdDialog.hide();
        };

      }
    ]);
})(window, window.angular);
(function (angular) {
    'use strict';

    var app = angular.module('clbr', [
      'ui.router', // for ui routing
      'ngMaterial', // activate material design
      'home',
      'signup',
      'signin',
      'profile',
      'account-settings',
      'directives',
      'filters',
      'user',
      'exceptions',
      'video',
      'my-videos',
      'user-page'
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

        $rootScope.profilesCache = {};

        $rootScope.pageTitle = 'Clickberry Video Portal';
        $rootScope.$on('$stateChangeSuccess', function (event, toState/*, toParams, from, fromParams*/) {
          if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
            $rootScope.pageTitle = toState.data.pageTitle;
          }
        });
      }
    ]);

})((window.angular));