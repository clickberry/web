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

        // listend for changes
        var url, title, description, image;
        attrs.$observe('shareUrl', function(shareUrl) {
          url = encodeURIComponent(shareUrl);
          updateShareUrl();
        });
        attrs.$observe('shareTitle', function(shareTitle) {
          title = encodeURIComponent((shareTitle || '').substring(0, 200));
          updateShareUrl();
        });
        attrs.$observe('shareDescription', function(shareDescription) {
          description = encodeURIComponent((shareDescription || '').substring(0, 200));
          updateShareUrl();
        });
        attrs.$observe('shareImage', function(shareImage) {
          image = encodeURIComponent(shareImage || '');
          updateShareUrl();
        });

        function updateShareUrl() {
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
        }

        // set share url
        updateShareUrl();
        element.attr('target', "_blank");
      }
    };
}]);
    
})(window.angular);