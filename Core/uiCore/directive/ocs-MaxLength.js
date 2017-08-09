(function() {
    'use strict';
    angular.module('globalApp').directive('maxLength', directiveFunction);

    function directiveFunction() {
        return {
            restrict: 'A',
            require: 'ngModel',                        
            link: function($scope, element, attrs, ngModel) {
                $scope.$watch(attrs.ngModel, function(value) {
                    var isValid = (((value) ? value.length : 0) <= attrs.maxLength);
                    ngModel.$setValidity('maxLength', isValid);
                });
            }
        }
    }
})();