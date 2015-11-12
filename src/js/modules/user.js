(function (window, angular) {
    "use strict";

    var module = angular.module('user', ['auth-api', 'settings']);

    module.factory('user', [
      '$interval', 'authApi', 'urls', function ($interval, authApi, urls) {
        var intervalId;

        var fields = {
          id: undefined,
          email: undefined,
          accessToken: undefined,
          refreshToken: undefined
        };

        // set social callback
        authApi.setRedirect(urls.web, function () {});

        return {
          // inits a user account
          init: function (accessToken, refreshToken) {
            var self = this;

            self.accessToken = accessToken;
            self.refreshToken = refreshToken;

            // gets user account info
            authApi.get(accessToken, function (err, data) {
              if (err) { throw err; }
              self.id = data.id;
              self.email = data.email;
            });

            // sets the interval to refresh token
            intervalId = $interval(function() {
              authApi.refresh(refreshToken, function (err, data) {
                if (err) { throw err; }
                self.accessToken = data.accessToken;
                self.refreshToken = data.refreshToken;
              });
            }, 60000);

          },

          // destroys the account
          destroy: function () {
            // cancel interval
            $interval.cancel(intervalId);

            // clear fields
            angular.extend(this, fields);
          }
        };
    }
  ]);

})(window, window.angular);