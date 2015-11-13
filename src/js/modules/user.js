(function (window, angular) {
    "use strict";

    var module = angular.module('user', ['auth-api', 'constants']);

    module.factory('user', [
      '$rootScope', '$interval', '$location', 'authApi', 'events', 
        function ($rootScope, $interval, $location, authApi, events) {
          var intervalId;
          var user = {};

          var fields = {
            id: undefined,
            email: undefined,
            accessToken: undefined,
            refreshToken: undefined
          };

          // set social callback
          (function setRedirectUrl() {
            var baseUri = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/#/'; // to use angular routing
            authApi.setRedirect(baseUri, function () {});
          })();

          // emits login event
          function emitLoginEvent(data) {
            $rootScope.$broadcast(events.login, data);
          }

          // emits logout event
          function emitLogoutEvent() {
            $rootScope.$broadcast(events.logout);
          }

          // inits a user account
          function init (accessToken, refreshToken) {
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;

            // gets user account info
            authApi.get(accessToken, function (err, data) {
              if (err) { throw err; }
              user.id = data.id;
              user.email = data.email;
              if (!user.email && data.memberships) {
                // checking memberships
                for (var i = 0; i < data.memberships.length; ++i) {
                  if (data.memberships[i].email) {
                    user.email = data.memberships[i].email;
                    break;
                  }
                }
              }

              emitLoginEvent({id: user.id, email: user.email});
            });

            // sets the interval to refresh token
            intervalId = $interval(function() {
              authApi.refresh(user.refreshToken, function (err, data) {
                if (err) { throw err; }
                user.accessToken = data.accessToken;
                user.refreshToken = data.refreshToken;
              });
            }, 60000);
          }

          // destroys the account
          function destroy () {
            $interval.cancel(intervalId);
            angular.extend(user, fields);
            emitLogoutEvent();
          }

          // handles social login redirects
          (function handleSocialRedirect() {
            var params = $location.search();
            if (params.access_token && params.refresh_token){
              // initializing user
              init(params.access_token, params.refresh_token);
            }
          })();

          user.init = init;
          user.destroy = destroy;

          return user;
    }
  ]);

})(window, window.angular);