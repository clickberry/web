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