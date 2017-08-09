(function () {
    'use strict';
    angular.module('globalApp').directive("ocsError", ['$rootScope', 'templateUrlService', directiveFunction]);

    function directiveFunction($rootScope, templateUrlService) {
        return {
            restrict: "E",
            scope: {
                errorList: "=",
                removeClose: "="
            },
            templateUrl: templateUrlService.get('ocs-Error.html'),
            //replace: true,
            link: function (scope, element, attrs) {
                scope.popError = function (key) {
                    scope.errorList.splice(key, 1);
                }
            }
        };
    };



})();

