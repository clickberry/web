(function (window, angular) {
    "use strict";

    var module = angular.module('user', ['auth-api', 'settings', 'constants']);

    module.factory('user', [
      '$rootScope', '$interval', 'authApi', 'urls', 'events', 
        function ($rootScope, $interval, authApi, urls, events) {
          var intervalId;

          var fields = {
            id: undefined,
            email: undefined,
            accessToken: undefined,
            refreshToken: undefined
          };

          // set social callback
          authApi.setRedirect(urls.web, function () {});

          function emitLoginEvent(data) {
            $rootScope.$broadcast(events.login, data);
          }

          function emitLogoutEvent() {
            $rootScope.$broadcast(events.logout);
          }

          // inits a user account
          function init (accessToken, refreshToken) {
            var self = this;

            self.accessToken = accessToken;
            self.refreshToken = refreshToken;

            // gets user account info
            authApi.get(accessToken, function (err, data) {
              if (err) { throw err; }
              self.id = data.id;
              self.email = data.email;
              emitLoginEvent({id: data.id, email: data.email});
            });

            // sets the interval to refresh token
            intervalId = $interval(function() {
              authApi.refresh(refreshToken, function (err, data) {
                if (err) { throw err; }
                self.accessToken = data.accessToken;
                self.refreshToken = data.refreshToken;
              });
            }, 60000);
          }

          // destroys the account
          function destroy () {
            $interval.cancel(intervalId);
            angular.extend(this, fields);
            emitLogoutEvent();
          }

          return {
            init: init,
            destroy: destroy
          };
    }
  ]);

})(window, window.angular);