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