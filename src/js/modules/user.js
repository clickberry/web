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