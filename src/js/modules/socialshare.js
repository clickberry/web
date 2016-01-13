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